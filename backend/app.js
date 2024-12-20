const port = 4000;
const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const validator = require('validator'); 
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const cors = require('cors');
// multer Library .
const multer = require('multer');
const path = require("path");

app.use(express.json());
app.use(cors()); 
// First Schema For Users 
const User = require('./models/user.model');
const Product = require('./models/product.model');
app.get('/', (req, res) => {     
    res.send('Hello World, from strikers!!');
}); 
app.get('/users', async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
});

const storage = multer.diskStorage({
  destination: './upload/images',
  filename: (req, file, cb) => {
    return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
  }
});  
const upload = multer({storage: storage});
app.use('/images' , express.static('upload/images'));


app.post("/upload" , upload.single('product') , (req , res)=>{
  res.json({
      success: 1,
      image_url:`http://localhost:${port}/images/${req.file.filename}`,
  });
});
app.post('/addproduct', async (req, res) => {
    try {
      let products = await Product.find({});
      let id = products.length > 0 ? products.slice(-1)[0].id + 1 : 1;
  
      const product = new Product({
        id: id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        description: req.body.description,
        new_price: req.body.new_price,
        old_price: req.body.old_price,
      });
  
      await product.save();
      res.json({
        success: true,
        message: "Product added successfully",
      });
    } catch (error) {
      console.error(error);
      res.status(400).json({
        success: false,
        message: "Product validation failed",
        error: error.message,
      });
    }
  });

app.get('/allproducts', async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});
app.post('/removeproduct', async (req, res) => {
  try {
    await Product.findOneAndDelete({ id: req.body.id });
    res.json({ success: true, message: "Product removed successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});
app.get('/products/:category', async (req, res) => {
    try {
         const category=req.params.category;
        const products = await Product.find({ category: category})
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
});
app.put('/updateproduct', async (req, res) => {
    try {
      const { id, name, image, category, new_price, old_price } = req.body;
  
      const updatedProduct = await Product.findOneAndUpdate(
        { id: id },
        { name, image, category, new_price, old_price },
        { new: true, runValidators: true }
      );
  
      if (updatedProduct) {
        res.json({
          success: true,
          message: "Product updated successfully",
          product: updatedProduct
        });
      } else {
        res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Error updating product",
        error: error.message,
      });
    }
  });
  app.get('/cart', async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        const secretKey = 'your_secret_key';
        let decoded;
        try {
            decoded = jwt.verify(token, secretKey);
        } catch (error) {
            return res.status(401).json({ message: 'Invalid or expired token' });
        }

        const { email } = decoded;
        if (!email) {
            return res.status(400).json({ message: 'Invalid token payload' });
        }

        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ message: `User with email "${email}" not found` });
        }

        if (!user.cart || user.cart.length === 0) {
            return res.status(404).json({ message: 'Cart is empty' });
        }

        res.status(200).json({
            message: 'Cart retrieved successfully',
            cart: user.cart
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error: ' + error.message });
    }
});
app.post('/add/cart', async (req, res) => {
  try {
      const { productId } = req.body;

      if (!productId) {
          return res.status(400).json({ success: false, message: "Product ID is required" });
      }

      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
          return res.status(401).json({ success: false, message: 'No token provided' });
      }

      const secretKey = 'your_secret_key';
      let decoded;
      try {
          decoded = jwt.verify(token, secretKey);
      } catch (error) {
          return res.status(401).json({ success: false, message: 'Invalid or expired token' });
      }

      const { email } = decoded;
      if (!email) {
          return res.status(400).json({ success: false, message: 'Invalid token payload' });
      }

      const product = await Product.findById(productId);
      if (!product) {
          return res.status(404).json({ success: false, message: `Product with ID "${productId}" not found` });
      }

      const existingItem = await User.findOneAndUpdate(
          { 
              email: email, 
              'cart.productId': product._id 
          },
          { 
              $inc: { 'cart.$.quantity': 1 } 
          },
          { new: true }
      );

      if (!existingItem) {
          const newItem = {
              productId: product._id,
              name: product.name,
              image: product.image,
              category: product.category,
              new_price: product.new_price,
              old_price: product.old_price,
              quantity: 1
          };

          const updatedUser = await User.findOneAndUpdate(
              { email: email },
              { $push: { cart: newItem } },
              { new: true }
          );

          if (!updatedUser) {
              return res.status(404).json({ success: false, message: `User with email "${email}" not found` });
          }
      }

      const user = await User.findOne({ email: email });

      res.status(200).json({
          success: true,
          message: 'Product added to cart successfully',
          cart: user.cart
      });
  } catch (error) {
      console.error(error);
      res.status(500).json({
          success: false,
          message: 'Server error: ' + error.message,
      });
  }
});

app.delete('/delete/cart', async (req, res) => {
  try {
      const { productId } = req.body;

      if (!productId) {
          return res.status(400).json({ success: false, message: "Product ID is required" });
      }

      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
          return res.status(401).json({ success: false, message: 'No token provided' });
      }

      const secretKey = 'your_secret_key';
      let decoded;
      try {
          decoded = jwt.verify(token, secretKey);
      } catch (error) {
          return res.status(401).json({ success: false, message: 'Invalid or expired token' });
      }

      const { email } = decoded;
      if (!email) {
          return res.status(400).json({ success: false, message: 'Invalid token payload' });
      }

      const user = await User.findOne({ email: email });

      if (!user) {
          return res.status(404).json({ success: false, message: `User with email "${email}" not found` });
      }

      if (!user.cart || user.cart.length === 0) {
          return res.status(404).json({ success: false, message: 'Cart is empty' });
      }

      const mongoose = require('mongoose');
      const objectIdProductId = new mongoose.Types.ObjectId(productId);

      const cartItem = user.cart.find(item => 
          item.productId.toString() === objectIdProductId.toString()
      );
      
      if (!cartItem) {
          return res.status(404).json({ 
              success: false, 
              message: `Product with ID "${productId}" not found in cart` 
          });
      }

      if (cartItem.quantity > 1) {
          await User.findOneAndUpdate(
              { 
                  email: email,
                  'cart.productId': objectIdProductId
              },
              { 
                  $inc: { 'cart.$.quantity': -1 } 
              }
          );
      } else {
          await User.findOneAndUpdate(
              { email: email },
              { 
                  $pull: { cart: { productId: objectIdProductId } }
              }
          );
      }

      const updatedUser = await User.findOne({ email: email });

      return res.status(200).json({
          success: true,
          message: 'Product quantity decreased or removed from cart successfully',
          cart: updatedUser.cart
      });
  } catch (error) {
      console.error('Error in DELETE /delete/cart:', error);
      return res.status(500).json({
          success: false,
          message: 'Server error: ' + error.message
      });
  }
});

app.delete('/remove/cart', async (req, res) => {
    try {
        const { productId } = req.body;

        if (!productId) {
            return res.status(400).json({ success: false, message: "Product ID is required" });
        }

        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ success: false, message: 'No token provided' });
        }

        const secretKey = 'your_secret_key';
        let decoded;
        try {
            decoded = jwt.verify(token, secretKey);
        } catch (error) {
            return res.status(401).json({ success: false, message: 'Invalid or expired token' });
        }

        const { email } = decoded;
        if (!email) {
            return res.status(400).json({ success: false, message: 'Invalid token payload' });
        }

        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(404).json({ success: false, message: `User with email "${email}" not found` });
        }

        if (!user.cart || user.cart.length === 0) {
            return res.status(404).json({ success: false, message: 'Cart is empty' });
        }

        const mongoose = require('mongoose');
        const objectIdProductId = new mongoose.Types.ObjectId(productId);

        const cartItem = user.cart.find(item => 
            item.productId.toString() === objectIdProductId.toString()
        );
        
        if (!cartItem) {
            return res.status(404).json({ 
                success: false, 
                message: `Product with ID "${productId}" not found in cart` 
            });
        }

        await User.findOneAndUpdate(
            { email: email },
            { 
                $pull: { cart: { productId: objectIdProductId } }
            }
        );

        const updatedUser = await User.findOne({ email: email });

        return res.status(200).json({
            success: true,
            message: 'Product removed from cart successfully',
            cart: updatedUser.cart
        });
    } catch (error) {
        console.error('Error in DELETE /remove/cart:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error: ' + error.message
        });
    }
});

  app.get('/user/:email', async (req, res) => {
  try {
      const email = req.params.email;
      const user = await User.findOne({ email: email });
      
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json(user);

  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});
app.put('/user/:email', async (req, res) => {
  try {
      const email = req.params.email;
      const updates = req.body;

      const user = await User.findOneAndUpdate(
          { email: email },
          { $set: updates },
          { new: true }
      );

      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json(user);

  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});

app.delete('/user/:id', async (req, res) => {

    const id = req.params.id;
   
    try {
        const {id} = req.params;
        const user = await User.findByIdAndDelete(id);
        if(!user){
            return res.status(404).json({message: `cannot find any user with ID ${id}`})
        }
        res.status(200).json(user);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
});

app.post('/register', async (req, res) => {
    try {
        let userParam = req.body;
        const { email, password } = userParam;
        console.log(req.body);

        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: 'Invalid email format' });
        }

        const validationResult = validatePassword(password);
        if (!validationResult.isValid) {
            return res.status(400).json({
                success: false,
                message: 'Password validation failed',
                errors: validationResult.errors
            });
        }

        if (await User.findOne({ email: userParam.email })) {
            return res.status(400).json({ message: 'Email "' + userParam.email + '" already exists' });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(userParam.password, saltRounds);

        const user = new User({
            ...userParam,
            password: hashedPassword,
        });

        await user.save();
        res.status(200).json({
            success: true,
            message: 'Registration successful',
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error: ' + err.message });
    }
});

const validatePassword = (password) => {
    const validationRules = {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
        maxLength: 50
    };

    const errors = [];
    
    if (password.length < validationRules.minLength) {
        errors.push(`Password must be at least ${validationRules.minLength} characters long`);
    }

    if (password.length > validationRules.maxLength) {
        errors.push(`Password cannot exceed ${validationRules.maxLength} characters`);
    }

    if ((password.match(/[a-z]/g) || []).length < validationRules.minLowercase) {
        errors.push('Password must contain at least one lowercase letter');
    }

    if ((password.match(/[A-Z]/g) || []).length < validationRules.minUppercase) {
        errors.push('Password must contain at least one uppercase letter');
    }

    if ((password.match(/[0-9]/g) || []).length < validationRules.minNumbers) {
        errors.push('Password must contain at least one number');
    }

    if ((password.match(/[!@#$%^&*(),.?":{}|<>]/g) || []).length < validationRules.minSymbols) {
        errors.push('Password must contain at least one special character');
    }

    if (/(.)\1{2,}/.test(password)) {
        errors.push('Password cannot contain repeating characters (e.g., "aaa")');
    }

    if (/^[0-9]*$/.test(password)) {
        errors.push('Password cannot contain only numbers');
    }

    if (/^[a-zA-Z]*$/.test(password)) {
        errors.push('Password cannot contain only letters');
    }

    return {
        isValid: errors.length === 0,
        errors
    };
};


app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
       

        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(400).send('Email "' + email + '" not found');
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).send('Invalid Password');
        }
        const token = jwt.sign(
            { id: user._id, email: user.email }, 
            'your_secret_key', 
            { expiresIn: '1h' } 
        );

        res.status(200).json({
            message: 'Login successful',
            success: true,
            token: token , 
            isAdmin: user.isAdmin
        });

    } catch (error) {
        res.status(500).send('Server error: ' + error.message);
    }
});
  
  app.get('/products/:id/reviews', async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findOne({ id: id });
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }else{
        res.status(200).json({ reviews: product.reviews });}
    } catch (error) {
        res.status(500).json({ message: "Error fetching reviews", error });
    }
  });

  app.post('/products/:id/reviews', async (req, res) => {
    const { id } = req.params;
    const { FullName, email, comment, rating } = req.body; 
    try {
        const product = await Product.findOne({ id: id });
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
  
        const existingReview = product.reviews.find(review => review.email === email);
        if (existingReview) {
            return res.status(400).json({ message: "You have already reviewed this product" });
        }
  
        product.reviews.push({
            FullName,
            email,
            comment,
            rating,
        });
  
        await product.save();
        res.status(201).json({ message: "Review added successfully", product });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error adding review", error });
    }
  });
  app.delete('/products/:id/reviews', async (req, res) => {
    const { id } = req.params; 
    const { email } = req.body; 
  
    try {
        const product = await Product.findOne({ id: id });
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
  
        const reviewIndex = product.reviews.findIndex(review => review.email === email);
  
        if (reviewIndex === -1) {
            return res.status(404).json({ message: "Review not found for this email" });
        }
  
        product.reviews.splice(reviewIndex, 1);
  
        await product.save();
  
        res.status(200).json({ message: "Review deleted successfully", product });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error deleting review", error });
    }
  });

mongoose.connect("mongodb+srv://ahmedez570:987654321@cluster0.bf6fb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB successfully!");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });

app.listen(port, (error) => {
  if (!error) {
    console.log(`Successfully created ${port}`);
  } else {
    console.log(error);
  }
});