import { model, Schema } from "mongoose";

const mediaSchema = new Schema(
    {
        bucket: {
            type: Schema.Types.ObjectId,
            ref: "bucket",
            required: [true, "bucket is required!"],
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: "user",
            required: [true, "user is required!"],
        },
        mediaType: {
            type: String,
            enum: ["image", "video", "audio"],
            required: [true, "media type is required!"],
        },
        media: {
            url: {
                type: String,
                required: [true, "media URL is required!"],
            },
            publicId: {
                type: String,
            },
        },
        likes: [
            {
                user: {
                    type: Schema.Types.ObjectId,
                    ref: "user",
                },
            },
        ],
    },
    { timestamps: true }
);

export const Media = model("media", mediaSchema); 