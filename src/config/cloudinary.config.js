import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";

export const cloudinaryConfig = () => {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_DB,
        api_key: process.env.CLOUDINARY_KEY,
        api_secret: process.env.CLOUDINARY_SECRET,
    });
};

/**
 * Uploads any file type (image, video, audio, pdf, docx, etc.) to Cloudinary using buffer.
 * @param {Buffer} buffer - The file buffer (from multer.memoryStorage).
 * @param {string} mimetype - The MIME type of the file.
 * @param {string} folder - Optional Cloudinary folder (default: 'uploads').
 */
export const cloudinaryFileUploader = (
    buffer,
    mimetype,
    folder = "uploads"
) => {
    const resource_type = mimetype.startsWith("image")
        ? "image"
        : mimetype.startsWith("video") || mimetype.startsWith("audio")
        ? "video"
        : "raw";

    console.log("🚀 ~ resource_type:", resource_type);

    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            { folder, resource_type },
            (error, result) => {
                if (error) {
                    return reject({ url: null, public_id: null, error });
                }
                resolve({
                    url: result.secure_url,
                    public_id: result.public_id,
                    error: null,
                });
            }
        );

        streamifier.createReadStream(buffer).pipe(uploadStream);
    });
};
