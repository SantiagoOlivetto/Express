import SessionDto from './dto/sessionDto.js';
import { env } from '../config.js';

const url = env.URL;

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
    return res.redirect(`${url}dashboard`);
  }
  getCurrent(req, res) {
    if (req.session.user) {
      const { first_name, role } = new SessionDto(req.session.user);
      return res.status(200).json({ status: 'OK', msg: 'Session data', payload: { first_name, role } || {} });
    } else {
      return res.status(404).json({ status: 'FAILED', msg: 'Session data not found' });
    }
  }
}
export const sessionsController = new SessionsController();
