import jwt from "jsonwebtoken";
import { users } from "../Models/Signup.model.js";

export const AuthMiddleware = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const user = jwt.verify(token, "privateKey");

    const foundUser = await users.findByPk(user.userId); 
    if (foundUser) {
      req.user = foundUser;
      next();
    } else {
      throw new Error("User not found");
    }
  } catch (error) {
    return res.status(401).json({ success: false, error: "Unauthorized" });
  }
};
