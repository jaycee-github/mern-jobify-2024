// console.log("I LOVE YOU SO MUCH, BABY JENJEN KO!!!! <3");
import "express-async-errors";
import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
import morgan from "morgan";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cloudinary from "cloudinary";

// ROUTERS
import jobRouter from "./routes/jobRouter.js";
import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";

// PUBLIC
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";

// MIDDLEWARES
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";
import { authenticateUser } from "./middleware/authMiddleware.js";

// Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});

const __dirname = dirname(fileURLToPath(import.meta.url)); // ES6 module syntax

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

// app.use(express.static(path.resolve(__dirname, "./public")));
app.use(express.static(path.resolve(__dirname, "./client/dist")));

app.use(express.json());
app.use(cookieParser());

// Second argument = Route Controller
// app.get("/", (req, res) => {
//     res.send("I LOVE YOU SO MUCH, BABY JENJEN KO!!!! <3");
// });

app.get("/api/v1/test", (req, res) => {
    res.json({ msg: "test route" });
});

app.use("/api/v1/jobs", authenticateUser, jobRouter);
app.use("/api/v1/users", authenticateUser, userRouter);
app.use("/api/v1/auth", authRouter);

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./client/dist", "index.html"));
});

app.use("*", (req, res) => {
    res.status(404).json({
        message: "Not found",
    });
});

app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5100;

try {
    await mongoose.connect(process.env.MONGO_URL);

    app.listen(port, () => {
        console.log(`Server is running on port : ${port}`);
    });
} catch (error) {
    console.log(error);
    process.exit(1);
}
