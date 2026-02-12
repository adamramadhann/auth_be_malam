import { Router } from "express";
import { getDashboard, login, register } from "../controller/authCounttoller.js";
// import verifyTokens from '../middlawer/authMiddleware.js'

export const routes = new Router();

routes.post('/register', register);
routes.post('/login', login);
// routes.get('/', verifyTokens, getDashboard);