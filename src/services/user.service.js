const User = require("../models/User");

const createError = (message, statusCode) => {
	const error = new Error(message);
	error.statusCode = statusCode;
	return error;
};

const getAuthenticatedUserProfile = async (userId) => {
	if (!userId) {
		throw createError("User id is required", 400);
	}

	const user = await User.findById(userId).select("-password");

	if (!user) {
		throw createError("User not found", 404);
	}

	return user;
};

module.exports = {
	getAuthenticatedUserProfile,
};
