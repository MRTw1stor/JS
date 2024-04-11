import express from "express";
import cors from "cors"
import bodyParser from "body-parser";
import createRoute from "./routes/post.js";
import getRoute from "./routes/get.js";
import deleteRoute from "./routes/delete.js";
import updateInventoryNumber from "./routes/update/updateInventoryNumber.js";
import updateDepartamentAndCabinet from "./routes/update/updateDepartamentAndCabinet.js";
import updateStationStatus from "./routes/update/updateStationStatus.js";
import updateWorkStationTechnik from "./routes/update/updateWorkStationTechnik.js";
import updateWorkstationFisical from "./routes/update/updateWorkstationFisical.js";

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())

app.get("/get/:tableName", getRoute);
app.post("/post/:tableName", createRoute);
app.delete("/del/:params", deleteRoute);
app.post("/updateInventoryNumber/:tableName", updateInventoryNumber);
app.post("/updateDepartamentAndCabinet/:tableName", updateDepartamentAndCabinet);
app.post("/updateStationStatus/:tableName", updateStationStatus);
app.post("/updateWorkStationTechnik/:tableName", updateWorkStationTechnik);
app.post("/updateWorkstationFisical/:tableName", updateWorkstationFisical);

const port = 3000;
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});