import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure storage
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "lenslock",
        allowed_formats: ["jpg", "jpeg", "png", "gif", "mp4", "mov", "mp3", "wav"],
        resource_type: "auto",
    },
});

// Configure multer
export const upload = multer({
    storage: storage,
    limits: {
        fileSize: 50 * 1024 * 1024, // 50MB limit
    },
    fileFilter: (req, file, cb) => {
        // Accept images, videos, and audio
        if (
            file.mimetype.startsWith("image/") ||
            file.mimetype.startsWith("video/") ||
            file.mimetype.startsWith("audio/")
        ) {
            cb(null, true);
        } else {
            cb(new Error("Invalid file type. Only images, videos, and audio are allowed."), false);
        }
    },
}); 