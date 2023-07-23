class SignUpController {
  async get(req, res) {
    return res.render('signup', {});
  }
  async postSesh(req, res) {
    if (!req.user) {
      let msg = 'Something went wrong';
      console.log(msg);
      return msg;
    }
    req.session.user = {
      _id: req.user._id,
      firstName: req.user.firstName,
      lasName: req.user.lastName,
      email: req.user.email,
      dob: req.user.dob,
      role: req.user.role,
    };
    res.redirect('/dashboard');
  }
}

export const signUpController = new SignUpController();
