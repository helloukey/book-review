const bcrypt = require("bcrypt");

const hashValue = async (value) => {
  const salt = await bcrypt.genSalt();
  return await bcrypt.hash(value, salt);
};

const compareValues = async (value, hash) => {
  return await bcrypt.compare(value, hash);
};

module.exports = { hashValue, compareValues };
