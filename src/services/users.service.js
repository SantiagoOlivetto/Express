import { UsersModel } from '../dao/db/models/users.model.js';
import { isValidPassword } from '../utils/bcrypt.js';

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
  async create(firstName, lastName, email, dob, password) {
    let newUser;
    this.validateUser(firstName, lastName, email, dob, password);

    if ((await this.emailCheck(email)) === false) {
      return (newUser = await UsersModel.create({ firstName, lastName, email, dob, password }));
    } else {
      const msg = 'That email is already linked with an account';
      return msg;
    }
  }
  async find(email, password) {
    let account = await this.emailCheck(email);
    return account && isValidPassword(account, password) ? account : false;
  }
  async findById(id) {
    let account = await UsersModel.findById(id);
    return account;
  }
  async findByEmail(email) {
    const account = await UsersModel.findOne({ email: email });
    return account;
  }
  async linkCart(uid, cid) {
    const linkCart = UsersModel.findByIdAndUpdate(uid, { cart: cid });
    return linkCart;
  }
}

export const usersService = new UsersService();
