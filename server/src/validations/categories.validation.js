import { z } from "zod"

class CategoriesValidation {

    create = z.object({
        body: z.object({
          name: z.string().trim().min(3 , "Title is required"),
          description: z.string().trim().optional(),
          user : z.string().trim() , 
        }).strict(),
      })

}

export default new CategoriesValidation()