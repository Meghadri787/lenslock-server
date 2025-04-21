import express from "express";
import bodyParser from "body-parser";

import corsConfig from "./src/config/cors.config.js";
import { userRouter } from "./src/routes/user.routes.js";

const server = express();

server.use(corsConfig);
server.use(bodyParser.json({ limit: "50mb" }));
server.use(express.json({ limit: "50mb" }));
server.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

// all routes

server.use("/api/v1/auth/", userRouter);

server.get("/", (req, res) => {
    res.send("application is run ").json({
        message: "all ok ",
    });
});

export default server;
