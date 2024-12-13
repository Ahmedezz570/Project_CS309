const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: false },
        price: { type: Number, required: true },
        stock: { type: String, required: true },
        imageUrl: { type: String, required: true },
        category: { type: String, ref: 'Category' },
        new_price: { type: Number, required: false },
        old_price: { type: Number, required: false },
    },
    {
        timestamps: true
    }

);
module.exports = mongoose.model('Product', productSchema);
