import { RESPONSE_MESSAGES } from "../constants/responseMessage.constants.js";
import mediaService from "../services/media.service.js";
import { sendResponse } from "../utils/response.handler.js";

class MediaController {
    async createMedia(req, res) {
        try {
            const media = await mediaService.createMedia(req.body, req.user._id);
            return sendResponse(res, {
                status: 201,
                success: true,
                message: RESPONSE_MESSAGES.MEDIA_CREATED,
                data: media,
            });
        } catch (error) {
            return sendResponse(res, {
                status: 400,
                success: false,
                message: error.message,
            });
        }
    }

    async getMedia(req, res) {
        try {
            const media = await mediaService.getMedia(req.params.id);
            return sendResponse(res, {
                status: 200,
                success: true,
                data: media,
            });
        } catch (error) {
            return sendResponse(res, {
                status: 400,
                success: false,
                message: error.message,
            });
        }
    }

    async getMediaByBucket(req, res) {
        try {
            const media = await mediaService.getMediaByBucket(req.params.bucketId, req.user._id);
            return sendResponse(res, {
                status: 200,
                success: true,
                data: media,
            });
        } catch (error) {
            return sendResponse(res, {
                status: 400,
                success: false,
                message: error.message,
            });
        }
    }

    async updateMedia(req, res) {
        try {
            const media = await mediaService.updateMedia(
                req.params.id,
                req.body,
                req.user._id
            );
            return sendResponse(res, {
                status: 200,
                success: true,
                message: RESPONSE_MESSAGES.MEDIA_UPDATED,
                data: media,
            });
        } catch (error) {
            return sendResponse(res, {
                status: 400,
                success: false,
                message: error.message,
            });
        }
    }

    async deleteMedia(req, res) {
        try {
            const result = await mediaService.deleteMedia(req.params.id, req.user._id);
            return sendResponse(res, {
                status: 200,
                success: true,
                message: RESPONSE_MESSAGES.MEDIA_DELETED,
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

export default new MediaController(); 