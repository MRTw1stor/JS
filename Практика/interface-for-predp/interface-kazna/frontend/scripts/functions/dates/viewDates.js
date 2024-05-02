import { getDates } from "../../proto.js";
import addFilterInputsToTable from "../addFilter.js";
import FilterTable from "../filter.js";
import addSortButtonsToTable from "../addSort.js";
import SortTable from "../sort.js";

async function ViewDates(){

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
    let writeoffworkstations = await getDates("writeoffworkstations");
    let deletedworkstations = await getDates("deletedworkstations");

    const tbody = document.getElementById("BodyComputer");
    tbody.innerHTML = '';

    workstation.sort((a, b) => a.station_id - b.station_id);

    for (const item of workstation) {
        const idInWriteOff = writeoffworkstations.find(wow => item.station_id === wow.station_id);
        const idInDeleted = deletedworkstations.find(del => item.station_id === del.station_id);

        if (!idInWriteOff && !idInDeleted) {
            const tr = document.createElement('tr');
            tr.setAttribute('id', "station_row_" + item.station_id);
    
    
            for (const key in item) {
                let value = item[key];
                if (key === 'station_id'){
    
                    const tdEdit = document.createElement('td');
                    const buttonEdit = document.createElement("button");
                    const imgEdit = new Image();
                    imgEdit.src = "./images/pencil.png";
                    imgEdit.alt = "Edit";
                    buttonEdit.appendChild(imgEdit);
                    buttonEdit.id = "ComputerChangeDatesButton" + item.station_id;
                    tdEdit.appendChild(buttonEdit);
                    tr.appendChild(tdEdit);
    
                    const tdDelete = document.createElement('td');
                    const buttonDelete = document.createElement("button");
                    const imgDelete = new Image();
                    imgDelete.src = "./images/delete.png";
                    imgDelete.alt = "Delete";
                    buttonDelete.appendChild(imgDelete);
                    buttonDelete.id = "ComputerDeleteButton" + item.station_id;
                    tdDelete.appendChild(buttonDelete);
                    tr.appendChild(tdDelete);
    
                    const tdArchive = document.createElement('td');
                    const buttonrchive = document.createElement("button");
                    const imgrchive = new Image();
                    imgrchive.src = "./images/archivedates.png";
                    imgrchive.alt = "Archive";
                    buttonrchive.appendChild(imgrchive);
                    buttonrchive.id = "ComputerArchiveDatesButton" + item.station_id;
                    tdArchive.appendChild(buttonrchive);
                    tr.appendChild(tdArchive);
                }
                if (key === 'model_id') {
                    const correspondingModel = stantionsmodels.find(model => model.model_id === value);
                    if (correspondingModel) {
                        value = correspondingModel.model_name;
                    }
                }
                if (key === 'station_name'){
    
                    const tdInventoryNumbers = document.createElement('td');
                    const correspondingNumber = accountingEquipment.find(eq => eq.station_id === item.station_id);
                    if (correspondingNumber) {
                        tdInventoryNumbers.textContent = correspondingNumber.inventory_number;
                    }
                    tr.appendChild(tdInventoryNumbers);
    
                    const tdDepartments = document.createElement('td');
                    const correspondingDepartament = accountingEquipment.find(eq => eq.station_id === item.station_id);
                    if (correspondingDepartament) {
                        const correspondingDepartamentID = departments.find(dep => dep.department_id === correspondingDepartament.department_id);
                        if(correspondingDepartamentID){
                            tdDepartments.textContent = correspondingDepartamentID.department_name;
                        }
                    }
                    tr.appendChild(tdDepartments);
    
                    const tdCabinets = document.createElement('td');
                    const correspondingCabinet = accountingEquipment.find(eq => eq.station_id === item.station_id);
                    if (correspondingCabinet) {
                        tdCabinets.textContent = correspondingCabinet.cabinet;
                    }
                    tr.appendChild(tdCabinets);
                }
                if(key === 'station_status'){
                    const statusValue = value === true ? 'используется' : 'не используется';
                    value = statusValue;
                }
                if(key === 'station_contur'){
                    const correspondingContur = conturs.find(con => con.contur_id === value);
                    if (correspondingContur) {
                        value = correspondingContur.contur_name;
                    }
                }
                if(key === 'station_os'){
                    const correspondingOS = os.find(os => os.operatingsystem_id === value);
                    if (correspondingOS) {
                        value = correspondingOS.operatingsystem_name;
                    }
                }
                if(key === 'monitor_model_id'){
                    const correspondingModel = monitormodels.find(model => model.model_id === value);
                    if (correspondingModel) {
                        const correspondingBrand = monitorbrands.find(brand => brand.brand_id === correspondingModel.brand_id);
                        if(correspondingBrand){
                            value = `${correspondingBrand.brand_name} ${correspondingModel.model_name}`
                        }
                    }
                }
                if(key === 'processor_id'){
                    const correspondingProcessor = processor.find(processor => processor.processor_id === value);
                    if (correspondingProcessor) {
                        value = correspondingProcessor.processor_name;
                    }
                }
                if(key === 'ram_id'){
                    const correspondingRam = ram.find(ram => ram.ram_id === value);
                    if (correspondingRam) {
                        value = `${correspondingRam.ram_capacity} MB`;
                    }
                }
                if(key === 'disk_model_id'){
                    const correspondingModel = disksmodels.find(model => model.model_id === value);
                    if (correspondingModel) {
                        const correspondingBrand = disksbrands.find(brand => brand.brand_id === correspondingModel.brand_id);
                        if(correspondingBrand){
                            value = `${correspondingBrand.brand_name} ${correspondingModel.model_name}`
                        }
                    }
                }
                if(key === 'disk_serial_number'){
                    const tdCapasity = document.createElement('td');
                    const correspondingCapasity = disksmodels.find(model => model.model_id === item.disk_model_id);
                    if (correspondingCapasity) {
                        const correspondingCapasityID = diskscapasity.find(capasity => capasity.capasity_id === correspondingCapasity.capasity_id);
                        if(correspondingCapasityID){
                            tdCapasity.textContent = `${correspondingCapasityID.capasity_name} GB`;
                        }
                    }
                    tr.appendChild(tdCapasity);
                }
                
                const td = document.createElement('td');
                td.textContent = value;
                tr.appendChild(td);
                
            }

            tbody.appendChild(tr);
        }
    }

    addFilterInputsToTable(FilterTable);
    addSortButtonsToTable(SortTable);
}

export default ViewDates