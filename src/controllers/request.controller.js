import { RESPONSE_MESSAGES } from "../constants/responseMessage.constants.js";
import requestService from "../services/request.service.js";
import { sendResponse } from "../utils/response.handler.js";

class RequestController {
    async createRequest(req, res) {
        try {
            const request = await requestService.createRequest(req.body, req.user._id);
            return sendResponse(res, {
                status: 201,
                success: true,
                message: RESPONSE_MESSAGES.REQUEST_CREATED,
                data: request,
            });
        } catch (error) {
            return sendResponse(res, {
                status: 400,
                success: false,
                message: error.message,
            });
        }
    }

    async getRequests(req, res) {
        try {
            const requests = await requestService.getRequests(req.user._id);
            return sendResponse(res, {
                status: 200,
                success: true,
                data: requests,
            });
        } catch (error) {
            return sendResponse(res, {
                status: 400,
                success: false,
                message: error.message,
            });
        }
    }

    async getRequest(req, res) {
        try {
            const request = await requestService.getRequest(req.params.id, req.user._id);
            return sendResponse(res, {
                status: 200,
                success: true,
                data: request,
            });
        } catch (error) {
            return sendResponse(res, {
                status: 400,
                success: false,
                message: error.message,
            });
        }
    }

    async updateRequest(req, res) {
        try {
            const request = await requestService.updateRequest(
                req.params.id,
                req.body,
                req.user._id
            );
            return sendResponse(res, {
                status: 200,
                success: true,
                message: RESPONSE_MESSAGES.REQUEST_UPDATED,
                data: request,
            });
        } catch (error) {
            return sendResponse(res, {
                status: 400,
                success: false,
                message: error.message,
            });
        }
    }

    async deleteRequest(req, res) {
        try {
            const result = await requestService.deleteRequest(req.params.id, req.user._id);
            return sendResponse(res, {
                status: 200,
                success: true,
                message: RESPONSE_MESSAGES.REQUEST_DELETED,
                data: result,
            });
        } catch (error) {
            return sendResponse(res, {
                status: 400,
                success: false,
                message: error.message,
            });
        }
    }
}

export default new RequestController(); 