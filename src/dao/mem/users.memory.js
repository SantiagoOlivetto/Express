class UsersService {
  constructor() {
    this.userArr = [];
  }
  validateUser = (firstName, lastName, email, dob, password) => {
    if (!firstName || !lastName || !email || !dob || !password) {
      throw new Error('Please complete all the field correctly');
    }
  };
  emailCheck = (email) => {
    const emailExist = this.userArr.find((user) => user.email === email);
    return emailExist ? emailExist : false;
  };
  find(email) {
    const account = this.userArr.find((user) => user.email === email);
    return account ? account : false;
  }
  findById(id) {
    const account = this.userArr.find((user) => user._id === id);
    return account;
  }
  create = (firstName, lastName, email, dob, password) => {
    let newUser;
    this.validateUser(firstName, lastName, email, dob, password);

    if (this.emailCheck(email) === false) {
      newUser = { _id: '1', firstName, lastName, email, dob, password };
      this.userArr.push(newUser);
      return newUser;
    } else {
      const msg = 'That email is already linked with an account';
      return msg;
    }
  };
}
export const usersService = new UsersService();
