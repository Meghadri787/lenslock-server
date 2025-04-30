import express from "express";
import { validate } from "../middlewares/validate.middleware.js";
import userValidation from "../validations/user.validation.js";
import userController from "../controller/user.controller.js";

const router = express.Router();

router
    .post(
        "/register",
        validate(userValidation.createUser),
        userController.createUser
    )
    .post("/login", validate(userValidation.login), userController.loginUser)
    .post(
        "/forgot-password",
        validate(userValidation.forgotPassword),
        userController.forgotPassword
    )
    .post(
        "/verify-otp",
        validate(userValidation.verifyOtp),
        userController.verifyOtp
    )
    .post(
        "/reset-password",
        validate(userValidation.resetPassword),
        userController.resetPassword
    );

export const userRouter = router;
