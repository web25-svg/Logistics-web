import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
import db from "../models/index.js";
const User = db.users;

const authMiddleware = async (req, res, next) => {
  try {

    const token =
      req.cookies?.token 
    //   req.headers("authorization");

    if (!token) {
      return res.status(401).json({ message: "Unauthorized ❌ - Token missing" });
    }

    try {
        
    } catch (error) {
        
    }

   const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // // ✅ Find user from DB (optional: check if user still exists or not deleted)
    // const user = await User.findOne({
    //   where: {
    //     id: decoded.id,
    //     deleted_at: null,
    //   },
    // });

    // if (!user) {
    //   return res.status(401).json({ message: "Unauthorized ❌ - User not found" });
    // }

    // ✅ Attach user to request
    req.user = decoded

    next(); // ✅ continue to next middleware/route
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized ❌ - Invalid token", error: error.message });
  }
};

export default authMiddleware;
