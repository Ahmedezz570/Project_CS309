const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: false },
        imageUrl: { type: String, required: true },
        category: { type: String, required: true },
        new_price: { type: Number, required: false },
        old_price: { type: Number, required: false },
    },
    {
        timestamps: true
    }

);
module.exports = mongoose.model('Product', productSchema);
