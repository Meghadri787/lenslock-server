
import jwt from "jsonwebtoken";

export const tokenGenarate = async(user) => {
  // Generate JWT token
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  return token 
};