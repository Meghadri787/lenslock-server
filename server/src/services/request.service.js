import { RESPONSE_MESSAGES } from "../constants/responseMessage.constants.js";
import { Requests } from "../model/request.model.js";
import { Studios } from "../model/studio.model.js";

class RequestService {
    async createRequest(body, userId) {
        const studio = await Studios.findById(body.studio);
        
        if (!studio) {
            throw new Error("Studio not found");
        }

        // Check if user is not the studio owner
        if (studio.photographer.toString() === userId) {
            throw new Error("Cannot create request for your own studio");
        }

        const request = await Requests.create({
            ...body,
            client: userId,
        });

        return request;
    }

    async getRequests(userId) {
        const requests = await Requests.find({
            $or: [
                { client: userId },
                { studio: { $in: await Studios.find({ photographer: userId }).select("_id") } },
            ],
        })
            .populate("client", "name email")
            .populate("studio", "name location");

        return requests;
    }

    async getRequest(id, userId) {
        const request = await Requests.findById(id)
            .populate("client", "name email")
            .populate("studio", "name location photographer");
        
        if (!request) {
            throw new Error("Request not found");
        }

        // Check if user is either the client or the studio owner
        if (
            request.client._id.toString() !== userId &&
            request.studio.photographer.toString() !== userId
        ) {
            throw new Error("Not authorized to view this request");
        }

        return request;
    }

    async updateRequest(id, body, userId) {
        const request = await Requests.findById(id).populate("studio", "photographer");

        if (!request) {
            throw new Error("Request not found");
        }

        // Check if user is the studio owner
        if (request.studio.photographer.toString() !== userId) {
            throw new Error("Not authorized to update this request");
        }

        const updatedRequest = await Requests.findByIdAndUpdate(id, body, {
            new: true,
            runValidators: true,
        });

        return updatedRequest;
    }

    async deleteRequest(id, userId) {
        const request = await Requests.findById(id).populate("studio", "photographer");

        if (!request) {
            throw new Error("Request not found");
        }

        // Check if user is either the client or the studio owner
        if (
            request.client.toString() !== userId &&
            request.studio.photographer.toString() !== userId
        ) {
            throw new Error("Not authorized to delete this request");
        }

        await request.deleteOne();
        return { message: "Request deleted successfully" };
    }
}

export default new RequestService(); 