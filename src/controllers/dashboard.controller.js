import SessionDto from './dto/sessionDto.js';

class DashboardController {
  async get(req, res) {
    const { cid, role, first_name } = new SessionDto(req.session.user);

    return res.render('dashboard', {
      style: 'login.css',
      first_name,
      role,
      cid,
    });
  }
}

export const dashboardController = new DashboardController();
