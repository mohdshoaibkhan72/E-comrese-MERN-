//connection of mongosh Db in server js file 

const express = require("express");
const mongoose = require("mongoose");
const app = express();
const connect = () => {
  try {
    mongoose.connect("mongodb://localhost:27017");
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};
connect();
app.listen(8888, () => {
  console.log("server is listning at port no: 8000");
});

//
try {
      const response = await axios.post('http://localhost:8000/login', loginData);
      const { accessToken, user } = response.data;

      // Store the token in an HTTP-only cookie or in memory
      // For HTTP-only cookie:
      document.cookie = `accessToken=${accessToken}; path=/; secure; samesite=strict`;

      // For in-memory storage (use a state management library or context):
      // Example using React state:
      // setAccessToken(accessToken);

      // Redirect to the home page or another route
      window.location.href = '/home';
    } catch (error) {
      console.error('Login error:', error.message);
      alert('Invalid username or password');
    }

    // Reset login form
    setLoginData({ username: '', password: '' });