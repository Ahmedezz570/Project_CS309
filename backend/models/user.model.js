const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        fullName: { type: String, required: true },
        email: { type: String, unique: true, required: true },
        password: { type: String, required: true },
        phoneNumber: { type: String, required: false },
        image: { type: String, required: false },
        cart: [
            {
                product: {
                    type: Schema.Types.ObjectId, 
                    ref: 'Product', 
                    required: true
                },
                quantity: {
                    type: Number, 
                    required: true, 
                    min: 1,
                    default: 1
                },
                price: {
                    type: Number,
                    required: true
                }
            }
        ]
    },
    {
        timestamps: true
    }

);
module.exports = mongoose.model('User', userSchema);