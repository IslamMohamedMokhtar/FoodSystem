export class Profile {
    constructor({userName = null, userProfilePicUrl = null}) {
        this.userName = userName;
        this.userProfilePicUrl = userProfilePicUrl;
    }
}

export default class ProfileModel {
    constructor(profile:Profile = null, error = null) {
        this.profile = profile;
        this.error = error;
    }
}
