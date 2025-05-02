import { z } from "zod";

export const createMediaSchema = z.object({
    body: z.object({
        bucket: z.string().min(1, "Bucket ID is required"),
        mediaType: z.enum(["image", "video", "audio"], {
            errorMap: () => ({ message: "Media type must be image, video, or audio" }),
        }),
        title: z.string().min(1, "Title is required").optional(),
        description: z.string().optional(),
        tags: z.array(z.string()).optional(),
    }),
});

export const updateMediaSchema = z.object({
    body: z.object({
        title: z.string().min(1, "Title is required").optional(),
        description: z.string().optional(),
        tags: z.array(z.string()).optional(),
        isPublic: z.boolean().optional(),
    }),
});

export default {
    createMedia: createMediaSchema,
    updateMedia: updateMediaSchema,
}; 