import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

/* ---------------------------------------------------------- */

export const verifyJWT = async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ error: "Unauthorized: No Token Provided" });
    }

    const decodedToken = JWT.verify(token, process.env.JWT_TOKEN_SECRET);

    if (!decodedToken) {
      return res.status(401).json({ error: "Unauthorized: Invalid Token" });
    }

    const user = await userModel.findById(decodedToken._id).select("-password");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log("Error in protectRoute middleware", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

/* ---------------------------------------------------------- */
