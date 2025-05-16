import { RESPONSE_MESSAGES } from "../constants/responseMessage.constants.js";
import mediaService from "../services/media.service.js";
import { sendResponse } from "../utils/response.handler.js";

class MediaController {
    async uploadMedia(req, res) {
        console.log("ok done file uploader controller run ");
        
        try {
            // Check if files were uploaded
            if (!req.files && !req.file) {
                throw new Error("No files were uploaded");
            }

            // Handle both single file (req.file) and multiple files (req.files) cases
            const files = req.files || [req.file];

            // Ensure files array is not empty
            if (!files.length) {
                throw new Error("No valid files were uploaded");
            }

            // Upload all files to the specified bucket
            const uploadedMedia = await mediaService.createMultipleMedia(
                files ,
                req.body.bucket, // bucket ID from request body
                req.user._id
            );

            return sendResponse(res, {
                status: 201,
                success: true,
                message:
                    uploadedMedia.length > 1
                        ? RESPONSE_MESSAGES.MULTIPLE_MEDIA_CREATED ||
                          "Multiple media uploaded successfull"
                        : RESPONSE_MESSAGES.MEDIA_CREATED || "Media uploaded",
                data: uploadedMedia,
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
            const media = await mediaService.getMediaByBucket(
                req.params.bucketId,
                req.user._id
            );
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
            const result = await mediaService.deleteMedia(
                req.params.id,
                req.user._id
            );
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
