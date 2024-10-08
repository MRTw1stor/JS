import { getDates } from "../../proto.js";
import { createItem } from "../../api.js";
import { UpdateData } from "../../proto.js";

async function importUtchetTable(haveWorkstationId, dates) {

    const workstation = await getDates("workstation");
    const maxWorkstationId = Math.max(...workstation.map(work => work.station_id));

    let index = 0

    if (dates.length > 0) {
        for (let i = haveWorkstationId + 1; i <= maxWorkstationId; i++) {
            await createItem("accountingequipment", i, dates[index].inventoryNumber, dates[index].stationDepartamentId, dates[index].cabinet);
            index += 1
        }
    }

    await UpdateData();
}

export default importUtchetTable;