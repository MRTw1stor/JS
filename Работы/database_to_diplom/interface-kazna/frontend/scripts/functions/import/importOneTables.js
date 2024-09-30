import { getDates } from "../../proto.js";
import { createItem } from "../../api.js";
import { UpdateData } from "../../proto.js";

async function importOneTables(processedData) {

    const stantionsmodels = await getDates("stantionsmodels");
    const conturs = await getDates("conturs");
    const departments = await getDates("departments");
    const os = await getDates("operatingsystems");
    const monitorbrands = await getDates("monitorbrands");
    const processor = await getDates("processors");
    const ram = await getDates("ram");
    const disksbrands = await getDates("disksbrands");
    const diskscapasity = await getDates("diskscapasity");

    const existingStantionsModels = stantionsmodels.map(model => model.model_name);
    const existingDepartaments = departments.map(dep => dep.department_name);
    const existingConturs = conturs.map(con => con.contur_name);
    const existingOperatingSystems = os.map(osi => osi.operatingsystem_name);
    const existingMonitorBrands = monitorbrands.map(brand => brand.brand_name);
    const existingProcessor = processor.map(proc => proc.processor_name);
    const existingRam = ram.map(ramm => ramm.ram_capacity);
    const existingDisksCapasity = diskscapasity.map(cap => cap.capasity_name);
    const existingDiskBrands = disksbrands.map(brand => brand.brand_name);

    const uniqueValuesStationModels = new Set();
    const uniqueValuesDepartaments = new Set();
    const uniqueValuesConturs = new Set();
    const uniqueValuesOS = new Set();
    const uniqueValuesMonitorBrand = new Set();
    const uniqueValuesProcessors = new Set();
    const uniqueValuesRam = new Set();
    const uniqueValuesDiskCapasity = new Set();
    const uniqueValuesDiskBrand = new Set();

    for (const row of processedData.slice(1)) {

        if (row[0]){
            if (!uniqueValuesStationModels.has(row[0])) {
                uniqueValuesStationModels.add(row[0]);
        
                if (!existingStantionsModels.includes(row[0])) {
                    await createItem("stantionsmodels", row[0]);
                    setTimeout(async () => {
                        await UpdateData();
                    }, 1000);
                }
            }
        }
        if (row[3]){
            if (!uniqueValuesDepartaments.has(row[3])) {
                uniqueValuesDepartaments.add(row[3]);
        
                if (!existingDepartaments.includes(row[3])) {
                    await createItem("departments", row[3]);
                    setTimeout(async () => {
                        await UpdateData();
                    }, 1000);
                }
            }
        }
        if (row[6]){
            if (!uniqueValuesConturs.has(row[6])) {
                uniqueValuesConturs.add(row[6]);
        
                if (!existingConturs.includes(row[6])) {
                    if(row[6] !== 0){
                        await createItem("conturs", row[6]);
                        setTimeout(async () => {
                            await UpdateData();
                        }, 1000);
                    }
                }
            }
        }
        if (row[10]){
            if (!uniqueValuesOS.has(row[10])) {
                uniqueValuesOS.add(row[10]);
        
                if (!existingOperatingSystems.includes(row[10])) {
                    if(row[10] !== 0){
                        await createItem("operatingsystems", row[10]);
                        setTimeout(async () => {
                            await UpdateData();
                        }, 1000);
                    }
                }
            }
        }
        if(row[11]){
            const monitors = row[11]

            if(monitors !== 0){

                const parts = monitors.split(' ');
                const brand = parts[0];
                
                if (!uniqueValuesMonitorBrand.has(brand)) {
                    uniqueValuesMonitorBrand.add(brand);
            
                    if (!existingMonitorBrands.includes(brand)) {
                        await createItem("monitorbrands", brand);
                        setTimeout(async () => {
                            await UpdateData();
                        }, 1000);
                    }
                }
            }
        }
        if (row[14]){
            if (!uniqueValuesProcessors.has(row[14])) {
                uniqueValuesProcessors.add(row[14]);
        
                if (!existingProcessor.includes(row[14])) {
                    if(row[14] !== 0){
                        createItem("processors", row[14]);
                        setTimeout(async () => {
                            await UpdateData();
                        }, 1000);
                    }
                }
            }
        }
        if(row[15]){
            const ram = row[15]

            if(ram !== 0){
                const parts = ram.split(' ');
                const value = parts[0];
                
                if (!uniqueValuesRam.has(value)) {
                    uniqueValuesRam.add(value);
            
                    if (!existingRam.includes(parseInt(value))) {
                        await createItem("ram", parseInt(value));
                        setTimeout(async () => {
                            await UpdateData();
                        }, 1000);
                    }
                }
            }
        }
        if(row[16]){
            const disk = row[16]
            const diskcapasity = row[18]

            if (disk !== 0 && diskcapasity !== 0){

                const part = diskcapasity.split(' ');
                const capasity = part[0];
                
                if (!uniqueValuesDiskCapasity.has(capasity)) {
                    uniqueValuesDiskCapasity.add(capasity);

                    if (!existingDisksCapasity.includes(parseInt(capasity))) {
                        await createItem("diskscapasity", parseInt(capasity));
                        setTimeout(async () => {
                            await UpdateData();
                        }, 1000);
                    }
                }

                const parts = disk.split(' ');
                const brand = parts[0];

                if (!uniqueValuesDiskBrand.has(brand)) {
                    uniqueValuesDiskBrand.add(brand);
            
                    if (!existingDiskBrands.includes(brand)) {
                        await createItem("disksbrands", brand);
                        setTimeout(async () => {
                            await UpdateData();
                        }, 1000);
                    }
                }
            }
        }
    }
}

export default importOneTables;