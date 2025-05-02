
import jwt from "jsonwebtoken";
import { Users } from "../model/user.model.js";


export const isAuthenticate = async (req, res , next) => {
    try {
        const token = req.cookies.token ? req.cookies.token : req.headers.token;
        // console.log( ' token' , token);
        
        if (!token) {
            return res.status(400).json({
                success: false,
                message: "user not authenticated , please login first !",
            });
        } else {
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await Users.findById( decode._id , "-password");
            // console.info("not error");
            next();
        }

    } catch (error) {
       return  res.status(400).json({
            message: "user not authenticate",
            error
        });
    }
}

export const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {
      const { role } = req.user;

      if (allowedRoles.includes(role)) {
        console.info("Access granted");
        next();
      } else {
        console.error("Access denied");
        res.status(403).json({
          message: "Access denied. You do not have the required permissions.",
        });
      }
    };
  };
  