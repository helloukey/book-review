const mongoose = require("mongoose");
const { hashValue } = require("../utils/bcrypt");
const Schema = mongoose.Schema;

const otpSchema = new Schema({
  otp: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  expiresAt: {
    type: Date,
    required: true,
  }
});

// Hash password before saving it to the database
otpSchema.pre("save", async function (next) {
  this.otp = await hashValue(this.otp);
  next();
});

module.exports = mongoose.model("Otp", otpSchema);
