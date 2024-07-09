const userRoute = require("express").Router();
const { registerUser, verifyOTP } = require("../controllers/userController");

userRoute.post("/register", registerUser);
userRoute.post("/verify", verifyOTP);

module.exports = userRoute;
