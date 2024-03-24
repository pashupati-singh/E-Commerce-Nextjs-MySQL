import express from "express";
import { Login, signUp } from "../Controller/AuthController.js";

export const AuthRoutes = express.Router();

AuthRoutes.post('/register',signUp)
AuthRoutes.post('/login',Login)