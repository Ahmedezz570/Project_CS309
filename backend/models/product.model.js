const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema(
    {
        id: { type: Number, required: true },
        name: { type: String, required: true },
        description: { type: String, required: false },
        imageUrl: { type: String, required: true },
        category: { type: String, required: true },
        new_price: { type: Number, required: true },
        old_price: { type: Number, required: true },
    },
    {
        timestamps: true
    }

);
module.exports = mongoose.model('Product', productSchema);
