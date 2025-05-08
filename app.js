import express from "express";
import cors from "cors";
import dotenv from "dotenv";

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
import { cloudinaryConfig } from "./src/config/cloudinary.config.js";

// Config
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Middleware
cloudinaryConfig();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/studio", studioRoutes);
app.use("/api/v1/bucket", bucketRoutes);
app.use("/api/v1/media", mediaRoutes);
app.use("/api/v1/request", requestRoutes);

app.get("/" , (req , res)=>{
     res.status(200).json({
        message :"server is running now "
     })
})

// Error handling
app.use(errorHandler);

export default app
