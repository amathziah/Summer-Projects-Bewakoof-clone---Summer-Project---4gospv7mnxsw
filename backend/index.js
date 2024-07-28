const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

const app = express();
const port = 4000;

// Middleware
app.use(express.json());
app.use(cors());

// Database Connection
mongoose.connect(
  "mongodb+srv://akoshipa:amath123akoshi@cluster0.wsvc0tr.mongodb.net/e-commerce",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of default 30s
  }
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Image storage Engine
const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
  },
});
const upload = multer({ storage: storage });

// Serve static files
app.use("/images", express.static("upload/images"));

// Product Model
const Product = mongoose.model("Product", {
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  new_price: { type: Number, required: true },
  old_price: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  available: { type: Boolean, default: true },
});

// User Model
const User = mongoose.model("User", {
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  cartData: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      quantity: { type: Number, required: true },
    }
  ],
  date: { type: Date, default: Date.now },
});


// Routes

// Root endpoint
app.get("/", (req, res) => {
  res.send("Express App is Running");
});

// Upload endpoint for images
app.post("/upload", upload.single("product"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: "No file uploaded" });
  }

  res.json({
    success: true,
    image_url: `http://localhost:${port}/images/${req.file.filename}`,
  });
});

// Add product endpoint
app.post("/addproduct", async (req, res) => {
  try {
    const { name, image, category, new_price, old_price } = req.body;

    // Basic validation
    if (!name || !image || !category || !new_price || !old_price) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    let products = await Product.find({});
    let id = products.length > 0 ? products[products.length - 1].id + 1 : 1;

    const product = new Product({
      id: id,
      name: name,
      image: image,
      category: category,
      new_price: new_price,
      old_price: old_price,
    });

    await product.save();

    res.json({ success: true, name: name });
  } catch (error) {
    console.error("Error saving product:", error);
    res.status(500).json({ success: false, error: "Failed to add product" });
  }
});

// Remove product endpoint
app.delete("/removeproduct/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findOneAndDelete({ id: id });

    if (deletedProduct) {
      console.log("Removed:", deletedProduct.name);
      res.json({ success: true, name: deletedProduct.name });
    } else {
      res.status(404).json({ success: false, message: "Product not found" });
    }
  } catch (error) {
    console.error("Error removing product:", error);
    res.status(500).json({ success: false, error: "Failed to remove product" });
  }
});

// Get all products endpoint
app.get("/allproducts", async (req, res) => {
  try {
    let products = await Product.find({});
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ success: false, error: "Failed to fetch products" });
  }
});

// Signup endpoint
app.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Basic validation
    if (!username || !email || !password) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    let check = await User.findOne({ email: email });
    if (check) {
      return res.status(400).json({ success: false, errors: "Existing user found with the same email address" });
    }

    const user = new User({
      username: username,
      email: email,
      password: password,
    });

    await user.save();

    const token  = jwt.sign({ userId: user._id }, 'secret_ecom', { expiresIn: '7d' });


    res.json({ success: true, token });
  } catch (error) {
    console.error("Error during user registration:", error);
    res.status(500).json({ success: false, error: "Failed to register user" });
  }
});

// Login endpoint
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Basic validation
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ success: false, errors: "User not found with this email address" });
    }

    if (user.password !== password) {
      return res.status(400).json({ success: false, errors: "Incorrect password" });
    }

    const token = jwt.sign({ userId: user._id }, 'secret_ecom', { expiresIn: '7d' });

    res.json({ success: true, token });
  } catch (error) {
    console.error("Error during user login:", error);
    res.status(500).json({ success: false, error: "Failed to login user" });
  }
});

//creating middleware to fetch user
const fetchUser = async (req, res, next) => {
  const token = req.header('auth-token');
  if (!token) {
    console.log("No token provided");
    return res.status(401).send({ errors: "Please authenticate using a valid token1" });
  }

  try {
    const data = jwt.verify(token, 'secret_ecom');
    console.log("Token data:", data);
    req.user = data.userId; // Make sure req.user is set correctly
    next();
  } catch (error) {
    console.error("Token verification error:", error.message);
    return res.status(401).send({ errors: "Please authenticate using a valid token2" });
  }
};
app.post('/addtocart', fetchUser, async (req, res) => {
  const { productId, quantity } = req.body;

  if (!productId || !quantity) {
      return res.status(400).send({ errors: "Product ID and quantity are required" });
  }

  try {
      let user = await User.findById(req.user);

      if (!user) {
          return res.status(404).send({ errors: "User not found" });
      }

      // Check if the product already exists in the cart
      const productIndex = user.cartData.findIndex(item => item.productId.toString() === productId);

      if (productIndex > -1) {
          // If product exists, update the quantity
          user.cartData[productIndex].quantity += quantity;
      } else {
          // If product does not exist, add it to the cart
          user.cartData.push({ productId, quantity });
      }

      // Save the updated user data
      await user.save();

      res.json({ success: true, cartData: user.cartData });
  } catch (error) {
      console.error("Error adding to cart:", error);
      res.status(500).json({ success: false, error: "Failed to add to cart" });
  }
});
app.post('/updatecart', fetchUser, async (req, res) => {
  const { productId, quantity } = req.body;

  if (!productId || !quantity) {
      return res.status(400).send({ errors: "Product ID and quantity are required" });
  }

  try {
      let user = await User.findById(req.user);

      if (!user) {
          return res.status(404).send({ errors: "User not found" });
      }

      // Check if the product already exists in the cart
      const productIndex = user.cartData.findIndex(item => item.productId.toString() === productId);

      if (productIndex > -1) {
          // If product exists, update the quantity
          user.cartData[productIndex].quantity += quantity;

          // If quantity is zero or less, remove the product from the cart
          if (user.cartData[productIndex].quantity <= 0) {
              user.cartData.splice(productIndex, 1);
          }
      } else {
          // If product does not exist in the cart, return an error
          return res.status(400).json({ errors: "Product not found in the cart" });
      }

      // Save the updated user data
      await user.save();

      res.json({ success: true, cartData: user.cartData });
  } catch (error) {
      console.error("Error updating cart:", error);
      res.status(500).json({ success: false, error: "Failed to update cart" });
  }
});
app.get('/cart', fetchUser, async (req, res) => {
  try {
      const user = await User.findById(req.user);

      if (!user) {
          return res.status(404).json({ errors: "User not found" });
      }

      res.json({ success: true, cartData: user.cartData });
  } catch (error) {
      console.error("Error fetching cart data:", error);
      res.status(500).json({ success: false, error: "Failed to fetch cart data" });
  }
});
// Profile endpoint to get user details
app.get('/profile', fetchUser, async (req, res) => {
  try {
    const user = await User.findById(req.user).select('-password'); // Exclude password field
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.json({ success: true, user });
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ success: false, error: "Failed to fetch profile" });
  }
});

// Update profile endpoint
app.post('/updateprofile', fetchUser, async (req, res) => {
  const { email, password } = req.body;

  // Basic validation
  if (!email && !password) {
    return res.status(400).json({ success: false, message: "No fields to update" });
  }

  try {
    let user = await User.findById(req.user);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if (email) user.email = email;
    if (password) user.password = password;

    await user.save();
    res.json({ success: true, message: "Profile updated successfully" });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ success: false, error: "Failed to update profile" });
  }
});
// Remove item from cart endpoint
app.delete('/removeitem', fetchUser, async (req, res) => {
  const { productId } = req.body;

  if (!productId) {
    return res.status(400).send({ errors: "Product ID is required" });
  }

  try {
    let user = await User.findById(req.user);

    if (!user) {
      return res.status(404).send({ errors: "User not found" });
    }

    // Find the index of the product to be removed
    const productIndex = user.cartData.findIndex(item => item.productId.toString() === productId);

    if (productIndex > -1) {
      // Remove the product from the cart
      user.cartData.splice(productIndex, 1);
      await user.save();
      res.json({ success: true, cartData: user.cartData });
    } else {
      res.status(400).json({ errors: "Product not found in the cart" });
    }
  } catch (error) {
    console.error("Error removing item from cart:", error);
    res.status(500).json({ success: false, error: "Failed to remove item from cart" });
  }
});



// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});















