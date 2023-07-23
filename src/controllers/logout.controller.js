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
