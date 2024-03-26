import express from "express";
import cors from "cors"
import bodyParser from "body-parser";
import createRoute from "./routes/post.js";
import getRoute from "./routes/get.js";
import deleteRoute from "./routes/delete.js";
import update from "./routes/update.js";

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())

app.get("/get/:tableName", getRoute);
app.post("/post/:tableName", createRoute);
app.delete("/del/:params", deleteRoute);
app.post("/update", update);

const port = 3000;
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
