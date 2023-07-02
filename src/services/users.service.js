import { UsersModel } from '../dao/models/users.model.js';

class UsersService {
  validateUser(firstName, lastName, email, dob, password) {
    if (!firstName || !lastName || !email || !dob || !password) {
      throw new Error('Please complete all the field correctly');
    }
  }
  async emailCheck(email) {
    const emailExist = await UsersModel.findOne({ email: email });
    return emailExist ? emailExist : false;
  }
  async createUser(firstName, lastName, email, dob, password) {
    let newUser;
    this.validateUser(firstName, lastName, email, dob, password);
    if (this.emailCheck(email) === false) {
      return (newUser = await UsersModel.create({ firstName, lastName, email, dob, password }));
    } else {
      const msg = 'That email is already linked with an account';
      console.log(msg);
      return msg;
    }
  }
  async findUser(email, password) {
    let account = await this.emailCheck(email);
    return account && account.password === password ? account : false;
  }
}

export const usersService = new UsersService();
