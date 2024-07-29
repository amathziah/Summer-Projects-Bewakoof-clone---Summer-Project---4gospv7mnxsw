const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
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
    serverSelectionTimeoutMS: 10000, // Increase this value if necessary
    socketTimeoutMS: 45000,          // Time out if no response within this time
  }
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
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
      size: { type: String, },
    }
  ],
  date: { type: Date, default: Date.now },
});

// Routes

// Root endpoint
app.get("/", (req, res) => {
  res.send("Express App is Running");
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

    const user = new User({ username, email, password });
    await user.save();

    const token = jwt.sign({ userId: user._id }, 'secret_ecom', { expiresIn: '7d' });

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

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(400).json({ success: false, errors: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, 'secret_ecom', { expiresIn: '7d' });

    res.json({ success: true, token });
  } catch (error) {
    console.error("Error during user login:", error);
    res.status(500).json({ success: false, error: "Failed to login user" });
  }
});

// Middleware to fetch user
const fetchUser = async (req, res, next) => {
  const token = req.header('auth-token');
  if (!token) {
    return res.status(401).send({ errors: "Please authenticate using a valid token" });
  }

  try {
    const data = jwt.verify(token, 'secret_ecom');
    req.user = data.userId;
    next();
  } catch (error) {
    console.error("Token verification error:", error.message);
    return res.status(401).send({ errors: "Please authenticate using a valid token" });
  }
};

// Add to cart endpoint
app.post('/addtocart', fetchUser, async (req, res) => {
  const { productId, quantity, size } = req.body;

  if (!productId || !quantity || !size) {
    return res.status(400).send({ errors: "Product ID, quantity, and size are required" });
  }

  try {
    let user = await User.findById(req.user);

    if (!user) {
      return res.status(404).send({ errors: "User not found" });
    }

    const productIndex = user.cartData.findIndex(item => item.productId.toString() === productId && item.size === size);

    if (productIndex > -1) {
      user.cartData[productIndex].quantity += quantity;
    } else {
      user.cartData.push({ productId, quantity, size });
    }

    await user.save();
    res.json({ success: true, cartData: user.cartData });
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ success: false, error: "Failed to add to cart" });
  }
});

// Update cart endpoint
app.post('/updatecart', fetchUser, async (req, res) => {
  const { productId, quantity, size } = req.body;

  if (!productId || quantity === undefined || !size) {
    return res.status(400).send({ errors: "Product ID, quantity, and size are required" });
  }

  try {
    let user = await User.findById(req.user);

    if (!user) {
      return res.status(404).send({ errors: "User not found" });
    }

    const productIndex = user.cartData.findIndex(item => item.productId.toString() === productId && item.size === size);

    if (productIndex > -1) {
      user.cartData[productIndex].quantity = quantity;

      if (user.cartData[productIndex].quantity <= 0) {
        user.cartData.splice(productIndex, 1);
      }
    } else {
      return res.status(400).json({ errors: "Product not found in the cart with the specified size" });
    }

    await user.save();
    res.json({ success: true, cartData: user.cartData });
  } catch (error) {
    console.error("Error updating cart:", error);
    res.status(500).json({ success: false, error: "Failed to update cart" });
  }
});

// Remove item from cart endpoint
app.delete('/removeitem', fetchUser, async (req, res) => {
  const { productId, size } = req.body;

  if (!productId || !size) {
    return res.status(400).send({ errors: "Product ID and size are required" });
  }

  try {
    let user = await User.findById(req.user);

    if (!user) {
      return res.status(404).send({ errors: "User not found" });
    }

    const productIndex = user.cartData.findIndex(item => item.productId.toString() === productId && item.size === size);

    if (productIndex > -1) {
      user.cartData.splice(productIndex, 1);
      await user.save();
      res.json({ success: true, cartData: user.cartData });
    } else {
      res.status(400).json({ errors: "Product not found in the cart with the specified size" });
    }
  } catch (error) {
    console.error("Error removing item from cart:", error);
    res.status(500).json({ success: false, error: "Failed to remove item from cart" });
  }
});

// Profile endpoint to get user details
app.get('/profile', fetchUser, async (req, res) => {
  try {
    const user = await User.findById(req.user).select('-password');
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

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
















