import express from "express";
import { CategoryAdd, CategoryGet, favCategory, favCategoryGet } from "../Controller/CategoryController.js";
import { AuthMiddleware } from "../Middleware/Authmiddleware.js";

export const categoryRoutes = express.Router();

categoryRoutes.post('/add',CategoryAdd)
categoryRoutes.get('/',CategoryGet)
categoryRoutes.post('/addfavourite',AuthMiddleware,favCategory)
categoryRoutes.get('/fav',AuthMiddleware,favCategoryGet)

