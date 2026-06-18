const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const Category = require("./models/category");
const Product = require("./models/product");
const Order = require("./models/order");
const Cart=require("./models/cart");

dotenv.config();

connectDB();

const app = express();
app.use(cors());
app.use(express.json());


//        CATEGORY 

// Create Category
app.post("/categories", async (req, res) => {
  const category = await Category.create(req.body);
  res.json(category);
});

// Get All Categories
app.get("/categories", async (req, res) => {
  const categories = await Category.find();
  res.json(categories);
});

// Get Category By ID
app.get("/categories/:id", async (req, res) => {
  const category = await Category.findById(req.params.id);
  res.json(category);
});

// Update Category
app.put("/categories/:id", async (req, res) => {
  const category = await Category.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(category);
});

// Delete Category
app.delete("/categories/:id", async (req, res) => {
  await Category.findByIdAndDelete(req.params.id);

  res.json({
    message: "Category deleted"
  });
});



//        PRODUCT CRUD


// Create Product
app.post("/products", async (req, res) => {
  const product = await Product.create(req.body);

  res.json(product);
});

// Get All Products
app.get("/products", async (req, res) => {
  const products = await Product.find();

  res.json(products);
});

// Get Product By ID
app.get("/products/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);

  res.json(product);
});

// Get Products By Category
app.get("/products/category/:category", async (req, res) => {
  const products = await Product.find({
    category: req.params.category
  });

  res.json(products);
});

// Update Product
app.put("/products/:id", async (req, res) => {
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(product);
});

// Delete Product
app.delete("/products/:id", async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);

  res.json({
    message: "Product deleted"
  });
});


       // ORDER CRUD


// Place Order
app.post("/orders", async (req, res) => {
  const order = await Order.create(req.body);

  res.json(order);
});

// Get All Orders
app.get("/orders", async (req, res) => {
  const orders = await Order.find()
    .populate("products.productId");

  res.json(orders);
});

// Get Single Order
app.get("/orders/:id", async (req, res) => {
  const order = await Order.findById(req.params.id)
    .populate("products.productId");

  res.json(order);
});

// Update Order Status
app.put("/orders/:id", async (req, res) => {
  const order = await Order.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(order);
});

// Delete Order
app.delete("/orders/:id", async (req, res) => {
  await Order.findByIdAndDelete(req.params.id);

  res.json({
    message: "Order deleted"
  });
});


//          CART CRUD


// Add Product To Cart
app.post("/cart", async (req, res) => {
  try {
    const cartItem = await Cart.create(req.body);

    res.status(201).json(cartItem);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});


// Get All Cart Items
app.get("/cart", async (req, res) => {
  try {
    const cartItems = await Cart.find()
      .populate("productId");

    res.json(cartItems);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});


// Get Single Cart Item
app.get("/cart/:id", async (req, res) => {
  try {
    const cartItem = await Cart.findById(req.params.id)
      .populate("productId");

    res.json(cartItem);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});


// Update Cart Quantity
app.put("/cart/:id", async (req, res) => {
  try {
    const cartItem = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        quantity: req.body.quantity
      },
      { new: true }
    );

    res.json(cartItem);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});


// Remove Single Item From Cart
app.delete("/cart/:id", async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);

    res.json({
      message: "Item removed from cart"
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});


// Clear Entire Cart
app.delete("/cart", async (req, res) => {
  try {
    await Cart.deleteMany();

    res.json({
      message: "Cart cleared successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});
app.listen(process.env.PORT || 5000, () => {
  console.log("Server Running...");
});