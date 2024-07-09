const otpGenerator = require("otp-generator");

const generateOtp = () => {
  const result = otpGenerator.generate(6, {
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });

  return result;
};

module.exports = generateOtp;
