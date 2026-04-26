const jwt = require("jsonwebtoken");

const createError = (message, statusCode) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

const generateFreshToken = (userId) => {
  if (!process.env.JWT_SECRET) {
    throw createError("JWT secret is not configured", 500);
  }

  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
};

const verifyToken = (token) => {
  if (!token) {
    throw createError("Token is missing", 401);
  }

  if (!process.env.JWT_SECRET) {
    throw createError("JWT secret is not configured", 500);
  }

  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      throw createError("Token has expired", 401);
    }
    throw createError("Invalid token", 401);
  }
};

module.exports = {
  generateFreshToken,
  verifyToken,
};
