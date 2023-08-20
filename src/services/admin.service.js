class AdminService {
  post(email, password) {
    if ((email === 'admin@expressO') & (password === '123')) {
      let user;
      return (user = { first_name: 'admin', last_name: 'Ok', email: 'admin@expressO', role: 'admin' });
    }
  }
}

export const adminService = new AdminService();
