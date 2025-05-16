import { upload } from "../middleware/upload.middleware.js";

export const flexibleUpload = (req, res, next) => {
    const uploadHandler = upload.any("media"); // or upload.fields([...]) if needed
    uploadHandler(req, res, next);
};
