import express from "express";
import requestController from "../controllers/request.controller.js";
import requestValidation from "../validations/request.validation.js";
import { validate } from "../middleware/validate.middleware.js";
import { isAuthenticate, authorizeRoles } from "../middleware/auth.middleware.js";

const router = express.Router();

// Protect all routes
router.use(isAuthenticate);

router
  .post("/", validate(requestValidation.createRequest), requestController.createRequest)
  .get("/", requestController.getRequests)
  .get("/:id", requestController.getRequest)
  .put("/:id", validate(requestValidation.updateRequest), requestController.updateRequest)
  .delete("/:id", requestController.deleteRequest);

export default router; 