import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    // Ambil token dari header "Authorization: Bearer <token>"
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    // Cek apakah token ada
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Akses ditolak! Token hilang."
        });
    }

    try {
        // Verifikasi token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Simpan data user ke request object
        req.user = decoded;

        // Lanjut ke controller berikutnya
        next();

    } catch (error) {
        return res.status(403).json({
            success: false,
            message: "Token tidak valid atau telah kadaluarsa!"
        });
    }
};