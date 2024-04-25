const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {menuTypeEnum} = require('../constants');
const menuSchema = new Schema({
    picUrl: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: [0, "Price cannot be negative"]
    },
    description: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: [menuTypeEnum.Breakfast, menuTypeEnum.Desserts, menuTypeEnum.Drinks, menuTypeEnum.MainDish],
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Auth',
        required: true, 
        validate: {
            validator: async function (value) {
                const auth = await mongoose.model('Auth').findById(value);
                return auth !== null;
            },
            message: 'Invalid createdBy value'
        }
    }
}, { timestamps: true });

const Menu = mongoose.model('Menu', menuSchema);
module.exports = Menu;
