import { body } from "express-validator"
import { z } from "zod"

export const createUserSchema = z.object({
  body: z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    role: z.enum(["user", "photographer"]).default("user"),
  }),
})

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(1, "Password is required"),
  }),
})

export const sendOtpSchema = z.object({
  body: z.object({
    email: z.string().email("Invalid email address"),
  }),
})

export const verifyOtpSchema = z.object({
  body: z.object({
    otp: z.string().length(6, "OTP must be 6 characters"),
  }),
})

export const updateProfileSchema = z.object({
  body: z.object({
    name: z.string().min(2, "Name must be at least 2 characters").optional(),
    email: z.string().email("Invalid email address").optional(),
    phone: z.string().optional(),
    address: z.string().optional(),
  }),
})

export const updateProfilePicSchema = z.object({
  file: z.object({
      fieldname: z.string(),
      originalname: z.string(),
      encoding: z.string(),
      mimetype: z.string(),
      destination: z.string(),
      filename: z.string(),
      path : z.string(),
      size: z.number().min(1, "File size must be greater than 0"),
  }),
})

export const changePasswordSchema = z.object({
  body: z.object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z.string().min(6, "New password must be at least 6 characters"),
  }),
})

class UserValidation  {
  createUser = z.object({
    body: z.object({
      name: z.string().trim().min(3, "Name is required").max(60 , "name must be 60 charector or less "),
      email: z.string().trim().email("Invalid email format"),
      password: z.string().trim().min(8, "Password must be at least 8 characters"),
    }),
  })

  login = z.object({
    body: z.object({
      email: z.string().trim().email("Invalid email format") ,
      password: z.string().trim().min(8 , "Password is required"),
    }),
  })

  sendOtp = z.object({
    body: z.object({
      email: z.string().email("Invalid email format"),
    }),
  })

  verifyOtp= z.object({
    body: z.object({
      otp: z.string().length(6, "OTP must be 6 digits"),
    }),
  })

  changeProfilePic= z.object({
    body: z.object({
      file: z.any(), // You might want to use a more specific validation for files
    }),
  })

  updateUserRole= z.object({
    params: z.object({
      userId: z.string().min(1, "User ID is required"),
    }),
    body: z.object({
      newRole: z.enum(["user", "admin", "controller"], {
        errorMap: () => ({ message: "Invalid role" }),
      }),
    }),
  })

  addTwoStepVerification= z.object({
    body: z.object({
      isTwoStepAuth: z.boolean(),
    }),
  })

  updateUser= z.object({
    params: z.object({
      id: z.string().min(1, "User ID is required"),
    }),
    body: z.object({
      // Add fields that can be updated
      name: z.string().optional(),
      email: z.string().email("Invalid email format").optional(),
      // Add other fields as needed
    }),
  })

  forgotPassword= z.object({
    body: z.object({
      email: z.string().email("Invalid email format"),
    }),
  })

  changePasswordWithOtp= z.object({
    body: z.object({
      otp: z.string().length(6, "OTP must be 6 digits"),
      password: z.string().min(8, "Password must be at least 8 characters"),
    }),
  })

  changePasswordWithOldPassword= z.object({
    body: z.object({
      oldPassword: z.string().min(1, "Old password is required"),
      newPassword: z.string().min(8, "New password must be at least 8 characters"),
    }), 
  })

  sendFriendRequest = z.object({
    body : z.object({
      requastId : z.string().min(1 , "request Id is must  be required ")
    })
  }) 
  manageFriendRequest= z.object({ 
    body: z.object({
      requestId: z.string().min(1, "Request ID is required"),
      action: z.enum(["accept", "reject"], {
        errorMap: () => ({ message: "Invalid action" }),
      }),
    }),
  })
}

export default new UserValidation()