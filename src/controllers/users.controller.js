import passport from 'passport';
import { adminService } from '../services/admin.service.js';

class LogInController {
  async get(req, res) {
    if (req.session.user) {
      return res.redirect('/dashboard');
    }
    return res.render('login', {
      style: 'login.css',
    });
  }
  async noGet(req, res) {
    if (!req.user) {
      const msg = true;
      return res.render('login', {
        style: 'login.css',
        msg,
      });
    }
  }
  async post(req, res, next) {
    if (req.body.email === 'admin@expressO' && req.body.password === '123') {
      const user = adminService.post('admin@expressO', '123');
      req.session.user = {
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
        role: user.role,
      };

      return res.redirect('/dashboard');
    }
    passport.authenticate('login', (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.redirect('/!login');
      }

      req.logIn(user, async (err) => {
        if (err) {
          return next(err);
        }
        req.session.user = {
          _id: req.user._id,
          email: req.user.email,
          firstName: req.user.firstName,
          lastName: req.user.lastName,
          role: req.user.role,
          cid: req.user.cart,
        };

        return res.redirect('/dashboard');
      });
    })(req, res, next);
  }
}

export const logInController = new LogInController();

class LogOutController {
  async get(req, res) {
    req.session.destroy((err) => {
      if (err) {
        console.log('Error al destruir la sesión:', err);
      } else {
        res.redirect('/login');
      }
    });
  }
}
export const logOutController = new LogOutController();

class SignUpController {
  async get(req, res) {
    return res.render('signup', {});
  }
  async postSesh(req, res, next) {
    passport.authenticate('singup', async (err, user, info) => {
      if (err) {
        return next();
      }
      if (!user) {
        return res.redirect('/signup');
      }

      req.session.user = {
        _id: user._id,
        firstName: user.firstName,
        lasName: user.lastName,
        email: user.email,
        dob: user.dob,
        role: user.role,
      };
      return res.redirect('/dashboard');
    })(req, res, next);
  }
}

export const signUpController = new SignUpController();
