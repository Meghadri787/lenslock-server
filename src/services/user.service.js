import { RESPONSE_MESSAGES } from "../constants/responseMessage.constants.js";
import { Users } from "../model/user.model.js";
import { sendOtpEmail } from "../utils/otpEmail.service.js";
import { sendPasswordResetSuccessEmail } from "../utils/passwordResetSuccess.service.js";
import { sendRegisterEmail } from "../utils/registerEmail.service.js";

class UserService {
    async createUser(body) {
        const data = await Users.create({
            name: body.name,
            email: body.email,
            password: body.password,
            profile_pic: body.profile_pic, // optional
            role: body.role, // optional
            otp: body.otp, // optional
            otpExpiary: body.otpExpiary, // optional
            isProfileComplete: body.isProfileComplete, // optional
        });

        await sendRegisterEmail(data.email, data.name);

        return data;
    }

    async login({ email, password }) {
        const user = await Users.findOne({ email }).select("+password");

        if (!user) {
            throw new Error("Invalid email or password");
        }

        const isPasswordMatch = await user.comparePassword(password);

        if (!isPasswordMatch) {
            throw new Error("Invalid email or password");
        }

        user.password = undefined;

        return user;
    }

    async forgotPassword(email) {
        const user = await Users.findOne({ email });

        if (!user) {
            throw new Error("User not found");
        }

        const otp = Math.floor(100000 + Math.random() * 900000); // 6 digit OTP
        const otpExpiary = new Date(Date.now() + 10 * 60 * 1000); // 10 min expiry

        user.otp = otp;
        user.otpExpiary = otpExpiary;

        await user.save();

        // Send OTP via email
        await sendOtpEmail(user.email, otp);
        // const emailSent = await sendOtpEmail(user.email, otp);

        // if (!emailSent) {
        //     // If email sending fails, we'll still return success but log the issue
        //     console.warn(`⚠️ OTP generated for ${email} but email sending failed. OTP: ${otp}`);
        //     return {
        //         message: "OTP generated but email sending failed. Please contact support.",
        //         otp: otp // Only include OTP in development environment
        //     };
        // }

        return {
            message: RESPONSE_MESSAGES.EMAIL_SENT_SUCCESS,
        };
    }

    async verifyOtp(email, otp) {
        const user = await Users.findOne({ email, otp });

        if (!user) {
            throw new Error("Invalid OTP or Email");
        }

        if (user.otpExpiary < new Date()) {
            throw new Error("OTP expired");
        }

        // OTP verified successfully
        return {
            message: RESPONSE_MESSAGES.OTP_VERIFIED,
        };
    }

    async resetPassword(email, otp, newPassword) {
        const user = await Users.findOne({ email, otp });

        if (!user) {
            throw new Error("Invalid OTP or Email");
        }

        if (user.otpExpiary < new Date()) {
            throw new Error("OTP expired");
        }

        user.password = newPassword;
        user.otp = undefined;
        user.otpExpiary = undefined;

        await user.save();

        await sendPasswordResetSuccessEmail(email, user.name);

        return {
            message: RESPONSE_MESSAGES.PASSWORD_UPDATED,
        };
    }
}

export default new UserService();
