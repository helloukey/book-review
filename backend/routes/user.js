const userRoute = require("express").Router();
const { registerUser } = require("../controllers/userController");

userRoute.post("/register", registerUser);

module.exports = userRoute;
