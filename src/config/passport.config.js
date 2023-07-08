import passport from 'passport';
import local from 'passport-local';
import GitHubStrategy from 'passport-github2';
import { createHash, isValidPassword } from '../utils/utils.js';
import { UsersModel } from '../dao/models/users.model.js';
import fs from 'fs';

const config = JSON.parse(fs.readFileSync('config.json', 'utf8'));
const clientId = config.clientID;
const gitKey = config.gitKey;

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

          let user = await UsersModel.findOne({ email: profile.email });
          if (!user) {
            const newUser = {
              firstName: profile._json.name || profile._json.login || 'noname',
              lastName: 'nolast',
              email: profile.email,
              dob: 'nodate',
              password: 'nopass',
            };
            let userCreated = await UsersModel.create(newUser);
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
        const user = await UsersModel.findOne({ email: username });
        if (!user) {
          console.log('User not found with email: ' + username);
          return done(null, false);
        }
        if (!isValidPassword(user, password)) {
          console.log('Invalid password');
          return done(null, false);
        }

        return done(null, user);
      } catch (err) {
        console.log(err);
        return done(err);
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
          let user = await UsersModel.findOne({ email: username });
          if (user) {
            console.log('User already exist');
            return done(null, false);
          }
          const newUser = {
            firstName,
            lastName,
            email,
            dob,
            password: createHash(password),
          };
          let userCreated = await UsersModel.create(newUser);
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
    let user = await UsersModel.findById(id);
    done(null, user);
  });
}
