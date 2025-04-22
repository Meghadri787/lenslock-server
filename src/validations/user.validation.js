import { z } from "zod";

class UserValidations {
    createUser = z.object({
        body: z
            .object({
                name: z
                    .string()
                    .trim()
                    .min(3, "Name must be at least 3 characters long")
                    .max(60, "Name must be at most 60 characters long"),

                email: z
                    .string()
                    .trim()
                    .email("Please provide a valid email address"),

                password: z
                    .string()
                    .min(8, "Password must be at least 8 characters long"),

                profile_pic: z
                    .object({
                        url: z
                            .string()
                            .url("Profile picture must be a valid URL")
                            .optional(),
                        public_id: z.string().nullable().optional(),
                    })
                    .optional(),

                role: z.enum(["user", "admin", "controller"]).optional(),

                otp: z.number().optional(),

                otpExpiary: z.date().optional(),

                isProfileComplete: z.boolean().optional(),
            })
            .strict(),
    });

    login = z.object({
        body: z
            .object({
                email: z.string().trim().email("Invalid email address"),
                password: z
                    .string()
                    .trim()
                    .min(8, "Password must be at least 8 characters long"),
            })
            .strict(),
    });

    updateProfile = z.object({
        body: z
            .object({
                name: z
                    .string()
                    .trim()
                    .min(3, "Name must be at least 3 characters long")
                    .max(60, "Name must be within 60 characters")
                    .optional(),
                profile_pic: z
                    .object({
                        url: z.string().url().optional(),
                        public_id: z.string().optional(),
                    })
                    .optional(),
                isProfileComplete: z.boolean().optional(),
            })
            .strict(),
    });
}

export default new UserValidations();
