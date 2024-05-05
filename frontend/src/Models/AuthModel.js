// AuthModel.js
export default class AuthModel {
    constructor(_id = null, email = null,userRole = null, error = null) {
      this._id = _id;
      this.email = email;
      this.userRole = userRole;
      this.error = error;
    }
  }
  