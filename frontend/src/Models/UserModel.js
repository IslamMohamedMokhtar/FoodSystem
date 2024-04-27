const {Profile} = require("./ProfileModel");

export class UserModel {
  constructor({ _id = null, email = null, userRole = null, createdAt = null, updatedAt = null, __v = null } = {}) {
    this._id = _id;
    this.email = email;
    this.userRole = userRole;
    this.createdAt = createdAt ? new Date(createdAt).toDateString() : null;
    this.updatedAt = updatedAt ? new Date(updatedAt).toDateString() : null;
    this.version = __v;
  }
}

export class UserWithProfileModel {
  constructor({ _id = null, email = null, password = null, userRole = null, createdAt = null, updatedAt = null, __v = null, profile = {}  }) {
    this.profile = new Profile(profile);
    this.auth = new UserModel({_id, email, password, userRole, createdAt, updatedAt, __v});
  }
}

export default class UserResponse {
  constructor({ result = { users: [] }, error = null, message = null, totalSize = null } = {}) {
    this.result = {
      users: result.User ? result.User.map(userData => new UserWithProfileModel(userData)) : []
    };   
    this.error = error;
    this.message = message;
    this.totalSize = totalSize;
  }
}


