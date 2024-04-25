const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');
const {userRoleEnum} = require('../constants');

const Schema = mongoose.Schema;

const authSchema = new Schema({
    email: {
        type: String,
        required: [true, "please enter an email"],
        unique: true,
        validate: [isEmail, "please enter a valid email"],
        lowercase: true
    },
    password: {
        type: String,
        required: [true, "please enter an password"],
        minlength: [6, "enter a valid password"]
    },
    userRole: {
        type: String,
        enum: [userRoleEnum.Admin, userRoleEnum.Customer],
        default: userRoleEnum.Customer
    }
}, { timestamps: true });

authSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);

    next();
});

authSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ email });
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user;
        }
        throw Error('incorrect password');
    }
    throw Error('incorrect email');
}

const Auth = mongoose.model('Auth', authSchema);
module.exports = Auth;