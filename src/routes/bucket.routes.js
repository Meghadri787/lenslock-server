import express from "express";
import bucketController from "../controllers/bucket.controller.js";
import {
    isAuthenticate,
    authorizeRoles,
} from "../middleware/auth.middleware.js";
import bucketValidation from "../validations/bucket.validation.js";
import { validate } from "../middleware/validate.middleware.js";

const router = express.Router();

// Protect all routes
router.use(isAuthenticate);
router.get("/:id", bucketController.getBucket);
// Access management
router.post("/request-access/:id", bucketController.requestBucketAccess);


// Only photographers can create and manage buckets
router.use(authorizeRoles("photographer"));

// Routes
router.post(
    "/",
    // validate(bucketValidation.createBucket),
    bucketController.createBucket
);
router.get("/", bucketController.getBuckets);

router.put(
    "/:id",
    validate(bucketValidation.updateBucket),
    bucketController.updateBucket
);
router.delete("/:id", bucketController.deleteBucket);


// Generate QR code
router.get("/:id/qr-code", bucketController.generateQRCode);

// Send QR code
router.post(
    "/:id/send-qr-code",
    validate(bucketValidation.sendQRCode),
    bucketController.sendQRCode
);

// Respond to access request
router.post(
    "/:id/access-requests/:requestId/respond",
    validate(bucketValidation.respondToAccessRequest),
    bucketController.respondToAccessRequest
);

export default router;
