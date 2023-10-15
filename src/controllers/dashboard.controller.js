import SessionDto from './dto/sessionDto.js';
import { env } from '../config.js';

const url = env.URL;

class DashboardController {
  async get(req, res) {
    const { cid, role, first_name } = new SessionDto(req.session.user);

    return res.render('dashboard', {
      style: 'login.css',
      first_name,
      role,
      cid,
      url,
    });
  }
}

export const dashboardController = new DashboardController();
