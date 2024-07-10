const jwt = require("jsonwebtoken");
const User = require("../models/user");

const requireAuth = async (req, res, next) => {
  const token = req?.cookies?.jwt;
  // check if the token exists
  if (!token) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  try {
    // verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // check if the user exists
    const user = await User.findById(decoded?.id);
    if (!user) {
      res.redirect("/login");
    }
    // check if the user has verified their account
    if (!user.verified) {
      return res
        .status(400)
        .json({ success: false, message: "Please verify your account" });
    }

    // set the user in the request object
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.redirect("/login");
  }
};

module.exports = { requireAuth };
