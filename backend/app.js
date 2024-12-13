const port = 4000;
const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const cors = require('cors');
// multer Library .
const multer = require('multer');
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
      image_url:`http://localhost:${PORT}/images/${req.file.filename}`,
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

app.get('/user/:id', async (req, res) => {
    
    try {
        // req id 
        const id = req.params.id;
        // find by id in users 
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
});

app.delete('/user/:id', async (req, res) => {

    // req id 
    const id = req.params.id;
    // delet by id in users 
   
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

        if (await User.findOne({ email: userParam.email })) {
            return res.status(400).send('Email "' + userParam.email + '" already exists');
        }

        const saltRounds = 10; 
        const hashedPassword = await bcrypt.hash(userParam.password, saltRounds);

        const user = new User({
            ...userParam, 
            password: hashedPassword, 
        });

        await user.save();
        res.status(201).send("User added successfully!");
    } catch (err) {
        res.status(500).send('Server error: ' + err.message);
    }
});

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
            token: token
        });

    } catch (error) {
        res.status(500).send('Server error: ' + error.message);
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
