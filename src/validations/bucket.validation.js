import { z } from "zod";

export const createBucketSchema = z.object({
    body: z.object({
        name: z.string().min(1, "Bucket name is required"),
        // studio: z.string().min(1, "Studio ID is required"),
        description: z.string().optional(),
        isPublic: z.boolean().default(false),
    }),
});

export const updateBucketSchema = z.object({
    body: z.object({
        name: z.string().min(1, "Bucket name is required").optional(),
        description: z.string().optional(),
        isPublic: z.boolean().optional(),
    }),
});

export const sendQRCodeSchema = z.object({
    body: z.object({
        email: z.string().email("Invalid email address"),
    }),
});

export const respondToAccessRequestSchema = z.object({
    body: z.object({
        response: z.enum(["accept", "reject"], {
            errorMap: () => ({ message: "Response must be either 'accept' or 'reject'" }),
        }),
    }),
});

export default {
    createBucket: createBucketSchema,
    updateBucket: updateBucketSchema,
    sendQRCode: sendQRCodeSchema,
    respondToAccessRequest: respondToAccessRequestSchema,
}; 