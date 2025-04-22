import { z } from "zod"

class TodoValidations {

    create = z.object({
        body: z.object({
          title: z.string().trim().min(3 , "Title is required"),
          description: z.string().trim().optional(),
        }).strict(),
      })

}

export default new TodoValidations()