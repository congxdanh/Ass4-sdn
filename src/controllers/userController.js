const User = require("../models/userModel");

exports.getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "The user cannot be found",
            });
        }
        res.json({
            success: true,
            data: {
                id: user._id,
                fullName: user.fullName,
                username: user.username,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};
exports.updateMe = async (req, res) => {
    try {
        const { fullName } = req.body;
        const user = await User.findByIdAndUpdate(
            req.user.id,
            { fullName },
            { new: true, runValidators: true }
        );
        res.json({
            success: true,
            message: "User information updated successfully",
            data: {
                id: user._id,
                fullName: user.fullName,
                username: user.username,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};
