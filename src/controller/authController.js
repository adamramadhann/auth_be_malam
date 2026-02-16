import { request, response } from "express";
import prisma from "../config/database.js";
import jwt from "jsonwebtoken";

export const register = async ( req = request, res = response ) => {
    try {
        const { name, password} = req.body;

        if(!name && !password) {
            return res.status(400).json({
                message: "name or password is requiered", 
            }) 
        };

        const existingAccount = await prisma.user.findUnique({
            where: { name }
        });

        if(existingAccount) {
            return res.status(400).json({
                message: "account already !", 
            }) 
        };

        const result = await prisma.user.create({
            data: { name, password }
        });

        return res.status(200).json({
            message: "creted account success", result
        })


    } catch (error) {
        return res.status(500).json({
            message: "internal server error", 
            error: error.message
        })
    }
};

export const login = async ( req = request, res = response ) => {
    try {
        const { name, password } = req.body;

        if(!name && !password) {
            return res.status(400).json({
                message: "name or password is requiered", 
            }) 
        };

        const user = await prisma.user.findUnique({
            where: { name }
        });

        if(!user) {
            return res.status(400).json({
                message: "user not found", 
            }) 
        };

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if(!isPasswordValid) {
            return res.status(400).json({
                message: "password not found", 
            }) 
        };

        const token = await jwt.sign(
            {
                id: user.id,
                name: user.name
            },
            process.env.JWT_SECRET,
            { expiresIn : "24h" }
        );

        return res.status(200).json({
            message: "login succes !!", 
            token
        })
        
    } catch (error) {
        return res.status(500).json({
            message: "internal server error", 
            error: error.message
        })
    }
};

export const getDashboard = async (req = request, res = response ) => {
    try {
        // req.user di-set oleh middleware
        // const userId = req.user.id;

        const user = await prisma.user.findMany();

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
            message: "Terjadi kesalahan pada server",
            error: error.message
        });
    }
};

export const allAcount = async ( req = request, res = response ) => {
    try {
        const result = await prisma.user.findMany();

        if(!result) {
            res.status(400).json({
                message: "data notfound"
            });
        };

        return res.status(200).json({
            message: "get data success", result
        });

    } catch (error) {
        return res.status(500).json({
            message: "Terjadi kesalahan pada server",
            error: error.message
        });
    }
};