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
// Define a virtual field named 'auth' that represents the populated 'userId' field
profileSchema.virtual('auth', {
    ref: 'Auth', // Reference the 'Auth' model
    localField: 'userId',
    foreignField: '_id',
    justOne: true // Assuming each Profile has only one associated Auth document
});

// Hide the '_id' field in the JSON output
profileSchema.set('toJSON', { virtuals: true, transform: function (doc, ret) {
    // Remove the '_id' field if you don't want it in the JSON output
    ret.userId = ret.id;
    delete ret.id;
}});


const Profile = mongoose.model('Profile', profileSchema);
module.exports = Profile;
