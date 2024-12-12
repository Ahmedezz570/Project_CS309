const express = require('express');
const router = express.Router();
const User = require('./models/user.model'); 
const Product = require('./models/product.model'); 

// Add product to cart
router.post('/add-to-cart', async (req, res) => {
    try {
        const { userId, productId, quantity = 1 } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const existingCartItem = user.cart.find(item => 
            item.product.toString() === productId
        );

        if (existingCartItem) {
            existingCartItem.quantity += quantity;
        } else {
            user.cart.push({ 
                product: productId, 
                quantity: quantity 
            });
        }

        await user.save();

        res.status(200).json({ 
            message: 'Product added to cart', 
            cart: user.cart 
        });

    } catch (error) {
        console.error('Error adding to cart:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Remove product from cart
router.delete('/remove-from-cart', async (req, res) => {
    try {
        const { userId, productId } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.cart = user.cart.filter(item => 
            item.product.toString() !== productId
        );

        await user.save();

        res.status(200).json({ 
            message: 'Product removed from cart', 
            cart: user.cart 
        });

    } catch (error) {
        console.error('Error removing from cart:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Update cart item quantity
router.put('/update-cart-quantity', async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const cartItemIndex = user.cart.findIndex(item => 
            item.product.toString() === productId
        );

        if (cartItemIndex > -1) {
            if (quantity <= 0) {
                user.cart.splice(cartItemIndex, 1);
            } else {
                user.cart[cartItemIndex].quantity = quantity;
            }

            await user.save();

            return res.status(200).json({ 
                message: 'Cart updated', 
                cart: user.cart 
            });
        }

        res.status(404).json({ message: 'Product not found in cart' });

    } catch (error) {
        console.error('Error updating cart:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Get user's cart
router.get('/get-cart/:userId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId).populate('cart.product');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ 
            message: 'Cart retrieved', 
            cart: user.cart 
        });

    } catch (error) {
        console.error('Error getting cart:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;