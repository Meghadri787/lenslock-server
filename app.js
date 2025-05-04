import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { fileURLToPath } from "url";
import { dirname } from "path";

// Routes

import studioRoutes from "./src/routes/studio.routes.js";
import bucketRoutes from "./src/routes/bucket.routes.js";
import mediaRoutes from "./src/routes/media.routes.js";
import requestRoutes from "./src/routes/request.routes.js";
import userRoutes from "./src/routes/user.routes.js";

// Middleware
import { errorHandler } from "./src/middleware/error.middleware.js";

// Config
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/user", userRoutes);
app.use("/api/studios", studioRoutes);
app.use("/api/buckets", bucketRoutes);
app.use("/api/media", mediaRoutes);
app.use("/api/requests", requestRoutes);

app.get("/" , (req , res)=>{
     res.status(200).json({
        message :"server is running now "
     })
})

// Error handling
app.use(errorHandler);

export default app
