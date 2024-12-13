const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema(
    {
        name: { type: String, required: true },
        image: { type: String, required: true },
        category: { type: String, required: true },
        new_price: { type: Number, required: true },
        old_price: { type: Number, required: true },
    },
    {
        timestamps: true
    }

);
module.exports = mongoose.model('Product', productSchema);
