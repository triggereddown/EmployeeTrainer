import jwt from "jsonwebtoken";
import User from "../models/User.js";

const protect = async (req, res, next) => {
  //   console.log("AUTH HEADER:", req.headers.authorization);

  let token;

  // Check if token exists in Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    try {
      // Extract token
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach user to request (exclude password)
      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        return res.status(401).json({
          success: false,
          error: "User not found",
          statusCode: 401,
        });
      }

      return next();
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({
          success: false,
          error: "Token has expired",
          statusCode: 401,
        });
      }

      return res.status(401).json({
        success: false,
        error: "Auth middleware error, token failed",
        statusCode: 401,
      });
    }
  }

  return res.status(401).json({
    success: false,
    error: "Not authorized, no token",
    statusCode: 401,
  });
};

export default protect;
