import { RESPONSE_MESSAGES } from "../constants/responseMessage.constants.js";
import studioService from "../services/studio.service.js";
import { sendResponse } from "../utils/response.handler.js";

class StudioController {
    async createStudio(req, res) {
        try {
            const studio = await studioService.createStudio(req.body, req.user._id);
            return sendResponse(res, {
                status: 201,
                success: true,
                message: RESPONSE_MESSAGES.STUDIO_CREATED,
                data: studio,
            });
        } catch (error) {
            return sendResponse(res, {
                status: 400,
                success: false,
                message: error.message,
            });
        }
    }

    async getStudios(req, res) {
        try {
            const studios = await studioService.getStudios();
            return sendResponse(res, {
                status: 200,
                success: true,
                data: studios,
            });
        } catch (error) {
            return sendResponse(res, {
                status: 400,
                success: false,
                message: error.message,
            });
        }
    }

    async getStudio(req, res) {
        try {
            const studio = await studioService.getStudio(req.params.id);
            return sendResponse(res, {
                status: 200,
                success: true,
                data: studio,
            });
        } catch (error) {
            return sendResponse(res, {
                status: 400,
                success: false,
                message: error.message,
            });
        }
    }

    async updateStudio(req, res) {
        try {
            const studio = await studioService.updateStudio(
                req.params.id,
                req.body,
                req.user._id
            );
            return sendResponse(res, {
                status: 200,
                success: true,
                message: RESPONSE_MESSAGES.STUDIO_UPDATED,
                data: studio,
            });
        } catch (error) {
            return sendResponse(res, {
                status: 400,
                success: false,
                message: error.message,
            });
        }
    }

    async deleteStudio(req, res) {
        try {
            const result = await studioService.deleteStudio(req.params.id, req.user._id);
            return sendResponse(res, {
                status: 200,
                success: true,
                message: RESPONSE_MESSAGES.STUDIO_DELETED,
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

export default new StudioController(); 