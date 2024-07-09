const userRoute = require("express").Router();
const { registerUser, verifyOTP, loginUser } = require("../controllers/userController");

userRoute.post("/register", registerUser);
userRoute.post("/verify", verifyOTP);
userRoute.post("/login", loginUser);

module.exports = userRoute;
