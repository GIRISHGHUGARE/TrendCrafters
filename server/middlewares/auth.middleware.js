import jwt from 'jsonwebtoken';
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
    const token = req.cookies["jwt-TrendCrafters"];
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.userId).select('-password'); // Exclude password
        next();
    } catch (error) {
        console.error("Authentication error:", error);
        res.status(401).json({ message: "Unauthorized" });
    }
};