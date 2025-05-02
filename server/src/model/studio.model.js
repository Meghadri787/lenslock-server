import { model, Schema } from "mongoose";

const studioSchema = new Schema(
    {
        photographer: {
            type: Schema.Types.ObjectId,
            ref: "user",
            required: [true, "photographer is required!"],
        },
        name: {
            type: String,
            required: [true, "name is required!"],
            trim: true,
        },
        description: {
            type: String,
            trim: true,
        },
        location: {
            type: String,
            trim: true,
        },
        phoneNumber: {
            type: String,
            required: [true, "phone number is required!"],
            trim: true,
        },
        email: {
            type: String,
            match: [
                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                "Please provide a valid email address",
            ],
            trim: true,
        },
        image: {
            url: {
                type: String,
            },
            publicId: {
                type: String,
            },
        },
    },
    { timestamps: true }
);

export const Studios = model("studio", studioSchema);
