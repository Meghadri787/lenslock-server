import multer from "multer";

const storage = multer.memoryStorage(); // Use memory storage in serverless

const fileFilter = (req, file, cb) => {
    const allowedTypes = ["image/", "video/"];
    if (allowedTypes.some((type) => file.mimetype.startsWith(type))) {
        cb(null, true);
    } else {
        cb(new Error("Unsupported file type"), false);
    }
};

export const upload = multer({
    storage,
    limits: { fileSize: 50 * 1024 * 1024 }, // 50MB
    fileFilter,
});
