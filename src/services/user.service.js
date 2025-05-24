import { sendEmail } from "../utils/sendMail.js";
import { genarate6DigitOtp } from "../utils/OtpGenarate.js";
import { fileDestroy, fileUploader } from "../utils/fileUpload.js";
import { timeExpire } from "../utils/timeExpire.js";
import { Users } from "../model/user.model.js";

import mongoose from "mongoose";
import { sendCookie } from "../utils/tokenGenarate.js";

export const UserService = {
    async createUser(body, res) {
        console.log("ok created account ");

        // step1 : email exist or not
        const { email } = body;
        const isExist = await Users.findOne({ email });
        if (isExist) {
            throw new Error("User alrady exist ");
        }

        const user = await Users.create(body);

        const otp = genarate6DigitOtp();
        user.otp = otp;
        user.otpExpiary = Date.now() + 5 * 60 * 1000; // OTP valid for 5 minutes

        await user.save();

        await sendEmail(
            user.email,
            `Welcome ${user.name}`,
            "Thank you for choosing BookBuddy. for your Reading Partner ."
        );
        // await sendEmail(user.email, "Verify Account - OTP", otp)
        return user;
    },

    async verifyOtp(otp) {
        const user = await Users.findOne({
            otp,
            otpExpiary: { $gt: Date.now() },
        });
        if (!user) {
            throw new Error("Invalid OTP");
        }

        user.otp = null;
        user.otpExpiary = null;
        user.isVerify = true;
        await user.save();
        return user;
    },

    async sendOtpForVerification(email) {
        const user = await Users.findOne({ email });
        if (!user) {
            throw new Error("User not found");
        }

        const otp = genarate6DigitOtp();
        user.otp = otp;
        user.otpExpiary = Date.now() + 5 * 60 * 1000; // OTP valid for 5 minutes
        await user.save();
        await sendEmail(email, "Verify Account - OTP", otp);
    },

    async loginUser(body, res) {
        const { email, password } = body;
        const user = await Users.findOne({ email }).select("+password");
        if (!user || !(await user.comparePassword(password))) {
            throw new Error("Invalid email or password");
        }
        sendCookie(user, res, "Login successful");
        return user;
    },

    async getAllUser(userId) {
        return await Users.find({ _id: { $ne: userId } });
    },

    async changeProfilePic(id, body, file) {
        console.log("file ====> ", file);
        console.log("body ====> ", body);

        const user = await Users.findById(id);
        if (!user) {
            throw new Error("User not found");
        }

        if (user.profile_pic?.public_id) {
            await fileDestroy(user.profile_pic.public_id);
        }

        const { url, public_id, error } = await fileUploader(file.path);
        if (error) {
            throw new Error("File upload failed");
        }

        user.profile_pic = { url, public_id };
        await user.save();
        return user;
    },

    async logOutUser(req, res) {
        return res
            .status(200)
            .cookie("token", null) // Set the JWT in a cookie
            .json({
                success: true,
                message: "Logout successful",
            });
    },

    async deleteUser(id) {
        return await Users.findByIdAndDelete(id);
    },

    async updateUser(id, updateData) {
        return await Users.findByIdAndUpdate(id, updateData, { new: true });
    },
};
