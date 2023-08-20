import passport from 'passport';
import local from 'passport-local';
import GitHubStrategy from 'passport-github2';
import { createHash } from '../utils/bcrypt.js';
import { env } from '../config.js';
import { usersService } from '../dao/daoFactory.js';

const clientId = env.CLIENT_ID;
const gitKey = env.GIT_KEY;

const LocalStrategy = local.Strategy;

export function iniPassport() {
  passport.use(
    'github',
    new GitHubStrategy(
      {
        clientID: clientId,
        clientSecret: gitKey,
        callbackURL: 'http://localhost:8080/sessions/githubcallback',
      },
      async (accesToken, _, profile, done) => {
        console.log(profile);
        try {
          const res = await fetch('https://api.github.com/user/emails', {
            headers: {
              Accept: 'application/vnd.github+json',
              Authorization: 'Bearer ' + accesToken,
              'X-Github-Api-Version': '2022-11-28',
            },
          });
          const emails = await res.json();
          const emailDetail = emails.find((email) => email.verified == true);

          if (!emailDetail) {
            return done(new Error('cannot get a valid email for this user'));
          }
          profile.email = emailDetail.email;

          let user = await usersService.findByEmail(profile.email);
          if (!user) {
            let userCreated = await usersService.create(profile._json.name || profile._json.login || 'noname', 'nolast', profile.email, 'nodate', 'nopass');
            console.log('User Registration succesful');
            return done(null, userCreated);
          } else {
            console.log('User already exists');
            return done(null, user);
          }
        } catch (e) {
          console.log('Error en auth github');
          console.log(e);
          return done(e);
        }
      }
    )
  );
  passport.use(
    'login',
    new LocalStrategy({ usernameField: 'email' }, async (username, password, done) => {
      try {
        const user = await usersService.find(username, password);
        if (!user) {
          console.log('Email or password are incorrect');
          return done(null, false);
        }
        console.log(user);
        return done(null, user);
      } catch (err) {
        console.log(err);
        return done();
      }
    })
  );
  passport.use(
    'singup',
    new LocalStrategy(
      {
        passReqToCallback: true, //Give us access to req
        usernameField: 'email',
      },
      async (req, username, password, done) => {
        try {
          const { firstName, lastName, email, dob } = req.body;
          let user = await usersService.find(username);
          console.log(user);
          if (user) {
            console.log('User already exist');
            return done(null, false);
          }
          let userCreated = await usersService.create(firstName, lastName, email, dob, createHash(password));

          console.log(userCreated);
          console.log('User registration process succesfull');
          return done(null, userCreated);
        } catch (err) {
          console.log(err);
          return done(err);
        }
      }
    )
  );
  passport.serializeUser((user, done) => [done(null, user._id)]);
  passport.deserializeUser(async (id, done) => {
    let user = await usersService.findById(id);
    done(null, user);
  });
}
