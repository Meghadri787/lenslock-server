import { RESPONSE_MESSAGES } from "../constants/responseMessage.constants.js";
import bucketService from "../services/bucket.service.js";
import { sendResponse } from "../utils/response.handler.js";

class BucketController {
    async createBucket(req, res) {
        try {
            const bucket = await bucketService.createBucket(req.body, req.user._id);
            return sendResponse(res, {
                status: 201,
                success: true,
                message: RESPONSE_MESSAGES.BUCKET_CREATED,
                data: bucket,
            });
        } catch (error) {
            return sendResponse(res, {
                status: 400,
                success: false,
                message: error.message,
            });
        }
    }

    async getBuckets(req, res) {
        try {
           
            const buckets = await bucketService.getBuckets(req.user._id);
            return sendResponse(res, {
                status: 200,
                success: true,
                data: buckets,
            });
        } catch (error) {
            return sendResponse(res, {
                status: 400,
                success: false,
                message: error.message,
            });
        }
    }

    async getBucket(req, res) {
        try {
            const bucket = await bucketService.getBucket(req.params.id);
            return sendResponse(res, {
                status: 200,
                success: true,
                data: bucket,
            });
        } catch (error) {
            return sendResponse(res, {
                status: 400,
                success: false,
                message: error.message,
            });
        }
    }

    async updateBucket(req, res) {
        try {
            const bucket = await bucketService.updateBucket(
                req.params.id,
                req.body,
                req.user._id
            );
            return sendResponse(res, {
                status: 200,
                success: true,
                message: RESPONSE_MESSAGES.BUCKET_UPDATED,
                data: bucket,
            });
        } catch (error) {
            return sendResponse(res, {
                status: 400,
                success: false,
                message: error.message,
            });
        }
    }

    async deleteBucket(req, res) {
        try {
            const result = await bucketService.deleteBucket(req.params.id, req.user._id);
            return sendResponse(res, {
                status: 200,
                success: true,
                message: RESPONSE_MESSAGES.BUCKET_DELETED,
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

    async generateQRCode(req, res) {
        try {
            const result = await bucketService.generateQRCode(req.params.id, req.user._id);
            return sendResponse(res, {
                status: 200,
                success: true,
                message: RESPONSE_MESSAGES.QR_CODE_GENERATED,
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

    async sendQRCode(req, res) {
        try {
            const result = await bucketService.sendQRCode(
                req.params.id,
                req.body.email,
                req.user._id
            );
            return sendResponse(res, {
                status: 200,
                success: true,
                message: RESPONSE_MESSAGES.QR_CODE_SENT,
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

    async requestBucketAccess(req, res) {
        try {
            const bucket = await bucketService.requestBucketAccess(req.params.id, req.user._id);
            return sendResponse(res, {
                status: 200,
                success: true,
                message: RESPONSE_MESSAGES.ACCESS_REQUEST_SENT,
                data: bucket,
            });
        } catch (error) {
            return sendResponse(res, {
                status: 400,
                success: false,
                message: error.message,
            });
        }
    }

    async respondToAccessRequest(req, res) {
        try {
            const result = await bucketService.respondToAccessRequest(
                req.params.id,
                req.params.requestId,
                req.body.response,
                req.user._id
            );
            return sendResponse(res, {
                status: 200,
                success: true,
                message: RESPONSE_MESSAGES.ACCESS_REQUEST_RESPONDED,
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

export default new BucketController(); 