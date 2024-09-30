import { getDates } from "../../proto.js";
import { createItem } from "../../api.js";
import { UpdateData } from "../../proto.js";

async function importTwoTables(processedData) {

    const monitorbrands = await getDates("monitorbrands");
    const monitormodels = await getDates("monitormodels")
    const disksbrands = await getDates("disksbrands");
    const diskscapasity = await getDates("diskscapasity");
    const disksmodels = await getDates("disksmodels");

    const existingMonitorModels = monitormodels.map(model => model.model_name);
    const existingDiskModels = disksmodels.map(model => model.model_name);

    const uniqueValuesMonitor = new Set();
    const uniqueValuesDisk = new Set();

    for (const row of processedData.slice(1)) {
        
        if(row[11]){
            const monitors = row[11]

            if(monitors !== 0){

                const parts = monitors.split(' ');
                const brand = parts[0];
                const model = parts[1];

                if (!uniqueValuesMonitor.has(monitors)) {
                    uniqueValuesMonitor.add(monitors);

                    if(monitors == brand + ' ' + model){
                        if (!existingMonitorModels.includes(model)) {
                
                            const correspondingModel = monitorbrands.find(bra => bra.brand_name == brand);
                            if (correspondingModel) {
                                let brandId = correspondingModel.brand_id;

                                await createItem("monitormodels", brandId, model);
                                setTimeout(async () => {
                                    await UpdateData();
                                }, 1000);
                            }
                        }
                    }
                }
            }
        }
        if(row[18]){
            const disk = row[16]
            const diskcapasity = row[18]

            if (disk !== 0 && diskcapasity !== 0){

                const part = diskcapasity.split(' ');
                const capasity = part[0];
                const disks = disk + ' ' + part[0]

                const parts = disk.split(' ');
                const brand = parts[0];
                let model

                if (parts[2] != undefined && parts[3] != undefined){
                    model = parts[1] + ' ' + parts[2] + ' ' + parts[3];
                }
                else {
                    model = parts[1];
                }
                
                if (!uniqueValuesDisk.has(disks)) {
                    uniqueValuesDisk.add(disks);
            
                    if(disks == brand + ' ' + model + ' ' + part[0]){
                        if (!existingDiskModels.includes(model)) {

                            const correspondingModel = disksbrands.find(bra => bra.brand_name == brand);
                            let brandId
                            if (correspondingModel) {
                                brandId = correspondingModel.brand_id;
                            }

                            const correspondingCapasity = diskscapasity.find(cap => cap.capasity_name == capasity);
                            let capasityId
                            if (correspondingCapasity) {
                                capasityId = correspondingCapasity.capasity_id;
                            }

                            await createItem("disksmodels", parseInt(brandId), parseInt(capasityId), model);
                            setTimeout(async () => {
                                await UpdateData();
                            }, 1000);
                        }
                    }
                }
            }
        }
    }
}

export default importTwoTables;