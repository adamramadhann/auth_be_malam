import { request, response } from "express";
import prisma from "../config/database.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req = request, res = response) => {
    try {
        const { name, password } = req.body;

        if(!name || !password){
            return res.status(400).json({
                message: "input tidak boleh kosong"
            })
        }

        const existingUser = await prisma.user.findUnique({
            where: { name }
        })

        if(existingUser){
            return res.status(400).json({
                message: "username sudah tersedia"
            })
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const result = await prisma.user.create({
            data : {
                name,
                password: hashPassword
            }
        })

        return res.status(200).json({
            message: "register success", result
        });
    } catch (error) {
        return res.status(500).json({
            message: "register failed", 
            error: error.message
        });
    }

};   

export const login = async (req = request, res = response) => {
    try {
        const { name, password } = req.body;

        if(!name || !password){
            return res.status(400).json({
                message: "input tidak boleh kosong"
            })
        }

        const existingUser = await prisma.user.findFirst({
            where: { name }
        });

        if(!existingUser) {
            return res.status(400).json({
                message: "account not found"
            })
        };

        const token = jwt.sign(
        {
            id: existingUser.id,
            name: existingUser.name
        }, 
        process.env.JWT_SECRET,
        { expiresIn : "24h"}
    );

    return res.status(200).json({
        message: "login success",
        token
    });

    } catch (error) {
        return res.status(500).json({
            message: "internal server error", 
            error: error.message
        });
    }
};

export const getDashboard = async (req, res) => {
    try {
        // req.user di-set oleh middleware
        const userId = req.user.id;

        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { id: true, name: true }
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User tidak ditemukan!"
            });
        }

        res.status(200).json({
            success: true,
            message: "Selamat datang di dashboard! 🎉",
            data: {
                user,
                info: "Ini adalah data terproteksi. Hanya user dengan token valid yang bisa mengaksesnya."
            }
        });

    } catch (error) {
        console.error("Dashboard error:", error);
        res.status(500).json({
            success: false,
            message: "Terjadi kesalahan pada server"
        });
    }
};