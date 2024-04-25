const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const profileSchema = new Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Auth',
        required: true,
    },
    userName:{
        type: String,
        default: null
    },
    userProfilePicUrl: {
        type: String,
        default: null
    }
}, { timestamps: true });

const Profile = mongoose.model('Profile', profileSchema);
module.exports = Profile;
