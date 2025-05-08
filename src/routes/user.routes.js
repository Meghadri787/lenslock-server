import express from 'express';
import { isAuthenticate, authorizeRoles } from '../middleware/auth.middleware.js';
import { validate } from '../middleware/validate.middleware.js';

import { createUser, deleteUser, logInUser, sendOtpForVerifyAccount, verifyOtpWithExpiry, updateUserProfilePic, getUser, updateUser } from '../controllers/user.controller.js';
import { createUserSchema, loginSchema, sendOtpSchema, verifyOtpSchema, updateProfileSchema, updateProfilePicSchema } from '../validations/user.validation.js';
import { upload } from '../middleware/upload.middleware.js';

const router = express.Router();

// Public routes
router.post('/register', validate(createUserSchema), createUser);
router.post('/login', validate(loginSchema), logInUser);
router.post('/send-otp', validate(sendOtpSchema), sendOtpForVerifyAccount);
router.post('/verify-otp', validate(verifyOtpSchema), verifyOtpWithExpiry);

// Protected routes
router.use(isAuthenticate);
router.get('/profile', getUser);
router.put('/profile', validate(updateProfileSchema), updateUser);
router.post('/profile-pic', upload.single("profilePic") , validate(updateProfilePicSchema), updateUserProfilePic);
router.delete('/:id', deleteUser);

export default router ;
