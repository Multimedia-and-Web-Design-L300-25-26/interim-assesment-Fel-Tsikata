const { getAuthenticatedUserProfile } = require("../services/user.service");

const getUserProfileHandler = async (req, res) => {
    try {
        const userId = req.user?._id || req.user?.id;
        const user = await getAuthenticatedUserProfile(userId);
        res.status(200).json({
            success: true,
            data: user,
        });
    } catch (error) {
        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || "Server Error",
        });
    }
};

module.exports = {
	getUserProfileHandler,
};
