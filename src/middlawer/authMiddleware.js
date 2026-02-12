import jwt from "jsonwebtoken";

export const verifyTokens = async (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(400).json({
            message: "Akses ditolak! Token hilang."
        });
    }

    try {

        const decoded = await jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;

        next();
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Terjadi kesalahan pada server"
        });
    }
};