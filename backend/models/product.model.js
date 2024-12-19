const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema(
    {
        id :{type: Number, required: true},
        name: { type: String, required: true },
        image: { type: String, required: true },
        category: { type: String, required: true },
        description: { type: String, required: true },
        new_price: { type: Number, required: true },
        old_price: { type: Number, required: true },
        reviews:[
                    {
                        FullName: { type: String, required: true},
                        email: { type: String, required: true},
                        comment: { type: String, required: true},
                        rating: { type: Number, required: true},
                        createdAt: { type: Date, default: Date.now }
                    }
                ]
    },
    {
        timestamps: true
    }

);
module.exports = mongoose.model('Product', productSchema);
