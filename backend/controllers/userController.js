const User = require("../models/user.js");
const Otp = require("../models/otp.js");
const generateOtp = require("../utils/otp.js");
const sendMail = require("../utils/mail.js");
const { compareValues } = require("../utils/bcrypt.js");
const generateToken = require("../utils/token.js");
const { detailsOptions } = require("../utils/details.js");

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
    const value = await compareValues(otp, otpDoc.otp);
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
      // generate a token and send it to the user
      const token = generateToken(otpDoc.user);
      res.cookie("jwt", token, {
        httpOnly: true,
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 24 * 30,
      });
      return res
        .status(200)
        .json({
          success: true,
          user: otpDoc.user,
          message: "OTP verified successfully",
        });
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
    if (!user?.verified) {
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
    res.cookie("jwt", token, {
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
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

// Logout a user
const logoutUser = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.status(200).json({ success: true, message: "Logout successful" });
};

// update user details
const updateUser = async (req, res) => {
  const { location, age, work, dob, description } = req.body;
  const details = detailsOptions(location, age, work, dob, description);

  try {
    const user = await User.findByIdAndUpdate(req.user.id, details, {
      new: true,
    });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    return res.status(200).json({
      success: true,
      user: user.id,
      message: "User updated successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get user details
const getUser = async (req, res) => {
  try {
    const user = await User.findById(req?.user?.id, { password: 0 });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    return res
      .status(200)
      .json({ success: true, user, message: "User found 😀" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  registerUser,
  verifyOTP,
  loginUser,
  logoutUser,
  updateUser,
  getUser,
};
