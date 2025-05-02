import { model, Schema } from "mongoose";

const requestSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "user",
            required: [true, "user is required!"],
        },
        media: [
            {
                type: Schema.Types.ObjectId,
                ref: "media",
                required: true,
            },
        ],
        title: {
            type: String,
            required: [true, "title is required!"],
            trim: true,
        },
        description: {
            type: String,
            trim: true,
        },
    },
    { timestamps: true }
);

export const Requests = model("request", requestSchema); 