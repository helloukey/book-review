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
  },
  expireAt: {
    type: Date,
    default: Date.now,
    index: { expires: 3600 } // this document will be deleted after 1 hour
  },
});

// Hash password before saving it to the database
otpSchema.pre("save", async function (next) {
  this.otp = await hashValue(this.otp);
  next();
});

module.exports = mongoose.model("Otp", otpSchema);
