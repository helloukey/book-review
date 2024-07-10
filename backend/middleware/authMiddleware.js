const jwt = require("jsonwebtoken");
const User = require("../models/user");

const requireAuth = async (req, res, next) => {
  const token = req?.cookies?.jwt;
  // check if the token exists
  if (!token) {
    res.redirect("/login");
  }

  try {
    // verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // check if the user exists
    const user = await User.findById(decoded?.id);
    if (!user) {
      res.redirect("/login");
    }
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.redirect("/login");
  }
};

module.exports = { requireAuth };
