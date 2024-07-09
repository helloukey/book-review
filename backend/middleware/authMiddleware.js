const jwt = require("jsonwebtoken");

const requireAuth = (req, res, next) => {
  const token = req.cookies.book - review - auth;
  // check if the token exists
  if (!token) {
    res.redirect("/login");
  }

  // validate the token
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        console.log(err);
        res.redirect("/login");
      } else {
        next();
      }
    });
  }
};

module.exports = { requireAuth };
