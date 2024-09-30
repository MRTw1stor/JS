import express from "express";
import cors from "cors"
import bodyParser from "body-parser";
import createRoute from "./routes/post.js";
import getRoute from "./routes/get.js";
import updateDifficultTables from "./routes/update/updateDifficultTables.js";
import updateEasyTables from "./routes/update/updateEasyTables.js";

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())

app.get("/get/:tableName", getRoute);
app.post("/post/:tableName", createRoute);
app.post("/updateDifficultTables/:tableName", updateDifficultTables);
app.post("/updateEasyTables/:tableName", updateEasyTables);

const port = 3000;
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});