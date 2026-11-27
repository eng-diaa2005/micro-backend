import { User } from "../DB/models/user.model.js";
import jwt from "jsonwebtoken";

export const authMiddleware = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;

    // Check Authorization header
    if (!authorization) {
      return res.status(401).json({
        message: "token not found",
      });
    }

    // Check Bearer format
    if (!authorization.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Invalid authorization format",
      });
    }

    // Extract token
    const token = authorization.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "token not found",
      });
    }

    // Verify token
    const { id } = jwt.verify(
      token,
      process.env.SECRET_KEY1
    );

    // Find user
    const user = await User.findById(id).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Attach user to request
    req.user = user;

    next();

  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};