const User = require("../models/user");
const Otp = require("../models/otp");
const generateOtp = require("../utils/otp");
const sendMail = require("../utils/mail");
const { compareValues } = require("../utils/bcrypt");
const generateToken = require("../utils/token");

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
    const otpDoc = await Otp.create({
      otp,
      user: user._id,
      createdAt: Date.now(),
      expiresAt: Date.now() + 3600000,
    });

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
    res.status(500).json({ success: false, message: error.message });
  }
};

// Verify the OTP
const verifyOTP = async (req, res) => {
  const { otp, otpId } = req.body;
  if (!otp || !otpId) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide the OTP details" });
  }

  try {
    // find the OTP document
    const otpDoc = await Otp.findById(otpId);
    // check if the OTP is valid
    if (!otpDoc) {
      return res.status(404).json({ success: false, message: "Invalid OTP" });
    }
    const value = compareValues(otp, otpDoc.otp);
    if (!value) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }

    // check if the OTP has expired
    if (otpDoc.expiresAt < Date.now()) {
      await Otp.deleteMany({ user: otpDoc.user });
      return res.status(400).json({
        success: false,
        message: "OTP has expired, Login again to get new OTP",
      });
    }

    // update the user's account status
    if (value) {
      await User.findByIdAndUpdate(otpDoc.user, { verified: true });
      await Otp.deleteMany({ user: otpDoc.user });
      return res
        .status(200)
        .json({ success: true, message: "OTP verified successfully" });
    }

    return res
      .status(400)
      .json({ success: false, message: "OTP verification failed!" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Login a user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide email and password" });
  }

  try {
    // check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid email or password" });
    }

    // check if the password is correct
    const match = await compareValues(password, user.password);
    if (!match) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or password" });
    }

    // check if the user has verified their account
    if (!user.verified) {
      await Otp.deleteMany({ user: user._id });
      const otp = generateOtp();
      const otpDoc = await Otp.create({
        otp,
        user: user._id,
        createdAt: Date.now(),
        expiresAt: Date.now() + 3600000,
      });
      // send the OTP to the user's email
      const url = `${process.env.FRONTEND_BASE_URL}/verify/${otpDoc._id}`;
      const mail = await sendMail(user.email, otp, url);
      if (!mail) {
        return res
          .status(500)
          .json({ success: false, message: "Failed to send OTP" });
      }
      return res
        .status(400)
        .json({ success: false, message: "Please verify your account" });
    }

    // generate a token and send it to the user
    const token = generateToken(user._id);
    res.cookie("book-review-auth", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 * 24 * 30,
    });
    return res
      .status(200)
      .json({ success: true, user: user._id, message: "Login successful" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { registerUser, verifyOTP, loginUser };
