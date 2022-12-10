import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import router from "./routes/index";
import db from "./models/index";

dotenv.config();

if (!process.env.DB_PORT) {
    process.exit(1);
}

const PORT: number = parseInt(process.env.DB_PORT as string, 10);

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", router);

const start = async (): Promise<void> => {
    try {
        await db.authenticate();
        await db.sync();
        app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
    } catch (e) {
        console.log(e);
    }
}

void start()