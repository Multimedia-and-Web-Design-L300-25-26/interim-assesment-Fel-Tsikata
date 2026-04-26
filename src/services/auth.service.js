const User = require("../models/User");
const generateToken = require("../utils/generatetoken");

const createError = (message, statusCode) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

const registerUser = async ({ name, email, password }) => {
	if (!name || !email || !password) {
		throw createError("Name, email, and password are required", 400);
	}

	const normalizedEmail = email.trim().toLowerCase();

	const existingUser = await User.findOne({ email: normalizedEmail });
	if (existingUser) {
		throw createError("User already exists", 409);
	}

	const user = await User.create({
		name: name.trim(),
		email: normalizedEmail,
		password,
	});

	const token = generateToken(user._id.toString());

	return {
		user,
		token,
	};
};

const loginUser = async ({ email, password }) => {
	if (!email || !password) {
		throw createError("Email and password are required", 400);
	}

	const normalizedEmail = email.trim().toLowerCase();

	const user = await User.findOne({ email: normalizedEmail });
	if (!user) {
		throw createError("Invalid email or password", 401);
	}

	const isPasswordMatch = await user.matchPassword(password);
	if (!isPasswordMatch) {
		throw createError("Invalid email or password", 401);
	}

	const token = generateToken(user._id.toString());

	return {
		user,
		token,
	};
};

module.exports = {
	registerUser,
	loginUser,
};

