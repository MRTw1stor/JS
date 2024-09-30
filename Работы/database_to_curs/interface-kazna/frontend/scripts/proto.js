import { getItems, createItem} from "./api.js";

import ViewDates from "./functions/dates/viewDates.js";
import FilterTable from "./functions/filter.js";
import SelectModels from "./functions/select/selectModels.js";
import SelectDepartament from "./functions/select/selectDepartament.js";
import SelectConturs from "./functions/select/selectContur.js";
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
import displayConturs from "./functions/display/displayConturs.js";

export async function getDates(tableName) {
    const items = await getItems(tableName);
    const item = items.rows
    return item
}

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

let statusInsert = false

export async function UpdateData() {
    workstation = await getDates("workstation");
    stantionsmodels = await getDates("stantionsmodels");
    conturs = await getDates("conturs");
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

export async function selectAll(selectId){
    if(selectId == 1){
        await SelectModels(stantionsmodels)
    }
    else if(selectId == 2) {
        await SelectConturs(conturs)
    }
    else if(selectId == 3) {
        await SelectDepartament(departments)
    }
    else if(selectId == 4) {
        await SelectOC(os)
    }
    else if(selectId == 5) {
        await SelectMonitors(monitorbrands, monitormodels)
    }
    else if(selectId == 6) {
        await SelectProcessor(processor)
    }
    else if(selectId == 7) {
        await SelectRam(ram)
    }
    else if(selectId == 8) {
        await SelectDisks(disksbrands, disksmodels, diskscapasity)
    }
    else if(selectId == 9) {
        await SelectModels(stantionsmodels)
        await SelectConturs(conturs)
        await SelectDepartament(departments)
        await SelectOC(os)
        await SelectMonitors(monitorbrands, monitormodels)
        await SelectProcessor(processor)
        await SelectRam(ram)
        await SelectDisks(disksbrands, disksmodels, diskscapasity)
    }
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
    await displayConturs()
}

document.getElementById("ComputerCreateDatesButton").addEventListener("click", () => {
    SelectTables()
});

document.getElementById("ComputerNewMonitorBrandsButton").addEventListener("click", async () => {
    const input = document.getElementById("ComputerNewMonitorBrandsInput");
    const inputValue = input.value.trim();
    const warningText = document.getElementById("MonitorBrandsWarningText");

    if (inputValue === "") {
        warningText.textContent = "Пожалуйста, введите название Фирмы монитора";
        warningText.style.display = "block";
        setTimeout(() => { warningText.style.display = "none"; }, 5000);
    } 
    else if (inputValue.length > 51) {
        warningText.textContent = "Слишком большое значение названия Фирмы монитора";
        warningText.style.display = "block";
        setTimeout(() => { warningText.style.display = "none"; }, 5000);
    }
    else if (!/^[a-zA-Zа-яА-Я]+$/.test(inputValue)) {
        warningText.textContent = "Название Фирмы монитора может содержать только буквы";
        warningText.style.display = "block";
        setTimeout(() => { warningText.style.display = "none"; }, 5000);
    } 
    else if(monitorbrands.map(brand => brand.brand_name.toLowerCase()).includes(inputValue.toLowerCase())) {
        warningText.textContent = "Такая Фирма мониторов уже внесена в базу";
        warningText.style.display = "block";
        setTimeout(() => { warningText.style.display = "none"; }, 5000);
    }
    else {
        warningText.style.display = "none";
        await createItem("monitorbrands", input.value);
        input.value = "";
        await UpdateData();
        if (statusInsert){
            await displayMonitorBrands()
        }
        else {
            await displayMonitorBrands()
        }
    }
});

document.getElementById("ComputerNewMonitorModelButton").addEventListener("click", async () => {
    const select = document.getElementById("ComputerNewMonitorModelSelect");
    const selectValue = parseInt(select.value)
    const input = document.getElementById("ComputerNewMonitorModelInput");
    const inputValue = input.value.trim();
    const warningText = document.getElementById("MonitorModelsWarningText");

    if (select.value === "") {
        warningText.textContent = "Пожалуйста, выберите Фирму монитора";
        warningText.style.display = "block";
        setTimeout(() => { warningText.style.display = "none"; }, 5000);
    } 
    else if (inputValue === "") {
        warningText.textContent = "Пожалуйста, введите название Модели монитора";
        warningText.style.display = "block";
        setTimeout(() => { warningText.style.display = "none"; }, 5000);
    }
    else if (inputValue.length > 51) {
        warningText.textContent = "Слишком большое значение названия Модели монитора";
        warningText.style.display = "block";
        setTimeout(() => { warningText.style.display = "none"; }, 5000);
    }
    else if (!/^[a-zA-Zа-яА-Я0-9_-]+$/.test(inputValue)) {
        warningText.textContent = "Название Модели монитора должно содержать буквы, цифры, дефисы и подчеркивания";
        warningText.style.display = "block";
        setTimeout(() => { warningText.style.display = "none"; }, 5000);
    }
    else if(monitormodels.map(model => model.model_name.toLowerCase()).includes(inputValue.toLowerCase())) {
        warningText.textContent = "Такая Модель монитора уже внесена в базу";
        warningText.style.display = "block";
        setTimeout(() => { warningText.style.display = "none"; }, 5000);
    }
    else{
        warningText.style.display = "none";
        await createItem("monitormodels", selectValue, input.value);
        select.value = "";
        input.value = "";
        await UpdateData();
        if (statusInsert){
            await displayMonitorModels()
        }
        else {
            await displayMonitorModels()
        }
    }
});

document.getElementById("ComputerNewDiskCapasityButton").addEventListener("click", async () => {
    const input = document.getElementById("ComputerNewDiskCapasityInput");
    const inputValue = input.value.trim();
    const warningText = document.getElementById("DiskCapasityWarningText");

    if (inputValue === "") {
        warningText.textContent = "Пожалуйста, введите Объем памяти жесткого диска";
        warningText.style.display = "block";
        setTimeout(() => { warningText.style.display = "none"; }, 5000);
    }
    else if (diskscapasity.some(capasity => capasity.capasity_name == inputValue)) {
        warningText.textContent = "Такой Объем памяти уже внесен в базу";
        warningText.style.display = "block";
        setTimeout(() => { warningText.style.display = "none"; }, 5000);
    }
    else {
        warningText.style.display = "none";
        await createItem("diskscapasity", parseInt(input.value));
        input.value = "";
        await UpdateData();
        if (statusInsert){
            await displayDiskCapasity()
        }
        else {
            await displayDiskCapasity()
        }
    }
});

document.getElementById("ComputerNewDiskBrandButton").addEventListener("click", async () => {
    const input = document.getElementById("ComputerNewDiskBrandInput");
    const inputValue = input.value.trim();
    const warningText = document.getElementById("DiskBrandWarningText");

    if (inputValue === "") {
        warningText.textContent = "Пожалуйста, введите название Фирмы диска";
        warningText.style.display = "block";
        setTimeout(() => { warningText.style.display = "none"; }, 5000);
    } 
    else if (inputValue.length > 51) {
        warningText.textContent = "Слишком большое значение названия Фирмы диска";
        warningText.style.display = "block";
        setTimeout(() => { warningText.style.display = "none"; }, 5000);
    }
    else if (!/^[a-zA-Zа-яА-Я]+$/.test(inputValue)) {
        warningText.textContent = "Название Фирмы диска может содержать только буквы";
        warningText.style.display = "block";
        setTimeout(() => { warningText.style.display = "none"; }, 5000);
    } 
    else if(disksbrands.map(brand => brand.brand_name.toLowerCase()).includes(inputValue.toLowerCase())) {
        warningText.textContent = "Такая Фирма диска уже внесена в базу";
        warningText.style.display = "block";
        setTimeout(() => { warningText.style.display = "none"; }, 5000);
    }
    else {
        warningText.style.display = "none";
        await createItem("disksbrands", input.value);
        input.value = "";
        await UpdateData();
        if (statusInsert){
            await displayDiskBrands()
        }
        else {
            await displayDiskBrands()
        }
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
        warningText.textContent = "Пожалуйста, выберите Фирму жесткого диска";
        warningText.style.display = "block";
        setTimeout(() => { warningText.style.display = "none"; }, 5000);
    } 
    else if (inputValue === "") {
        warningText.textContent = "Пожалуйста, введите название Модели жесткого диска";
        warningText.style.display = "block";
        setTimeout(() => { warningText.style.display = "none"; }, 5000);
    }
    else if (inputValue.length > 51) {
        warningText.textContent = "Слишком большое значение названия Модели диска";
        warningText.style.display = "block";
        setTimeout(() => { warningText.style.display = "none"; }, 5000);
    }
    else if (!/^[a-zA-Zа-яА-Я0-9_-\s]+$/.test(inputValue)) {
        warningText.textContent = "Название Модели диска должно содержать буквы, цифры, дефисы, подчеркивания и пробелы";
        warningText.style.display = "block";
        setTimeout(() => { warningText.style.display = "none"; }, 5000);
    }
    else if (selectCapasity.value === "") {
        warningText.textContent = "Пожалуйста, выберите Объем жесткого диска";
        warningText.style.display = "block";
        setTimeout(() => { warningText.style.display = "none"; }, 5000);
    } 
    else if(disksmodels.map(model => model.model_name.toLowerCase()).includes(inputValue.toLowerCase())) {
        warningText.textContent = "Такая Модель диска уже внесена в базу";
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
        if (statusInsert){
            await displayDiskModels()
        }
        else {
            await displayDiskModels()
        }
    }
});

document.getElementById("ComputerNewStationModelsButton").addEventListener("click", async () => {
    const input = document.getElementById("ComputerNewStationModelsInput");
    const inputValue = input.value.trim();
    const warningText = document.getElementById("ComputerStationWarningText");

    if (inputValue === "") {
        warningText.textContent = "Пожалуйста, введите название Модели станции";
        warningText.style.display = "block";
        setTimeout(() => { warningText.style.display = "none"; }, 5000);
    }
    else if (inputValue.length > 51) {
        warningText.textContent = "Слишком большое значение названия Модели станции";
        warningText.style.display = "block";
        setTimeout(() => { warningText.style.display = "none"; }, 5000);
    }
    else if (!/^[a-zA-Zа-яА-Я0-9_-\s]+$/.test(inputValue)) {
        warningText.textContent = "Название Модели станции может содержать буквы, цифры, дефисы, подчеркивания и пробелы";
        warningText.style.display = "block";
        setTimeout(() => { warningText.style.display = "none"; }, 5000);
    }
    else if(stantionsmodels.map(model => model.model_name.toLowerCase()).includes(inputValue.toLowerCase())) {
        warningText.textContent = "Такая Модель станции уже внесена в базу";
        warningText.style.display = "block";
        setTimeout(() => { warningText.style.display = "none"; }, 5000);
    }
    else{
        warningText.style.display = "none";
        await createItem("stantionsmodels", input.value);
        input.value = "";
        await UpdateData();
        if (statusInsert){
            await displayStationModels()
        }
        else {
            await displayStationModels()
        }
    }
});

document.getElementById("ComputerNewOperatingSystemsButton").addEventListener("click", async () => {
    const input = document.getElementById("ComputerNewOperatingSystemsInput");
    const inputValue = input.value.trim();
    const warningText = document.getElementById("ComputerOperatingSystemsWarningText");

    if (inputValue === "") {
        warningText.textContent = "Пожалуйста, введите название Операционной системы ";
        warningText.style.display = "block";
        setTimeout(() => { warningText.style.display = "none"; }, 5000);
    }
    else if (inputValue.length > 51) {
        warningText.textContent = "Слишком большое значение названия Операционной системы";
        warningText.style.display = "block";
        setTimeout(() => { warningText.style.display = "none"; }, 5000);
    }
    else if (!/^[a-zA-Zа-яА-Я0-9_-\s.]+$/.test(inputValue)) {
        warningText.textContent = "Название Операционной системы может содержать буквы, цифры, дефисы, подчеркивания, пробелы и точки";
        warningText.style.display = "block";
        setTimeout(() => { warningText.style.display = "none"; }, 5000);
    }
    else if(os.map(osi => osi.operatingsystem_name.toLowerCase()).includes(inputValue.toLowerCase())) {
        warningText.textContent = "Такая Операционная система уже внесена в базу";
        warningText.style.display = "block";
        setTimeout(() => { warningText.style.display = "none"; }, 5000);
    }
    else{
        warningText.style.display = "none";
        await createItem("operatingsystems", input.value);
        input.value = "";
        await UpdateData();
        if (statusInsert){
            await displayOperatingSystems()
        }
        else {
            await displayOperatingSystems()
        }
    }
});

document.getElementById("ComputerNewProcessorsButton").addEventListener("click", async () => {
    const input = document.getElementById("ComputerNewProcessorsInput");
    const inputValue = input.value.trim();
    const warningText = document.getElementById("ComputerProcessorsWarningText");

    if (inputValue === "") {
        warningText.textContent = "Пожалуйста, введите название Процессора";
        warningText.style.display = "block";
        setTimeout(() => { warningText.style.display = "none"; }, 5000);
    }
    else if (inputValue.length > 51) {
        warningText.textContent = "Слишком большое значение названия Процессора";
        warningText.style.display = "block";
        setTimeout(() => { warningText.style.display = "none"; }, 5000);
    }
    else if (!/^[a-zA-Zа-яА-Я0-9_-\s.®]+$/.test(inputValue)) {
        warningText.textContent = "Название Процессора может содержать буквы, цифры, дефисы, подчеркивания, пробелы, точки";
        warningText.style.display = "block";
        setTimeout(() => { warningText.style.display = "none"; }, 5000);
    }
    else if(processor.map(proc => proc.processor_name.toLowerCase()).includes(inputValue.toLowerCase())) {
        warningText.textContent = "Такой Процессор уже внесен в базу";
        warningText.style.display = "block";
        setTimeout(() => { warningText.style.display = "none"; }, 5000);
    }
    else{
        warningText.style.display = "none";
        await createItem("processors", input.value);
        input.value = "";
        await UpdateData();
        if (statusInsert){
            await displayProcessors()
        }
        else {
            await displayProcessors()
        }
    }
});

document.getElementById("ComputerNewRamButton").addEventListener("click", async () => {
    const input = document.getElementById("ComputerNewRamInput");
    const inputValue = input.value.trim();
    const warningText = document.getElementById("ComputerRamWarningText");

    if (inputValue === "") {
        warningText.textContent = "Пожалуйста, введите Объем оперативной памяти";
        warningText.style.display = "block";
        setTimeout(() => { warningText.style.display = "none"; }, 5000);
    }
    else if (ram.some(ramm => ramm.ram_capacity == inputValue)) {
        warningText.textContent = "Такой Объем оперативной памяти уже внесен в базу";
        warningText.style.display = "block";
        setTimeout(() => { warningText.style.display = "none"; }, 5000);
    }
    else {
        warningText.style.display = "none";
        await createItem("ram", parseInt(input.value));
        input.value = "";
        await UpdateData();
        if (statusInsert){
            await displayRam()
        }
        else {
            await displayRam()
        }
    }
});

document.getElementById("ComputerNewDepartamentButton").addEventListener("click", async () => {
    const input = document.getElementById("ComputerNewDepartamentInput");
    const inputValue = input.value.trim();
    const warningText = document.getElementById("ComputerDepartamentWarningText");

    if (inputValue === "") {
        warningText.textContent = "Пожалуйста, введите название Отдела";
        warningText.style.display = "block";
        setTimeout(() => { warningText.style.display = "none"; }, 5000);
    }
    else if (inputValue.length > 51) {
        warningText.textContent = "Слишком большое значение названия Отдела";
        warningText.style.display = "block";
        setTimeout(() => { warningText.style.display = "none"; }, 5000);
    }
    else if (!/^[a-zA-Zа-яА-Я_\-]+$/.test(inputValue)) {
        warningText.textContent = "Название Отдела может содержать буквы, дефисы и подчеркивания";
        warningText.style.display = "block";
        setTimeout(() => { warningText.style.display = "none"; }, 5000);
    }
    else if(departments.map(dep => dep.department_name.toLowerCase()).includes(inputValue.toLowerCase())) {
        warningText.textContent = "Такой Отдел уже внесен в базу";
        warningText.style.display = "block";
        setTimeout(() => { warningText.style.display = "none"; }, 5000);
    }
    else{
        warningText.style.display = "none";
        await createItem("departments", input.value);
        input.value = "";
        await UpdateData();
        if (statusInsert){
            await displayDepartament()
        }
        else {
            await displayDepartament()
        }
    }
});

document.getElementById("ComputerNewContursButton").addEventListener("click", async () => {
    const input = document.getElementById("ComputerNewContursInput");
    const inputValue = input.value.trim();
    const warningText = document.getElementById("ContursWarningText");

    if (inputValue === "") {
        warningText.textContent = "Пожалуйста, введите название Контура";
        warningText.style.display = "block";
        setTimeout(() => { warningText.style.display = "none"; }, 5000);
    }
    else if (inputValue.length > 26) {
        warningText.textContent = "Слишком большое значение названия Контура";
        warningText.style.display = "block";
        setTimeout(() => { warningText.style.display = "none"; }, 5000);
    }
    else if (!/^[a-zA-Zа-яА-Я0-9\s.]+$/.test(inputValue)) {
        warningText.textContent = "Название Контура может содержать буквы, цифры, точки";
        warningText.style.display = "block";
        setTimeout(() => { warningText.style.display = "none"; }, 5000);
    }
    else if(conturs.map(con => con.contur_name.toLowerCase()).includes(inputValue.toLowerCase())) {
        warningText.textContent = "Такой Контур уже внесен в базу";
        warningText.style.display = "block";
        setTimeout(() => { warningText.style.display = "none"; }, 5000);
    }
    else{
        warningText.style.display = "none";
        await createItem("conturs", input.value);
        input.value = "";
        await UpdateData();
        if (statusInsert){
            await displayConturs()
        }
        else {
            await displayConturs()
        }
    }
});