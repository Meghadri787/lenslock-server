import { RESPONSE_MESSAGES } from "../constants/responseMessage.constants.js";
import { Media } from "../model/media.model.js";
import { Buckets } from "../model/bucket.model.js";

class MediaService {
    async createMedia(body, userId) {
        const bucket = await Buckets.findById(body.bucket);
        
        if (!bucket) {
            throw new Error("Bucket not found");
        }

        // Check if user has access to the bucket
        if (
            bucket.photographer.toString() !== userId &&
            !bucket.accessList.some(
                (access) => access.user.toString() === userId && access.role === "editor"
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
        const media = await Media.findById(id)
            .populate("bucket", "name")
            .populate("uploadedBy", "name email");
        
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

        const media = await Media.find({ bucket: bucketId })
            .populate("uploadedBy", "name email");

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
                (access) => access.user.toString() === userId && access.role === "editor"
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
                (access) => access.user.toString() === userId && access.role === "editor"
            )
        ) {
            throw new Error("Not authorized to delete this media");
        }

        await media.deleteOne();
        return { message: "Media deleted successfully" };
    }
}

export default new MediaService(); 