import { getDates } from "../../proto.js";
import { deleteItem } from "../../api.js";
import { UpdateData } from "../../proto.js";
import ViewDates from "./viewDates.js";

const Computers = document.getElementById("Computers");
const DeletedStations = document.getElementById("DeletedStations");
DeletedStations.style.display = "none";

async function deletedDates(){

    let deletedworkstations = await getDates("deletedworkstations");
    let workstation = await getDates("workstation");
    let stantionsmodels = await getDates("stantionsmodels");
    let conturs = await getDates("conturs");
    let accountingEquipment = await getDates("accountingequipment");
    let departments = await getDates("departments");
    let os = await getDates("operatingsystems");
    let monitorbrands = await getDates("monitorbrands");
    let monitormodels = await getDates("monitormodels")
    let processor = await getDates("processors");
    let ram = await getDates("ram");
    let disksbrands = await getDates("disksbrands");
    let diskscapasity = await getDates("diskscapasity");
    let disksmodels = await getDates("disksmodels");

    Computers.style.display = "none";
    DeletedStations.style.display = "block";

    const tableBody = document.getElementById('BodyDelete');
    tableBody.innerHTML = '';

    const sortedDeleted = deletedworkstations.sort((a, b) => a.deleted_id - b.deleted_id);

    for (const item of sortedDeleted) {
        const station = workstation.find(station => station.station_id === item.station_id);

        const tr = document.createElement('tr');

        const tdRecovery = document.createElement('td');
        const buttonRecovery = document.createElement("button");
        const imgRecovery = new Image();
        imgRecovery.src = "./images/unarchive.png";
        imgRecovery.alt = "Unarchive";
        buttonRecovery.appendChild(imgRecovery);
        buttonRecovery.id = "DeleteArchiveRecoveryButton" + item.deleted_id;
        buttonRecovery.addEventListener("click", async () => {
            deleteItem("deletedworkstations", "deleted_id", parseInt(item.deleted_id));
            UpdateData()
            setTimeout(async () => {
                deletedDates()
            }, 1000);
        });
        tdRecovery.appendChild(buttonRecovery);
        tr.appendChild(tdRecovery);

        const tdDelete = document.createElement('td');
        const buttonDelete = document.createElement("button");
        const imgDelete = new Image();
        imgDelete.src = "./images/delete.png";
        imgDelete.alt = "Delete";
        buttonDelete.appendChild(imgDelete);
        buttonDelete.id = "ComputerDeleteDatesButton" + item.deleted_id;
        buttonDelete.addEventListener("click", async () => {
            const shouldProceed = confirm("Вы уверены что хотите удалить этот компьютер? Дальнейшее востановление будет невозможно!");
            if (shouldProceed) {
                deleteItem("changesdatas", "accountingequipment_id", parseInt(station.station_id));

                setTimeout(async () => {
                    deleteItem("deletedworkstations", "deleted_id", parseInt(item.deleted_id));

                    setTimeout(async () => {

                        deleteItem("accountingequipment", "accountingequipment_id", parseInt(station.station_id));

                        setTimeout(async () => {
                            deleteItem("workstation", "station_id", parseInt(station.station_id));
                        }, 1000);

                    }, 1000);

                }, 1000);

                UpdateData()
                
                setTimeout(async () => {
                    deletedDates()
                }, 1000);
            }
        });
        tdDelete.appendChild(buttonDelete);
        tr.appendChild(tdDelete);

        const writeOffId = document.createElement('td');
        writeOffId.textContent = item.deleted_id;
        tr.appendChild(writeOffId);

        const date = new Date(item.deleted_date);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        const formattedDate = `${day}.${month}.${year} в ${hours}:${minutes}`;
        const dateWriteOff = document.createElement('td');
        dateWriteOff.textContent = formattedDate
        tr.appendChild(dateWriteOff);

        const stationNumberTd = document.createElement('td');
        stationNumberTd.textContent = station.station_id;
        tr.appendChild(stationNumberTd);

        const model = stantionsmodels.find(model => model.model_id === station.model_id);
        const modelName = model ? model.model_name : '';
        const modelTd = document.createElement('td');
        modelTd.textContent = modelName;
        tr.appendChild(modelTd);

        const serialNumberTd = document.createElement('td');
        serialNumberTd.textContent = station.serial_number;
        tr.appendChild(serialNumberTd);

        const inventoryNumberTd = document.createElement('td');
        inventoryNumberTd.textContent = accountingEquipment.find(eq => eq.station_id === station.station_id).inventory_number || '';
        tr.appendChild(inventoryNumberTd);

        const departmentId = accountingEquipment.find(eq => eq.station_id === station.station_id).department_id;
        const departmentName = departments.find(dep => dep.department_id === departmentId)?.department_name || '';
        const departament = document.createElement('td');
        departament.textContent = departmentName;
        tr.appendChild(departament);

        const cabinet = document.createElement('td');
        cabinet.textContent = accountingEquipment.find(eq => eq.station_id === station.station_id).cabinet || '';
        tr.appendChild(cabinet);

        const stationNameTd = document.createElement('td');
        stationNameTd.textContent = station.station_name;
        tr.appendChild(stationNameTd);

        const stationStatusTd = document.createElement('td');
        stationStatusTd.textContent = station.station_status ? "использовался" : "не использовался";
        tr.appendChild(stationStatusTd);

        const contur = conturs.find(con => con.contur_id === station.station_contur);
        const conturName = contur ? contur.contur_name : '';
        const stationConturTd = document.createElement('td');
        stationConturTd.textContent = conturName
        tr.appendChild(stationConturTd);

        const stationIPTd = document.createElement('td');
        stationIPTd.textContent = station.station_ip;
        tr.appendChild(stationIPTd);

        const stationMACTd = document.createElement('td');
        stationMACTd.textContent = station.mac_address;
        tr.appendChild(stationMACTd);

        const stationSobleTd = document.createElement('td');
        stationSobleTd.textContent = station.soble;
        tr.appendChild(stationSobleTd);

        const osi = os.find(osi => osi.operatingsystem_id === station.station_os);
        const osName = osi ? osi.operatingsystem_name : '';
        const stationOCTd = document.createElement('td');
        stationOCTd.textContent = osName;
        tr.appendChild(stationOCTd);

        const stationMonitorTd = document.createElement('td');
        const correspondingModel = monitormodels.find(model => model.model_id === station.monitor_model_id);
        if (correspondingModel) {
            const correspondingBrand = monitorbrands.find(brand => brand.brand_id === correspondingModel.brand_id);
            if(correspondingBrand){
                stationMonitorTd.textContent = `${correspondingBrand.brand_name} ${correspondingModel.model_name}`
            }
        }
        tr.appendChild(stationMonitorTd);

        const stationMonitorNumberTd = document.createElement('td');
        stationMonitorNumberTd.textContent = station.monitor_serial_number;
        tr.appendChild(stationMonitorNumberTd);

        const procesor = processor.find(proc => proc.processor_id === station.processor_id);
        const processorName = procesor ? procesor.processor_name : '';
        const stationProcessorTd = document.createElement('td');
        stationProcessorTd.textContent = processorName;
        tr.appendChild(stationProcessorTd);

        const ramm = ram.find(ramm => ramm.ram_id === station.ram_id);
        const rammName = ramm ? ramm.ram_capacity : '';
        const stationRamTd = document.createElement('td');
        stationRamTd.textContent = rammName;
        tr.appendChild(stationRamTd);

        const stationDiskTd = document.createElement('td');
        const correspondingModels = disksmodels.find(model => model.model_id === station.disk_model_id);
        if (correspondingModels) {
            const correspondingBrand = disksbrands.find(brand => brand.brand_id === correspondingModels.brand_id);
            if(correspondingBrand){
                stationDiskTd.textContent = `${correspondingBrand.brand_name} ${correspondingModels.model_name}`
            }
        }
        tr.appendChild(stationDiskTd);

        const stationDiskCapasityTd = document.createElement('td');
        const correspondingCapasity = disksmodels.find(model => model.model_id === station.disk_model_id);
        if (correspondingCapasity) {
            const correspondingCapasityID = diskscapasity.find(capasity => capasity.capasity_id === correspondingCapasity.capasity_id);
            if(correspondingCapasityID){
                stationDiskCapasityTd.textContent = `${correspondingCapasityID.capasity_name} GB`;
            }
        }
        tr.appendChild(stationDiskCapasityTd);

        const stationDiskNumberTd = document.createElement('td');
        stationDiskNumberTd.textContent = station.disk_serial_number;
        tr.appendChild(stationDiskNumberTd);

        tableBody.appendChild(tr);
    }
}

document.getElementById("DeletedStationsGoBackButton").addEventListener("click", () => {
    Computers.style.display = "block";
    DeletedStations.style.display = "none";

    ViewDates()
});

export default deletedDates