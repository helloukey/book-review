const userRoute = require("express").Router();
const { registerUser } = require("../controllers/userController");
const sendMail = require("../utils/mail");

userRoute.post("/register", registerUser);

module.exports = userRoute;
