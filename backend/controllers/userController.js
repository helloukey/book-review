const User = require("../models/user");
const Otp = require("../models/otp");
const generateOtp = require("../utils/otp");
const sendMail = require("../utils/mail");

// Register a new user
const registerUser = async (req, res) => {
  const { email, password, username } = req.body;
  // Check if the email, password, and username are provided
  if (!email || !password || !username) {
    return res.status(400).json({ message: "Please fill in all fields" });
  }

  try {
    // check if the user already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }
    // create a new user and an OTP document
    const user = await User.create({ email, password, username });
    const otp = generateOtp();
    const otpDoc = await Otp.create({ otp, user: user._id, createdAt: Date.now(), expiresAt: Date.now() + 3600000});

    // send the OTP to the user's email
    const url = `${process.env.FRONTEND_BASE_URL}/verify/${otpDoc._id}`;
    const mail = await sendMail(user.email, otp, url);
    if (!mail) {
      return res
        .status(500)
        .json({ success: false, message: "Failed to send OTP" });
    }

    return res.status(201).json({
      otpId: otpDoc._id,
      success: true,
      message: "User created successfully! Check your email for the OTP",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { registerUser };
