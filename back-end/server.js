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
const DelCartItems = require("./Card/deleteCard");
const UpdateProduct = require("./product Api/updateproduct");
// Middleware for parsing JSON
app.use(express.json());

// Connect to the database
connectDB();

// Enable CORS
app.use(cors());

// Route for user registration & login
app.post("/register", registerUser);
app.post("/login", login);

// Route for product to the database
app.post("/addproduct", upload.single("file"), Addproduct);
app.get("/getproducts", Getproduct);
app.put("/updateProduct/:productId", checkAuthMiddle, UpdateProduct);

app.delete("/deletproduct/:productId", checkAuthMiddle, Deleteproduct);
// Serve static files from "data/productimages"
app.use("/", express.static("images/"));

// Route for get email changing password
app.get("/getemail", checkAuthMiddle, Chngepswd);
app.put("/changePassword", checkAuthMiddle, Chngepswd);

// Route for handling shopping cart items
app.post("/shopingcard", checkAuthMiddle, Addcard);
app.get("/getcard", checkAuthMiddle, GetCartItems);
app.delete("/deleteCard", checkAuthMiddle, DelCartItems);

// Start the server on port 8000
app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
