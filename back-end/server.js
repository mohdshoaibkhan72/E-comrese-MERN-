const express = require("express");
const connectDB = require("./connection/DbConnection");
const app = express();
const cors = require("cors");
const registerUser = require("./Login-registraion/Registration");
const Addproduct = require("./product Api/addproduct");
const login = require("./Login-registraion/login");
const multer = require("multer");
const upload = multer({ dest: "images/" });

const Getproduct = require("./product Api/getproduct");
const Chngepswd = require("./Pasword/chnagepswd");
const Deleteproduct = require("./product Api/deletproduct");
const checkAuthMiddle = require("./middlewares/checkAuthMiddleware");
const Addcard = require("./Card/addcard");
const GetCartItems = require("./Card/getCard");
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
app.get("/getproducts", Getproduct);
app.get("/getemail", Chngepswd);

// Serve static files from "data/productimages"
app.use("/", express.static("images/"));

// Route for deleting product
app.delete("/deletproduct/:productId", Deleteproduct);

// Route for changing password
app.put("/changePassword", checkAuthMiddle, Chngepswd);

// Route for handling shopping cart items
app.post("/shopingcard", Addcard);
app.get("/getcard", GetCartItems);

// Start the server on port 8000
app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
