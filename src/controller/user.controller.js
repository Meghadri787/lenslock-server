import { RESPONSE_MESSAGES } from "../constants/responseMessage.constants.js";
import { HTTP_STATUS } from "../constants/statusCode.constants.js";
import userService from "../services/user.service.js";
import { sendResponse } from "../utils/response.handler.js";

class UserController {
    async createUser(req, res) {
        try {
            const data = await userService.createUser(req.body);
            console.info("User created");
            return sendResponse(res, {
                status: HTTP_STATUS.CREATED,
                message: RESPONSE_MESSAGES.CETAGORIES_CREATE_SUCCESS,
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
}

export default new UserController();
