const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        fullName: { type: String, required: true },
        email: { type: String, unique: true, required: true },
        password: { type: String, required: true },
        phoneNumber: { type: String, required: false },
        image: { type: String, required: false },
        cart: { type:Object, required: false },
        isAdmin: { type: Boolean, required: false,default: false },
    },
    {
        timestamps: true
    }

);
module.exports = mongoose.model('User', userSchema);