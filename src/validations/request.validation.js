import { z } from "zod";

export const createRequestSchema = z.object({
    body: z.object({
        title: z.string().min(1, "Title is required"),
        description: z.string().optional(),
        media: z.array(z.string()).min(1, "At least one media ID is required"),
        bucket: z.string().min(1, "Bucket ID is required"),
        requestType: z.enum(["download", "share", "edit"], {
            errorMap: () => ({ message: "Request type must be download, share, or edit" }),
        }),
    }),
});

export const updateRequestSchema = z.object({
    body: z.object({
        title: z.string().min(1, "Title is required").optional(),
        description: z.string().optional(),
        status: z.enum(["pending", "approved", "rejected"], {
            errorMap: () => ({ message: "Status must be pending, approved, or rejected" }),
        }).optional(),
    }),
});

export default {
    createRequest: createRequestSchema,
    updateRequest: updateRequestSchema,
}; 