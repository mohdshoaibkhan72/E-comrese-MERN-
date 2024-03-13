const jwt = require("jsonwebtoken");
require("dotenv").config();

function checkAuthMiddle(req, res, next) {
  let accessToken = req.headers["authorization"];

  console.log("accessToken", accessToken);

  jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (error, result) => {
    if (error) {
      console.log("Unouhtrise user ,and error is : ", error);
    }
    // console.log(result);
    // res.status(200).json("success");
    req.user = result;
    next();
  });
  // console.log(result);
}

module.exports = checkAuthMiddle;
