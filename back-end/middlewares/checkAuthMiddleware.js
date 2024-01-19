const jwt = require("jsonwebtoken");
require("dotenv").config();

function checkAuthMiddle(req, res, next) {
  let accessToken = req.headers["Authorization"];

  jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, result) => {
    if (err) {
      res.status(401).json("Invalid AccessToken");
      return;
    }

    // console.log(result);
    // res.status(200).json("success");
    req.user = result;
    next();
  });
  // console.log(result);
}

module.exports = checkAuthMiddle;
