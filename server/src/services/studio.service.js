import { RESPONSE_MESSAGES } from "../constants/responseMessage.constants.js";
import { Studios } from "../model/studio.model.js";

class StudioService {
    async createStudio(body, userId) {
        const studio = await Studios.create({
            ...body,
            photographer: userId,
        });

        return studio;
    }

    async getStudios() {
        const studios = await Studios.find().populate("photographer", "name email");
        return studios;
    }

    async getStudio(id) {
        const studio = await Studios.findById(id).populate("photographer", "name email");
        
        if (!studio) {
            throw new Error("Studio not found");
        }

        return studio;
    }

    async updateStudio(id, body, userId) {
        const studio = await Studios.findById(id);

        if (!studio) {
            throw new Error("Studio not found");
        }

        if (studio.photographer.toString() !== userId) {
            throw new Error("Not authorized to update this studio");
        }

        const updatedStudio = await Studios.findByIdAndUpdate(id, body, {
            new: true,
            runValidators: true,
        });

        return updatedStudio;
    }

    async deleteStudio(id, userId) {
        const studio = await Studios.findById(id);

        if (!studio) {
            throw new Error("Studio not found");
        }

        if (studio.photographer.toString() !== userId) {
            throw new Error("Not authorized to delete this studio");
        }

        await studio.deleteOne();
        return { message: "Studio deleted successfully" };
    }
}

export default new StudioService(); 