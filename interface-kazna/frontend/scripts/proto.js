import { getItems, createItem, deleteItem } from "./api.js";

import ViewDates from "./functions/dates/viewDates.js";
import FilterTable from "./functions/filter.js";
import CreateRow from "./functions/createRow.js";
import SelectModels from "./functions/select/selectModels.js";
import SelectDepartament from "./functions/select/selectDepartament.js";
import SelectOC from "./functions/select/selectOC.js";
import SelectMonitors from "./functions/select/selectMonitors.js";
import SelectProcessor from "./functions/select/selectProcessor.js";
import SelectRam from "./functions/select/selectRam.js";
import SelectDisks from "./functions/select/selectDisk.js";
import SelectTables from "./functions/select/selectTables.js";
import displayMonitorBrands from "./functions/display/displayMonitorBrands.js";
import displayMonitorModels from "./functions/display/displayMonitorModels.js";
import displayDiskCapasity from "./functions/display/displayDiskCapasity.js";
import displayDiskBrands from "./functions/display/displayDiskBrands.js";
import displayDiskModels from "./functions/display/displayDiskModels.js";
import displayStationModels from "./functions/display/displayStationModels.js";
import displayOperatingSystems from "./functions/display/displayOperatingSystems.js";
import displayProcessors from "./functions/display/displayProcessors.js";
import displayRam from "./functions/display/displayRam.js";
import displayDepartament from "./functions/display/displayDepartament.js";
import ChangeRow from "./functions/changeRow.js";
import changetDates from "./functions/dates/changetDates.js";
import createCheckbox from "./functions/createCheckbox.js";
import WriteOffDates from "./functions/dates/writeOffDates.js";
import deletedDates from "./functions/dates/deletedDates.js";

export async function getDates(tableName) {
    const items = await getItems(tableName);
    const item = items.rows
    return item
}

let workstation = await getDates("workstation");
let stantionsmodels = await getDates("stantionsmodels");
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

export async function UpdateData() {
    workstation = await getDates("workstation");
    stantionsmodels = await getDates("stantionsmodels");
    accountingEquipment = await getDates("accountingequipment");
    departments = await getDates("departments");
    os = await getDates("operatingsystems");
    monitorbrands = await getDates("monitorbrands");
    monitormodels = await getDates("monitormodels")
    processor = await getDates("processors");
    ram = await getDates("ram");
    disksbrands = await getDates("disksbrands");
    diskscapasity = await getDates("diskscapasity");
    disksmodels = await getDates("disksmodels");
    writeoffworkstations = await getDates("writeoffworkstations");
    deletedworkstations = await getDates("deletedworkstations");
}

ViewDates()

document.getElementById("ComputerFilterButton").addEventListener("click", () => {
    document.querySelectorAll("#Computer th input").forEach(input => input.value = "");
    FilterTable();
});

export async function selectAll(){
    await SelectModels(stantionsmodels)
    await SelectDepartament(departments)
    await SelectOC(os)
    await SelectMonitors(monitorbrands, monitormodels)
    await SelectProcessor(processor)
    await SelectRam(ram)
    await SelectDisks(disksbrands, disksmodels, diskscapasity)
}

export async function displayAll(){
    await displayMonitorBrands()
    await displayMonitorModels()
    await displayDiskCapasity()
    await displayDiskBrands()
    await displayDiskModels()
    await displayStationModels()
    await displayOperatingSystems()
    await displayProcessors()
    await displayRam()
    await displayDepartament()
}

document.getElementById("ComputerCreateComputerButton").addEventListener("click", () => {
    CreateRow()
});

document.getElementById("ComputerCreateDatesButton").addEventListener("click", () => {
    SelectTables()
});

document.getElementById("ComputerNewMonitorBrandsButton").addEventListener("click", async () => {
    const input = document.getElementById("ComputerNewMonitorBrandsInput");
    const inputValue = input.value.trim();
    const warningText = document.getElementById("MonitorBrandsWarningText");

    if (inputValue === "") {
        warningText.textContent = "Пожалуйста, введите название фирмы монитора";
        warningText.style.display = "block";
        setTimeout(() => { warningText.style.display = "none"; }, 5000);
    } 
    else if (inputValue.length > 51) {
        warningText.textContent = "Слишком большое значение названия фирмы Монитора";
        warningText.style.display = "block";
        setTimeout(() => { warningText.style.display = "none"; }, 5000);
    }
    else if (!/^[a-zA-Zа-яА-Я]+$/.test(inputValue)) {
        warningText.textContent = "Название фирмы монитора может содержать только буквы";
        warningText.style.display = "block";
        setTimeout(() => { warningText.style.display = "none"; }, 5000);
    } 
    else if(monitorbrands.map(brand => brand.brand_name.toLowerCase()).includes(inputValue.toLowerCase())) {
        warningText.textContent = "Такая фирма мониторов уже внесена в базу";
        warningText.style.display = "block";
        setTimeout(() => { warningText.style.display = "none"; }, 5000);
    }
    else {
        warningText.style.display = "none";
        await createItem("monitorbrands", input.value);
        input.value = "";
        await UpdateData();
        await displayMonitorBrands()
    }
});

document.getElementById("ComputerNewMonitorModelButton").addEventListener("click", async () => {
    const select = document.getElementById("ComputerNewMonitorModelSelect");
    const selectValue = parseInt(select.value)
    const input = document.getElementById("ComputerNewMonitorModelInput");
    const inputValue = input.value.trim();
    const warningText = document.getElementById("MonitorModelsWarningText");

    if (select.value === "") {
        warningText.textContent = "Пожалуйста, выберите фирму монитора";
        warningText.style.display = "block";
        setTimeout(() => { warningText.style.display = "none"; }, 5000);
    } 
    else if (inputValue === "") {
        warningText.textContent = "Пожалуйста, введите название модели монитора";
        warningText.style.display = "block";
        setTimeout(() => { warningText.style.display = "none"; }, 5000);
    }
    else if (inputValue.length > 51) {
        warningText.textContent = "Слишком большое значение названия модели Монитора";
        warningText.style.display = "block";
        setTimeout(() => { warningText.style.display = "none"; }, 5000);
    }
    else if (!/^[a-zA-Zа-яА-Я0-9_-]+$/.test(inputValue)) {
        warningText.textContent = "Название модели монитора должно содержать буквы, цифры, дефисы и подчеркивания";
        warningText.style.display = "block";
        setTimeout(() => { warningText.style.display = "none"; }, 5000);
    }
    else if(monitormodels.map(model => model.model_name.toLowerCase()).includes(inputValue.toLowerCase())) {
        warningText.textContent = "Такая модель монитора уже внесена в базу";
        warningText.style.display = "block";
        setTimeout(() => { warningText.style.display = "none"; }, 5000);
    }
    else{
        warningText.style.display = "none";
        await createItem("monitormodels", selectValue, input.value);
        select.value = "";
        input.value = "";
        await UpdateData();
        await displayMonitorModels()
    }
});

document.getElementById("ComputerNewDiskCapasityButton").addEventListener("click", async () => {
    const input = document.getElementById("ComputerNewDiskCapasityInput");
    const inputValue = input.value.trim();
    const warningText = document.getElementById("DiskCapasityWarningText");

    if (inputValue === "") {
        warningText.textContent = "Пожалуйста, введите объем памяти жесткого диска";
        warningText.style.display = "block";
        setTimeout(() => { warningText.style.display = "none"; }, 5000);
    }
    else if (diskscapasity.some(capasity => capasity.capasity_name == inputValue)) {
        warningText.textContent = "Такой объем памяти уже внесен в базу";
        warningText.style.display = "block";
        setTimeout(() => { warningText.style.display = "none"; }, 5000);
    }
    else {
        warningText.style.display = "none";
        await createItem("diskscapasity", parseInt(input.value));
        input.value = "";
        await UpdateData();
        await displayDiskCapasity()
    }
});

document.getElementById("ComputerNewDiskBrandButton").addEventListener("click", async () => {
    const input = document.getElementById("ComputerNewDiskBrandInput");
    const inputValue = input.value.trim();
    const warningText = document.getElementById("DiskBrandWarningText");

    if (inputValue === "") {
        warningText.textContent = "Пожалуйста, введите название фирмы диска";
        warningText.style.display = "block";
        setTimeout(() => { warningText.style.display = "none"; }, 5000);
    } 
    else if (inputValue.length > 51) {
        warningText.textContent = "Слишком большое значение названия фирмы Диска";
        warningText.style.display = "block";
        setTimeout(() => { warningText.style.display = "none"; }, 5000);
    }
    else if (!/^[a-zA-Zа-яА-Я]+$/.test(inputValue)) {
        warningText.textContent = "Название фирмы диска может содержать только буквы";
        warningText.style.display = "block";
        setTimeout(() => { warningText.style.display = "none"; }, 5000);
    } 
    else if(disksbrands.map(brand => brand.brand_name.toLowerCase()).includes(inputValue.toLowerCase())) {
        warningText.textContent = "Такая фирма диска уже внесена в базу";
        warningText.style.display = "block";
        setTimeout(() => { warningText.style.display = "none"; }, 5000);
    }
    else {
        warningText.style.display = "none";
        await createItem("disksbrands", input.value);
        input.value = "";
        await UpdateData();
        await displayDiskBrands()
    }
});

document.getElementById("ComputerNewDiskModelsButton").addEventListener("click", async () => {
    const selectBrand = document.getElementById("ComputerNewDiskModelSelectBrand");
    const selectBrandValue = parseInt(selectBrand.value)
    const selectCapasity = document.getElementById("ComputerNewDiskModelSelectCapasity");
    const selectCapasityValue = parseInt(selectCapasity.value)
    const input = document.getElementById("ComputerNewDiskModelsInput");
    const inputValue = input.value.trim();
    const warningText = document.getElementById("DiskModelsWarningText");

    if (selectBrand.value === "") {
        warningText.textContent = "Пожалуйста, выберите фирму жесткого диска";
        warningText.style.display = "block";
        setTimeout(() => { warningText.style.display = "none"; }, 5000);
    } 
    else if (inputValue === "") {
        warningText.textContent = "Пожалуйста, введите название модели жесткого диска";
        warningText.style.display = "block";
        setTimeout(() => { warningText.style.display = "none"; }, 5000);
    }
    else if (inputValue.length > 51) {
        warningText.textContent = "Слишком большое значение названия модели Диска";
        warningText.style.display = "block";
        setTimeout(() => { warningText.style.display = "none"; }, 5000);
    }
    else if (!/^[a-zA-Zа-яА-Я0-9_-\s]+$/.test(inputValue)) {
        warningText.textContent = "Название модели монитора должно содержать буквы, цифры, дефисы, подчеркивания и пробелы";
        warningText.style.display = "block";
        setTimeout(() => { warningText.style.display = "none"; }, 5000);
    }
    else if (selectCapasity.value === "") {
        warningText.textContent = "Пожалуйста, выберите объем жесткого диска";
        warningText.style.display = "block";
        setTimeout(() => { warningText.style.display = "none"; }, 5000);
    } 
    else if(disksmodels.map(model => model.model_name.toLowerCase()).includes(inputValue.toLowerCase())) {
        warningText.textContent = "Такая модель монитора уже внесена в базу";
        warningText.style.display = "block";
        setTimeout(() => { warningText.style.display = "none"; }, 5000);
    }
    else{
        warningText.style.display = "none";
        await createItem("disksmodels", selectBrandValue, selectCapasityValue, input.value);
        selectBrand.value = "";
        selectCapasity.value = "";
        input.value = "";
        await UpdateData();
        await displayDiskModels()
    }
});

document.getElementById("ComputerNewStationModelsButton").addEventListener("click", async () => {
    const input = document.getElementById("ComputerNewStationModelsInput");
    const inputValue = input.value.trim();
    const warningText = document.getElementById("ComputerStationWarningText");

    if (inputValue === "") {
        warningText.textContent = "Пожалуйста, введите название модели станции";
        warningText.style.display = "block";
        setTimeout(() => { warningText.style.display = "none"; }, 5000);
    }
    else if (inputValue.length > 51) {
        warningText.textContent = "Слишком большое значение названия модели Станции";
        warningText.style.display = "block";
        setTimeout(() => { warningText.style.display = "none"; }, 5000);
    }
    else if (!/^[a-zA-Zа-яА-Я0-9_-\s]+$/.test(inputValue)) {
        warningText.textContent = "Название модели станции может содержать буквы, цифры, дефисы, подчеркивания и пробелы";
        warningText.style.display = "block";
        setTimeout(() => { warningText.style.display = "none"; }, 5000);
    }
    else if(stantionsmodels.map(model => model.model_name.toLowerCase()).includes(inputValue.toLowerCase())) {
        warningText.textContent = "Такая модель станции уже внесена в базу";
        warningText.style.display = "block";
        setTimeout(() => { warningText.style.display = "none"; }, 5000);
    }
    else{
        warningText.style.display = "none";
        await createItem("stantionsmodels", input.value);
        input.value = "";
        await UpdateData();
        await displayStationModels()
    }
});

document.getElementById("ComputerNewOperatingSystemsButton").addEventListener("click", async () => {
    const input = document.getElementById("ComputerNewOperatingSystemsInput");
    const inputValue = input.value.trim();
    const warningText = document.getElementById("ComputerOperatingSystemsWarningText");

    if (inputValue === "") {
        warningText.textContent = "Пожалуйста, введите название операционной системы ";
        warningText.style.display = "block";
        setTimeout(() => { warningText.style.display = "none"; }, 5000);
    }
    else if (inputValue.length > 51) {
        warningText.textContent = "Слишком большое значение названия Операционной Системы";
        warningText.style.display = "block";
        setTimeout(() => { warningText.style.display = "none"; }, 5000);
    }
    else if (!/^[a-zA-Zа-яА-Я0-9_-\s.]+$/.test(inputValue)) {
        warningText.textContent = "Название операционной системы может содержать буквы, цифры, дефисы, подчеркивания, пробелы и точки";
        warningText.style.display = "block";
        setTimeout(() => { warningText.style.display = "none"; }, 5000);
    }
    else if(os.map(osi => osi.operatingsystem_name.toLowerCase()).includes(inputValue.toLowerCase())) {
        warningText.textContent = "Такая операционная система уже внесена в базу";
        warningText.style.display = "block";
        setTimeout(() => { warningText.style.display = "none"; }, 5000);
    }
    else{
        warningText.style.display = "none";
        await createItem("operatingsystems", input.value);
        input.value = "";
        await UpdateData();
        await displayOperatingSystems()
    }
});

document.getElementById("ComputerNewProcessorsButton").addEventListener("click", async () => {
    const input = document.getElementById("ComputerNewProcessorsInput");
    const inputValue = input.value.trim();
    const warningText = document.getElementById("ComputerProcessorsWarningText");

    if (inputValue === "") {
        warningText.textContent = "Пожалуйста, введите название процессора";
        warningText.style.display = "block";
        setTimeout(() => { warningText.style.display = "none"; }, 5000);
    }
    else if (inputValue.length > 51) {
        warningText.textContent = "Слишком большое значение названия Процессора";
        warningText.style.display = "block";
        setTimeout(() => { warningText.style.display = "none"; }, 5000);
    }
    else if (!/^[a-zA-Zа-яА-Я0-9_-\s.®]+$/.test(inputValue)) {
        warningText.textContent = "Название процессора может содержать буквы, цифры, дефисы, подчеркивания, пробелы, точки";
        warningText.style.display = "block";
        setTimeout(() => { warningText.style.display = "none"; }, 5000);
    }
    else if(processor.map(proc => proc.processor_name.toLowerCase()).includes(inputValue.toLowerCase())) {
        warningText.textContent = "Такой процессор уже внесен в базу";
        warningText.style.display = "block";
        setTimeout(() => { warningText.style.display = "none"; }, 5000);
    }
    else{
        warningText.style.display = "none";
        await createItem("processors", input.value);
        input.value = "";
        await UpdateData();
        await displayProcessors()
    }
});

document.getElementById("ComputerNewRamButton").addEventListener("click", async () => {
    const input = document.getElementById("ComputerNewRamInput");
    const inputValue = input.value.trim();
    const warningText = document.getElementById("ComputerRamWarningText");

    if (inputValue === "") {
        warningText.textContent = "Пожалуйста, введите объем оперативной памяти";
        warningText.style.display = "block";
        setTimeout(() => { warningText.style.display = "none"; }, 5000);
    }
    else if (ram.some(ramm => ramm.ram_capacity == inputValue)) {
        warningText.textContent = "Такой объем оперативной памяти уже внесен в базу";
        warningText.style.display = "block";
        setTimeout(() => { warningText.style.display = "none"; }, 5000);
    }
    else {
        warningText.style.display = "none";
        await createItem("ram", parseInt(input.value));
        input.value = "";
        await UpdateData();
        await displayRam()
    }
});

document.getElementById("ComputerNewDepartamentButton").addEventListener("click", async () => {
    const input = document.getElementById("ComputerNewDepartamentInput");
    const inputValue = input.value.trim();
    const warningText = document.getElementById("ComputerDepartamentWarningText");

    if (inputValue === "") {
        warningText.textContent = "Пожалуйста, введите название отдела";
        warningText.style.display = "block";
        setTimeout(() => { warningText.style.display = "none"; }, 5000);
    }
    else if (inputValue.length > 51) {
        warningText.textContent = "Слишком большое значение названия Отдела";
        warningText.style.display = "block";
        setTimeout(() => { warningText.style.display = "none"; }, 5000);
    }
    else if (!/^[a-zA-Zа-яА-Я_\-]+$/.test(inputValue)) {
        warningText.textContent = "Название отдела может содержать буквы, дефисы и подчеркивания";
        warningText.style.display = "block";
        setTimeout(() => { warningText.style.display = "none"; }, 5000);
    }
    else if(departments.map(dep => dep.department_name.toLowerCase()).includes(inputValue.toLowerCase())) {
        warningText.textContent = "Такой отдел уже внесен в базу";
        warningText.style.display = "block";
        setTimeout(() => { warningText.style.display = "none"; }, 5000);
    }
    else{
        warningText.style.display = "none";
        await createItem("departments", input.value);
        input.value = "";
        await UpdateData();
        await displayDepartament()
    }
});

document.addEventListener('click', (event) => {
    if (event.target.id.startsWith('ComputerChangeDatesButton')) {
        const rowId = event.target.id.replace('ComputerChangeDatesButton', '');
        ChangeRow(rowId);
    } else if (event.target.tagName === 'IMG' && event.target.parentElement.tagName === 'BUTTON' && event.target.parentElement.id.startsWith('ComputerChangeDatesButton')) {
        const rowId = event.target.parentElement.id.replace('ComputerChangeDatesButton', '');
        ChangeRow(rowId);
    }
});

document.addEventListener('click', (event) => {
    if (event.target.id.startsWith('ComputerArchiveDatesButton')) {
        const rowId = event.target.id.replace('ComputerArchiveDatesButton', '');
        changetDates(rowId);
    } else if (event.target.tagName === 'IMG' && event.target.parentElement.tagName === 'BUTTON' && event.target.parentElement.id.startsWith('ComputerArchiveDatesButton')) {
        const rowId = event.target.parentElement.id.replace('ComputerArchiveDatesButton', '');
        changetDates(rowId);
    }
});

document.addEventListener('click', async (event) => {
    if (event.target.id.startsWith('ComputerDeleteButton')) {
        const rowId = event.target.id.replace('ComputerDeleteButton', '');
        const shouldProceed = confirm("Вы уверены что хотите удалить этот компьютер ?");
        if (shouldProceed) {
            createItem("deletedworkstations", parseInt(rowId));
            await UpdateData();
            setTimeout(() => {
                ViewDates()
            }, 2000);
        }
    } else if (event.target.tagName === 'IMG' && event.target.parentElement.tagName === 'BUTTON' && event.target.parentElement.id.startsWith('ComputerDeleteButton')) {
        const rowId = event.target.parentElement.id.replace('ComputerDeleteButton', '');
        const shouldProceed = confirm("Вы уверены что хотите удалить этот компьютер ?");
        if (shouldProceed) {
            createItem("deletedworkstations", parseInt(rowId));
            await UpdateData();
            setTimeout(() => {
                ViewDates()
            }, 2000);
        }
    }
});

document.getElementById("ComputerWriteOffComputerButton").addEventListener("click", () => {
    createCheckbox()
});

document.getElementById("ComputerWriteOffDatesButton").addEventListener("click", () => {
    WriteOffDates()
});

document.getElementById("ComputerDeletedComputerButton").addEventListener("click", () => {
    deletedDates()
});