import express from "express";
const app = express();
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middleware/error.middleware.js";
app.use(express.json());
app.use(cors({
    origin: process.env.FRONT_END_URL,
    credentials: true
}))
console.log(process.env.FRONT_END_URL);

app.use(express.urlencoded({ extended: true })); //Read data from html forms and convert into javascript object
app.use(express.static("public"));
app.use(cookieParser());
app.set("trust proxy", 1);

// Import the router
import userRouter from "./routes/user.routes.js"
import todoRouter from "./routes/todo.routes.js"
app.use("/api/user", userRouter);
app.use("/api/todo", todoRouter);
app.use(errorMiddleware);
export { app }