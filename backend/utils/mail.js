require("dotenv").config();
const nodemailer = require("nodemailer");

let mailTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_ADDRESS,
    pass: process.env.GMAIL_PASSWORD,
  },
});

const mailDetails = (email, otp, url) => {
  return {
    from: process.env.GMAIL_ADDRESS,
    to: email,
    subject: "OTP Verification",
    html: `<p>Hi! Your OTP is <b>${otp}</b></p><br/><a href="${url}" target="_blank">Click here to Verify</a>`,
  };
};

const sendMail = async (email, otp, url) => {
  try {
    await mailTransporter.sendMail(mailDetails(email, otp, url));
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

module.exports = sendMail;
