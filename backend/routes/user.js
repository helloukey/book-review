const userRoute = require("express").Router();
const {
  registerUser,
  verifyOTP,
  loginUser,
  updateUser,
  getUser,
} = require("../controllers/userController");
const { requireAuth } = require("../middleware/authMiddleware");

userRoute.post("/register", registerUser);
userRoute.post("/verify", verifyOTP);
userRoute.post("/login", loginUser);
userRoute.post("/update-user", requireAuth, updateUser);
userRoute.get("/get-user", requireAuth, getUser);

module.exports = userRoute;
