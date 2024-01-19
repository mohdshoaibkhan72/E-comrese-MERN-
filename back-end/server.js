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
const Getproduct = require("./product Api/getproduct");

const Chngepswd = require("./Pasword/chnagepswd");
const Deleteproduct = require("./product Api/deletproduct");

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
app.use("/", express.static("data/images"));

//delted product

app.delete("/deletproduct/:productId", Deleteproduct);

//change paswd
app.post("/changePasword", Chngepswd);

// Start the server on port 8000
app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
