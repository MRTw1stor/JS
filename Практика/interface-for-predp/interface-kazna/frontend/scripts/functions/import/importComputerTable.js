import { getDates } from "../../proto.js";
import { createItem } from "../../api.js";
import { UpdateData } from "../../proto.js";

async function ImportComputerTable(processedData) {

    const workstation = await getDates("workstation");
    const accountingEquipment = await getDates("accountingequipment");
    const departments = await getDates("departments");
    const stantionsmodels = await getDates("stantionsmodels");
    const conturs = await getDates("conturs");
    const os = await getDates("operatingsystems");
    const monitorbrands = await getDates("monitorbrands");
    const monitormodels = await getDates("monitormodels")
    const processor = await getDates("processors");
    const ram = await getDates("ram");
    const disksbrands = await getDates("disksbrands");
    const disksmodels = await getDates("disksmodels");

    const datesToUtchet = []

    for (const row of processedData.slice(1)) {

        if (row){

            const correspondingMonitorNumber = workstation.find(work => work.monitor_serial_number == row[12]);
            const correspondingDiskNumber = workstation.find(work => work.disk_serial_number == row[17]);
            const correspondingStationNumber = workstation.find(work => work.serial_number == row[1]);
            const correspondingInventoryNumber = accountingEquipment.find(acc => acc.inventory_number == row[2]);

            if (!correspondingStationNumber && !correspondingMonitorNumber && !correspondingDiskNumber && !correspondingInventoryNumber){

                let stationModelId = row[0]
                const correspondingStationModel = stantionsmodels.find(model => model.model_name == row[0]);
                if (correspondingStationModel) {
                    stationModelId = correspondingStationModel.model_id;
                }

                let stationDepartamentId = row[3];
                const correspondingDepartament = departments.find(dep => dep.department_name == row[3]);
                if (correspondingDepartament) {
                    stationDepartamentId = correspondingDepartament.department_id;
                }

                let status
                
                if(row[5] == 'Используется'){
                    status = true
                }
                else if (row[5] == 'Не используется'){
                    status = false
                }

                let stationConturId = row[6]
                if (row[6] != 0){
                    const correspondingStationContur = conturs.find(con => con.contur_name == row[6]);
                    if (correspondingStationContur) {
                        stationConturId = correspondingStationContur.contur_id;
                    }
                }

                let stationOSId = row[10]
                if (row[10] != 0){
                    const correspondingStationOS = os.find(osi => osi.operatingsystem_name == row[10]);
                    if (correspondingStationOS) {
                        stationOSId = correspondingStationOS.operatingsystem_id;
                    }
                }

                let stationMonitorId = row[11]
                if (row[11] != 0){
                    const parts = row[11].split(' ');
                    const monbrand = parts[0];

                    const correspondingmonitorBrand = monitorbrands.find(bra => bra.brand_name == monbrand);
                    if(correspondingmonitorBrand){
                        const correspondingModel = monitormodels.find(model => model.brand_id == correspondingmonitorBrand.brand_id);
                        if(correspondingModel){
                            stationMonitorId = correspondingModel.model_id
                        }
                    }
                }

                let stationProcessorId = row[14]
                if (row[14] != 0){
                    const correspondingStationProcessor = processor.find(proc => proc.processor_name == row[14]);
                    if (correspondingStationProcessor) {
                        stationProcessorId = correspondingStationProcessor.processor_id;
                    }
                }

                let stationRamId = row[15]
                if (row[15] != 0){
                    const part = row[15].split(' ');
                    const capram = part[0];

                    const correspondingStationRam = ram.find(ramm => ramm.ram_capacity == capram);
                    if (correspondingStationRam) {
                        stationRamId = correspondingStationRam.ram_id;
                    }
                }

                let stationDiskId = row[16]
                if (row[16] != 0){
                    const par = row[16].split(' ');
                    const diskbrand = par[0];

                    const correspondingDiskBrand = disksbrands.find(bra => bra.brand_name == diskbrand);
                    if(correspondingDiskBrand){
                        const correspondingModel = disksmodels.find(model => model.brand_id == correspondingDiskBrand.brand_id);
                        if(correspondingModel){
                            stationDiskId = correspondingModel.model_id
                        }
                    }
                }

                let dates = {
                    inventoryNumber: row[2],
                    stationDepartamentId: stationDepartamentId,
                    cabinet: row[4]
                };
                datesToUtchet.push(dates);
                
                await createItem("workstation", stationModelId, row[1], row[7], status, stationConturId, row[8], row[9], 
                row[13], stationOSId, stationMonitorId, row[12], stationProcessorId, stationRamId, stationDiskId, row[17]);

                await UpdateData();
            }
        }
    }
    return datesToUtchet
}

export default ImportComputerTable;