class DashboardController {
  async get(req, res) {
    const userName = req.session.user.firstName;
    const role = req.session.user.role;

    return res.render('dashboard', {
      style: 'login.css',
      userName,
      role,
    });
  }
}

export const dashboardController = new DashboardController();
