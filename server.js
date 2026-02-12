import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { routes } from "./src/routes/authRoutes.js";

dotenv.config();
const app = express();

app.use(express.json({
    limit: "100mb"
}));
app.use(cors());

app.get("/", (req, res) => {
    res.json({
        message: "Auth API is running! 🚀",
        endpoints: {
            register: "POST /api/auth/register",
            login: "POST /api/auth/login",
            dashboard: "GET /api/auth/dashboard (protected)"
        }
    });
});

app.use(routes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => (console.info(`
        ===============
        RUN PORT ${PORT}
        ===============
    `))
);