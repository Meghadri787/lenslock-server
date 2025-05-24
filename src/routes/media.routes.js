import express from "express";
import mediaController from "../controllers/media.controller.js";
import {
    isAuthenticate,
    authorizeRoles,
} from "../middleware/auth.middleware.js";
import { upload } from "../middleware/upload.middleware.js";
import { flexibleUpload } from "../utils/flexibleUpload.js";
import mediaValidation from "../validations/media.validation.js";
import { validate } from "../middleware/validate.middleware.js";

const router = express.Router();

// Protect all routes
router.use(isAuthenticate);

router.patch("/like/:id", mediaController.likeMedia);

// Only photographers can create and manage media
router.use(authorizeRoles("photographer"));

// Routes
router.post(
    "/",
    // flexibleUpload,
    upload.array("files", 10),
    // validate(mediaValidation.createMedia),
    mediaController.uploadMedia
);
// get all media by bucket id
router.get("/:id", mediaController.getMedia);
router.delete("/:id", mediaController.deleteMedia);
// router.post("/:id/like", mediaController.likeMedia);
// router.delete("/:id/like", mediaController.unlikeMedia);
router.get("/bucket/:bucketId", mediaController.getMediaByBucket);
router.put(
    "/:id",
    validate(mediaValidation.updateMedia),
    mediaController.updateMedia
);

export default router;
