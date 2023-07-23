class SessionsController {
  getCount(req, res) {
    if (req.session.counter) {
      req.session.counter++;
      return res.send(`Se ha visitado el sitio ${req.session.counter} veces.`);
    } else {
      req.session.counter = 1;
      return res.send('Welcome!!!');
    }
  }
  getGHCallback(req, res) {
    req.session.user = req.user;
    return res.redirect('http://localhost:8080/dashboard');
  }
  getCurrent(req, res) {
    return res.status(200).json({ status: 'OK', msg: 'Session data', payload: req.session.user || {} });
  }
}
export const sessionsController = new SessionsController();
