import { request, response } from "express";
import prisma from "../config/database.js";

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

