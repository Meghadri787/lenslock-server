import { RESPONSE_MESSAGES } from "../constants/responseMessage.constants.js";
import { Media } from "../model/media.model.js";
import { Buckets } from "../model/bucket.model.js";
import { cloudinaryFileUploader } from "../config/cloudinary.config.js";

class MediaService {
    async createMultipleMedia(files, bucketId, userId) {

        console.log("====================" , files , bucketId , userId);
        

        const bucket = await Buckets.findById(bucketId);

        if (!bucket) {
            throw new Error("Bucket not found");
        }

        // Check if user has access to the bucket
        if (
            bucket.user.toString() !== userId.toString() &&
            !bucket.accessList.some(
                (access) => access.user.toString() === userId.toString()
            )
        ) {
            throw new Error("Not authorized to add media to this bucket");
        }

        // Process all files
        const mediaPromises = files.map(async (file) => {
            // Upload to Cloudinary
            const uploadResult = await cloudinaryFileUploader(
                file.buffer,
                file.mimetype,
                `bucket_${bucketId}`
            );

            if (uploadResult.error) {
                throw new Error("Failed to upload media");
            }

            // Create media record
            const media =await  Media.create({
                bucket: bucketId,
                user: userId,
                mediaType: file.mimetype.startsWith("image")
                    ? "image"
                    : file.mimetype.startsWith("video")
                    ? "video"
                    : "audio",
                media: {
                    url: uploadResult.url,
                    publicId: uploadResult.public_id,
                },
            });

            // console.log("===============>>>>>>>>>" , media);
            
            bucket.mediaList = [...bucket.mediaList , media._id ]
            await bucket.save()
            return media
        });

        // Wait for all uploads to complete
        const uploadedMedia = await Promise.all(mediaPromises);
        return uploadedMedia;
    }

    async createMedia(body, userId) {
        const bucket = await Buckets.findById(body.bucket);

        if (!bucket) {
            throw new Error("Bucket not found");
        }

        // Check if user has access to the bucket
        if (
            bucket.photographer.toString() !== userId &&
            !bucket.accessList.some(
                (access) =>
                    access.user.toString() === userId &&
                    access.role === "editor"
            )
        ) {
            throw new Error("Not authorized to add media to this bucket");
        }

        const media = await Media.create({
            ...body,
            uploadedBy: userId,
        });

        return media;
    }

    async getMedia(id) {
        const media = await Media.find({bucket:id})
            .populate("bucket", "name _id ")
            .populate("user", "profile_pic _id name email");

        if (!media) {
            throw new Error("Media not found");
        }

        return media;
    }

    async getMediaByBucket(bucketId, userId) {
        const bucket = await Buckets.findById(bucketId);

        if (!bucket) {
            throw new Error("Bucket not found");
        }

        // Check if user has access to the bucket
        if (
            bucket.photographer.toString() !== userId &&
            !bucket.accessList.some(
                (access) => access.user.toString() === userId
            )
        ) {
            throw new Error("Not authorized to view media in this bucket");
        }

        const media = await Media.find({ bucket: bucketId }).populate(
            "uploadedBy",
            "name email"
        );

        return media;
    }

    async updateMedia(id, body, userId) {
        const media = await Media.findById(id);

        if (!media) {
            throw new Error("Media not found");
        }

        const bucket = await Buckets.findById(media.bucket);

        // Check if user has access to update the media
        if (
            bucket.photographer.toString() !== userId &&
            !bucket.accessList.some(
                (access) =>
                    access.user.toString() === userId &&
                    access.role === "editor"
            )
        ) {
            throw new Error("Not authorized to update this media");
        }

        const updatedMedia = await Media.findByIdAndUpdate(id, body, {
            new: true,
            runValidators: true,
        });

        return updatedMedia;
    }

    async deleteMedia(id, userId) {
        const media = await Media.findById(id);

        if (!media) {
            throw new Error("Media not found");
        }

        const bucket = await Buckets.findById(media.bucket);

        // Check if user has access to delete the media
        if (
            bucket.photographer.toString() !== userId &&
            !bucket.accessList.some(
                (access) =>
                    access.user.toString() === userId &&
                    access.role === "editor"
            )
        ) {
            throw new Error("Not authorized to delete this media");
        }

        await media.deleteOne();
        return { message: "Media deleted successfully" };
    }
}

export default new MediaService();
