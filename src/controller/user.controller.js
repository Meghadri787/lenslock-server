import { RESPONSE_MESSAGES } from "../constants/responseMessage.constants.js";
import { HTTP_STATUS } from "../constants/statusCode.constants.js";
import { Users } from "../model/user.model.js";
import userService from "../services/user.service.js";
import { sendResponse } from "../utils/response.handler.js";

class UserController {
    async createUser(req, res) {
        try {
            const isExists = Users.findOne({ email: req.body.email });
            if (isExists) {
                return sendResponse(res, {
                    status: HTTP_STATUS.CONFLICT,
                    message: RESPONSE_MESSAGES.USER_EXISTS,
                    success: false,
                });
            }
            const data = await userService.createUser(req.body, res);
            console.info("User created");
            return sendResponse(res, {
                status: HTTP_STATUS.CREATED,
                message: RESPONSE_MESSAGES.USER_CREATED,
                success: true,
                data: data,
            });
        } catch (error) {
            return sendResponse(res, {
                status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
                success: false,
                message: RESPONSE_MESSAGES.INTERNAL_ERROR,
                error: error.message,
            });
        }
    }

    // Login User
    async loginUser(req, res) {
        try {
            const user = await userService.login(req.body);
            console.info("USer logged in");

            return sendResponse(res, {
                status: HTTP_STATUS.OK,
                message: "Logged in",
                success: true,
                data: user,
            });
        } catch (error) {
            return sendResponse(res, {
                status: HTTP_STATUS.BAD_REQUEST,
                success: false,
                message: error.message,
            });
        }
    }

    // FORGOT PASSWORD (send OTP)
    async forgotPassword(req, res) {
        try {
            const data = await userService.forgotPassword(req.body.email);
            return sendResponse(res, {
                status: HTTP_STATUS.OK,
                success: true,
                message: "OTP sent successfully",
                data,
            });
        } catch (error) {
            return sendResponse(res, {
                status: HTTP_STATUS.BAD_REQUEST,
                success: false,
                message: error.message || RESPONSE_MESSAGES.INTERNAL_ERROR,
                error: error.message,
            });
        }
    }

    // VERIFY OTP
    async verifyOtp(req, res) {
        try {
            const data = await userService.verifyOtp(
                req.body.email,
                req.body.otp
            );
            return sendResponse(res, {
                status: HTTP_STATUS.OK,
                success: true,
                message: "OTP verified successfully",
                data,
            });
        } catch (error) {
            return sendResponse(res, {
                status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
                success: false,
                message: RESPONSE_MESSAGES.INTERNAL_ERROR,
                error,
            });
        }
    }

    // RESET PASSWORD
    async resetPassword(req, res) {
        try {
            const data = await userService.resetPassword(
                req.body.email,
                req.body.otp,
                req.body.newPassword
            );
            return sendResponse(res, {
                status: HTTP_STATUS.OK,
                success: true,
                message: "Password reset successfully",
                data,
            });
        } catch (error) {
            return sendResponse(res, {
                status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
                success: false,
                message: RESPONSE_MESSAGES.INTERNAL_ERROR,
                error,
            });
        }
    }
}

export default new UserController();
