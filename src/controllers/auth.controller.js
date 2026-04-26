const { registerUser, loginUser } = require("../services/auth.service");

const registerUserHandler = async (req, res) => {
    try {
        const { user, token } = await registerUser(req.body);
        res.status(201).json({
            success: true,
            data: {
                user,
                token,
            },
        });
    } catch (error) {
        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || "Server Error",
        });
    }
};

const loginUserHandler = async (req, res) => {
    try {
        const { user, token } = await loginUser(req.body);
        res.status(200).json({
            success: true,
            data: {
                user,
                token,
            },
        });
    } catch (error) {
        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || "Server Error",
        });
    }
};

module.exports = {
    registerUserHandler,
    loginUserHandler,
};