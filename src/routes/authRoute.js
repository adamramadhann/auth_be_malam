import { Router } from "express";
import { allAccount, getDashboard, login, register } from "../controller/authController.js";
import { verifyToken } from "../middlaware/authMiddlaware.js";

export const router = new Router();

router.post('/register', register);
router.post('/login', login);
router.get('/dashboard', verifyToken, getDashboard);
router.get('/allAccount', allAccount);