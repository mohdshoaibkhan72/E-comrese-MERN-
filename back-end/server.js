const express = require("express");
const connectDB = require("./db/DbConnection");
const app = express();
const cors = require("cors");
const registerUser = require("./db/Registration");
const Addproduct = require("./product Api/addproduct");
const login = require("./db/login");
const multer = require("multer");
const upload = multer({ dest: 'data/images/' });
const path = require("path");

// Middleware for parsing JSON
app.use(express.json());

// Connect to the database
connectDB();

// Enable CORS
app.use(cors());

// Route for user registration
app.post("/register", registerUser);

// Route for user login
app.post("/login", login);

// Route for adding product to the database
app.post("/addproduct", upload.single("file"), Addproduct);

// Route for getting products
const Getproduct = require("./product Api/getproduct");
app.get("/getproducts", Getproduct);

// Serve static files from "data/productimages"
app.use('/', express.static('data/images'));

// Root route - Send a response or a file if needed
app.get("/", (req, res) => {
  console.log(path.join(__dirname, "../public"));
  // Example: Sending a response
  res.send("Welcome to the root route!");
});

// Start the server on port 8000
app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
