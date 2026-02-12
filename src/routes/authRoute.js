import { Router } from "express";
import { getDashboard, login, register } from "../controller/authController.js";
import { verifyToken } from "../middlaware/authMiddlaware.js";

export const router = new Router();

router.post('/regiter', register);
router.post('/login', login);
router.get('/', verifyToken, getDashboard);