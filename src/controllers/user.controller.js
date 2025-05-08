import { UserService } from "../services/user.service.js";
import { HTTP_STATUS } from "../constants/statusCode.constants.js";
import { RESPONSE_MESSAGES } from "../constants/responseMessage.constants.js";
import { sendResponse } from "../utils/response.handler.js";

export const createUser = async (req, res) => {
  try {
    const user = await UserService.createUser(req.body);
    return sendResponse(res, { 
      status: HTTP_STATUS.CREATED, 
      data: user,  
      success: true, 
      message: RESPONSE_MESSAGES.USER_REGISTERED 
    });
  } catch (error) {
    return sendResponse(res, { 
      status: HTTP_STATUS.INTERNAL_SERVER_ERROR, 
      success: false, 
      message: error.message || RESPONSE_MESSAGES.INTERNAL_ERROR
    });
  }
};

export const logInUser = async (req, res) => {
  try {
     await UserService.loginUser(req.body , res);
  } catch (error) {
    console.error(error);
    
    return sendResponse(res, { 
      status: HTTP_STATUS.BAD_REQUEST, 
      success: false, 
      message: error.message 
    });
  }
};

export const sendOtpForVerifyAccount = async (req, res) => {
  try {
    await UserService.sendOtpForVerification(req.body.email);
    return sendResponse(res, { 
      status: HTTP_STATUS.OK, 
      success: true, 
      message: RESPONSE_MESSAGES.OTP_SENT 
    });
  } catch (error) {
    return sendResponse(res, { 
      status: HTTP_STATUS.BAD_REQUEST, 
      success: false, 
      message: error.message 
    });
  }
};

export const verifyOtpWithExpiry = async (req, res) => {
  try {
    const user = await UserService.verifyOtp(req.body.otp);
    return sendResponse(res, { 
      status: HTTP_STATUS.OK, 
      success: true, 
      message: RESPONSE_MESSAGES.OTP_VERIFIED,
      data: user
    });
  } catch (error) {
    return sendResponse(res, { 
      status: HTTP_STATUS.BAD_REQUEST, 
      success: false, 
      message: error.message 
    });
  }
};

export const updateUserProfilePic = async (req, res) => {
  try {
    // const { id } = req.user;
    const id = "681ac3195837269f3a30d40c"; // Replace with actual user ID from req.user
    const user = await UserService.changeProfilePic(id, req.body , req.file);
    return sendResponse(res, { 
      status: HTTP_STATUS.OK, 
      success: true, 
      message: RESPONSE_MESSAGES.PROFILE_UPDATED, 
      data: user 
    });
  } catch (error) {
    return sendResponse(res, { 
      status: HTTP_STATUS.INTERNAL_SERVER_ERROR, 
      success: false, 
      message: error.message 
    });
  }
};

export const getUser = async (req, res) => {
  try {
    const { id } = req.user;
    const user = await UserService.getUserById(id);
    return sendResponse(res, { 
      status: HTTP_STATUS.OK, 
      success: true, 
      message: RESPONSE_MESSAGES.USER_FETCHED, 
      data: user 
    });
  } catch (error) {
    return sendResponse(res, { 
      status: HTTP_STATUS.INTERNAL_SERVER_ERROR, 
      success: false, 
      message: error.message 
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await UserService.deleteUser(id);
    return sendResponse(res, { 
      status: HTTP_STATUS.OK, 
      success: true, 
      message: RESPONSE_MESSAGES.USER_DELETED 
    });
  } catch (error) {
    return sendResponse(res, { 
      status: HTTP_STATUS.INTERNAL_SERVER_ERROR, 
      success: false, 
      message: error.message 
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.user;
    const user = await UserService.updateUser(id, req.body);
    return sendResponse(res, { 
      status: HTTP_STATUS.OK, 
      success: true, 
      message: RESPONSE_MESSAGES.USER_UPDATED, 
      data: user 
    });
  } catch (error) {
    return sendResponse(res, { 
      status: HTTP_STATUS.INTERNAL_SERVER_ERROR, 
      success: false, 
      message: error.message 
    });
  }
};



