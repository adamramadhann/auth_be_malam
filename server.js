import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { router } from "./src/routes/authRoute.js";

dotenv.config();
const app = express();

app.use(express.json({
    limit: "100mb"
}));
app.use(cors());

app.use(router)

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => (console.info(`
        ===============
        RUN PORT ${PORT}
        ===============
    `))
);