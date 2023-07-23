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
  async post(req, res) {
    req.session.user = { _id: req.user._id, email: req.user.email, firstName: req.user.firstName, lastName: req.user.lastName, role: req.user.role };
    return res.redirect('/dashboard');
  }
}

export const logInController = new LogInController();
