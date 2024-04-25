// AuthModel.js
export default class AuthModel {
    constructor(email = null,userRole = null, error = null) {
      this.email = email;
      this.userRole = userRole;
      this.error = error;
    }
  }
  