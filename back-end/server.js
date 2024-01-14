const express = require("express");
const connectDB = require("./db/DbConnection");
const app = express();
const cors = require("cors");
const registerUser = require("./db/Registration");
const Addproduct=require("./product Api/addproduct")
const login = require("./db/login");
require("dotenv").config();
const multer=require("multer");
const upload = multer({dest: 'data/product_images/'});

//midleware for parsing
app.use(express.json());
connectDB();

//anable cors
app.use(cors());

//importing from registration
app.post("/register", registerUser);

//importing login page
app.post("/login", login);

// adding product in datbase
app.post("/addproduct", upload.single("file") ,Addproduct);
// Import the Getproduct function


const Getproduct = require("./product Api/getproduct");
// Define a route for getting products
app.get("/getproducts", Getproduct);


app.get("/", (req, res) => {
  console.log(path.join(__dirname, "../public"));

});


app.listen(8000, () => {
  console.log("server is runing in port no 8000");
});


