const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.register = async (req, res) => {
    const { fullName, username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const user = new User({ fullName, username, password: hashedPassword });
        await user.save();
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: {
                id: user._id,
                fullName: user.fullName,
                username: user.username,
            },
        });
    } catch (error) {
        if (error.code === 11000) {
            // Duplicate username
            return res.status(400).json({
                success: false,
                message: "Username already exists",
            });
        }
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username }).select("+password");
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({
                success: false,
                message: "Invalid username or password",
            });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRE,
        });
        res.status(200).json({
            success: true,
            message: "Login successful",
            token,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

exports.authenticate = (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token)
        return res
            .status(401)
            .json({ success: false, message: "Token is missing or invalid" });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err)
            return res.status(401).json({
                success: false,
                message: "Token is missing or invalid",
            });
        req.user = user;
        next();
    });
};
