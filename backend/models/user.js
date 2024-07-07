const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minLength: 6, maxLength: 20 },
  username: {
    type: String,
    required: true,
    unique: true,
    minLength: 6,
    maxLength: 20,
  },
  location: { type: String, required: false },
  age: { type: Number, required: false },
  work: { type: String, required: false },
  dob: { type: Date, required: false },
  description: { type: String, required: false },
  verified: { type: Boolean, default: false },
});

module.exports = mongoose.model("User", userSchema);
