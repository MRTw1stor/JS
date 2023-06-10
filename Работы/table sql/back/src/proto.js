import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import createItems from "./functions/post.js";
import getItems from "./functions/get.js";
import deleteItems from "./functions/delete.js";

const app = express()
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.get("/", getItems)
app.post("/", createItems)
app.delete("/", deleteItems)

const port = 3000
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})