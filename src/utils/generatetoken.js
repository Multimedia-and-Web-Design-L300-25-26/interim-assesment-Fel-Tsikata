const { generateFreshToken } = require("./jwt");

const generateToken = (userId) => {
  return generateFreshToken(userId);
};

module.exports = generateToken;
