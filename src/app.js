import cors from "cors";
import express from "express";
import apiV1 from "./routes/api/v1/products.js";
import apiV2 from "./routes/api/v2/products.js";

const app = express();
app
    .use(cors())
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .use("/api/v1", apiV1)
    .use("/api/v2", apiV2)
    .get("/", (_, res) => {
        res.send("hello world");
    })
    .listen(3000, () => {
        console.log("🚀 connected to port: 3000");
    });

export default () => app;