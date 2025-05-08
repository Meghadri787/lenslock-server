

import jwt from "jsonwebtoken";

export const sendCookie = (user, res, message, statusCode = 200) => {
  
    // Generate JWT token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });

    // Set cookie options
    const cookieOptions = {
        httpOnly: true, // Prevent JavaScript access for security
        secure: process.env.NODE_ENV === "production", // Use secure cookies in production
        sameSite: "lax", // Mitigate CSRF attacks
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // Expire in 30 days
        path: "/", // Accessible from all paths
    };

    // console.log("all ok this is run ");
    

    // Set the cookie and send the response
    return res
        .status(statusCode)
        .cookie("token", token, cookieOptions) // Set the JWT in a cookie
        .json({
            success: true,
            message,
            data: user,
        });
};
