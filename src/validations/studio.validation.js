import { z } from "zod";

export const createStudioSchema = z.object({
    body: z.object({
        name: z.string().min(1, "Studio name is required"),
        location: z.string().min(1, "Location is required"),
        phoneNumber: z.string().min(1, "Phone number is required"),
        email: z.string().email("Invalid email address").optional(),
        website: z.string().url("Invalid website URL").optional(),
        description: z.string().optional(),
        isPublic: z.boolean().default(false),
    }),
});

export const updateStudioSchema = z.object({
    body: z.object({
        name: z.string().min(1, "Studio name is required").optional(),
        location: z.string().min(1, "Location is required").optional(),
        phoneNumber: z.string().min(1, "Phone number is required").optional(),
        email: z.string().email("Invalid email address").optional(),
        website: z.string().url("Invalid website URL").optional(),
        description: z.string().optional(),
        isPublic: z.boolean().optional(),
    }),
});

export default {
    createStudio: createStudioSchema,
    updateStudio: updateStudioSchema,
}; 