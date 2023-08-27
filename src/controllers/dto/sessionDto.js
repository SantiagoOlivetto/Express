export default class SessionDto {
  constructor(session) {
    this.uid = session.uid || session._id;
    this.email = session.email;
    this.first_name = session.first_Name || session.firstName;
    this.role = session.role;
    this.cid = session.cid;
  }
}
