import path from "path";
import express from "express";
import { readFileSync } from "fs";


const getDataProducts = () => JSON.parse(readFileSync(path.join(process.cwd(), "data.json"), { encoding: "utf8" }));
const app = express.Router();
app
    .get("/", (_, res) => {
        res.send("connected to api version 1");
    })
    .get("/products", (req, res) => {
        const { id } = req.query;
        const dataProducts = getDataProducts();
        if (id === undefined) {
            res.status(200).json({
                version: "2",
                message: "success",
                data: dataProducts
            });
        } else {
            const findData = dataProducts.find(it => it.id == id);
            if (findData === undefined) {
                res.status(400).json({
                    version: "2",
                    message: `data with id ${id} not found`,
                    data: null
                });
            } else {
                res.status(200).json({
                    version: "2",
                    message: "success",
                    data: findData
                });
            }
        }
    });

export default app;