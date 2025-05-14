import express from 'express';
import { isAuthenticate, authorizeRoles } from '../middleware/auth.middleware.js';
import { validate } from '../middleware/validate.middleware.js';

import { createUser,  deleteUser, logInUser, sendOtpForVerifyAccount, verifyOtpWithExpiry, updateUserProfilePic, getUser, updateUser } from '../controllers/user.controller.js';
import { createUserSchema,  loginSchema, sendOtpSchema, verifyOtpSchema, updateProfileSchema, updateProfilePicSchema } from '../validations/user.validation.js';
import { upload } from '../middleware/upload.middleware.js';
import { UserService } from '../services/user.service.js';

const router = express.Router();

// Public routes
router.post('/register', validate(createUserSchema), createUser);
router.post('/login', validate(loginSchema), logInUser);
router.post('/send-otp', validate(sendOtpSchema), sendOtpForVerifyAccount);
router.post('/verify-otp', validate(verifyOtpSchema), verifyOtpWithExpiry);

// Protected routes

router.get('/logout' , isAuthenticate , UserService.logOutUser)
router.get('/profile',isAuthenticate , getUser);
router.put('/profile',  validate(updateProfileSchema), isAuthenticate ,  updateUser);
router.post('/profile-pic', upload.single("profilePic") , validate(updateProfilePicSchema), isAuthenticate ,  updateUserProfilePic);
router.delete('/:id', isAuthenticate ,  deleteUser);

export default router ;
