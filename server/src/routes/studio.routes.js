import express from "express";
import studioController from "../controllers/studio.controller.js";
import studioValidation from "../validations/studio.validation.js";
import { validate } from "../middleware/validate.middleware.js";
import { isAuthenticate, authorizeRoles } from "../middleware/auth.middleware.js";

const router = express.Router();

// Protect all routes
router.use(isAuthenticate);

// Only photographers can create and manage studios
router.use(authorizeRoles("photographer"));

router
  .post("/", validate(studioValidation.createStudio), studioController.createStudio)
  .get("/", studioController.getStudios)
  .get("/:id", studioController.getStudio)
  .put("/:id", validate(studioValidation.updateStudio), studioController.updateStudio)
  .delete("/:id", studioController.deleteStudio);

export default router; 