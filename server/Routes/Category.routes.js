import express from "express";
import { CategoryAdd, CategoryGet } from "../Controller/CategoryController.js";

export const categoryRoutes = express.Router();

categoryRoutes.post('/add',CategoryAdd)
categoryRoutes.get('/',CategoryGet)