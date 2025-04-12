import express from "express"
import { validate } from "../middlewares/validate.middleware"
import categoriesValidation from "../validations/categories.validation"
import { isAuthenticate } from "../middlewares/authentication.middleware"
import categoriesController from "../controller/categories.controller"


const router = express.Router()

router
   .post("/" , validate(categoriesValidation.create) , isAuthenticate , categoriesController.createCatrgories  )
   


export  const  categoriRouter = router 