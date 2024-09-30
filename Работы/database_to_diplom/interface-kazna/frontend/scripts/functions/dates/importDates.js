import { getDates } from "../../proto.js";
import ViewDates from "./viewDates.js";
import ImportExelTable from "../import/ImportExelTable.js";
import importOneTables from "../import/importOneTables.js";
import importTwoTables from "../import/importTwoTables.js";
import ImportComputerTable from "../import/importComputerTable.js";
import importUtchetTable from "../import/importUtchetTable.js";

async function ImportDates() {
    const workstation = await getDates("workstation");
    const processedData = await ImportExelTable();

    const WorkstationId = Math.max(...workstation.map(work => work.station_id));
    const haveWorkstationId = isFinite(WorkstationId) ? WorkstationId : 0;

    await importOneTables(processedData)

    setTimeout(async () => {
        await importTwoTables(processedData)
    }, 1000);

    setTimeout(async () => {

        let dates = await ImportComputerTable(processedData)

        setTimeout(async () => {
            await importUtchetTable(haveWorkstationId, dates)

            setTimeout(async () => {
                await ViewDates()
            }, 1000);

        }, 1000);

    }, 3000);
}

export default ImportDates;