import { Categories } from "../model/categories.model";


class CategoriesServices {
    async createCategories(body) {
        const data = await Categories.create({
            name : body.name , 
            description : body.description , 
            user : body.user ,
        }) 
        return data ;
    } 
}

export default new CategoriesServices();