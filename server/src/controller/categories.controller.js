import { RESPONSE_MESSAGES } from "../constants/responseMessage.constants.js";
import { HTTP_STATUS } from "../constants/statusCode.constants.js";
import categoriesService from "../services/categories.service.js";
import { sendResponse } from "../utils/response.handler.js";

class CategoriesController {
    

    async createCatrgories(req , res){
        try {
            const data = await categoriesService.createCategories(req.body) 
            console.info("categories created")
            return sendResponse(res , { status:HTTP_STATUS.CREATED , message : RESPONSE_MESSAGES.CETAGORIES_CREATE_SUCCESS , success:true , data:data })
        } catch (error) {
            return sendResponse(res , { status:HTTP_STATUS.INTERNAL_SERVER_ERROR , success:false , message:RESPONSE_MESSAGES.INTERNAL_ERROR , error : error  })
        }

    }


}

export default new CategoriesController();
