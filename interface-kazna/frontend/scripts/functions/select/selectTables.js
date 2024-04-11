import { displayAll } from "../../proto.js"

const Computers = document.getElementById("Computers")
const ComputersDates = document.getElementById("ComputerDates")
const ComputerMonitorBrands = document.getElementById("ComputerMonitorBrands")
const ComputerMonitorModels = document.getElementById("ComputerMonitorModels")
const ComputerDiskCapasity = document.getElementById("ComputerDiskCapasity")
const ComputerDiskBrand = document.getElementById("ComputerDiskBrand")
const ComputerDiskModels = document.getElementById("ComputerDiskModels")
const ComputerStationModels = document.getElementById("ComputerStationModels")
const ComputerOperatingSystems = document.getElementById("ComputerOperatingSystems")
const ComputerProcessors = document.getElementById("ComputerProcessors")
const ComputerRam = document.getElementById("ComputerRam")
const ComputerDepartament = document.getElementById("ComputerDepartament")

function Invisible(){
    ComputerMonitorBrands.style.display = "none";
    ComputerMonitorModels.style.display = "none"
    ComputerDiskCapasity.style.display = "none"
    ComputerDiskBrand.style.display = "none"
    ComputerDiskModels.style.display = "none"
    ComputerStationModels.style.display = "none"
    ComputerOperatingSystems.style.display = "none"
    ComputerProcessors.style.display = "none"
    ComputerRam.style.display = "none"
    ComputerDepartament.style.display = "none"
}

Invisible()

let selectList;

async function SelectTables(){
    Computers.style.display = "none";
    ComputersDates.style.display = "block";

    const ComputerCreateDatesBack = document.createElement("div");
    ComputerCreateDatesBack.id = "ComputerCreateDatesBack"
    const ComputerCreateDatesBackText = document.createElement("span");
    ComputerCreateDatesBackText.id = "ComputerCreateDatesBackText"
    ComputerCreateDatesBackText.textContent = "К учету рабочих станций"
    const ComputerCreateDatesBackButton = document.createElement("button");
    ComputerCreateDatesBackButton.id = "ComputerCreateDatesBackButton"
    ComputerCreateDatesBackButton.textContent = "Перейти"
    ComputerCreateDatesBackButton.addEventListener("click", () => {
        Computers.style.display = "block"
        ComputersDates.style.display = "none";
        Invisible()
        ComputerCreateDatesBack.remove()
        ComputerChooseTable.remove()
    })
    ComputerCreateDatesBack.appendChild(ComputerCreateDatesBackText)
    ComputerCreateDatesBack.appendChild(ComputerCreateDatesBackButton)
    ComputersDates.insertBefore(ComputerCreateDatesBack, ComputerMonitorBrands)

    const ComputerChooseTable = document.createElement("div");
    ComputerChooseTable.id = "ComputerChooseTable"
    const ComputerChooseTableText = document.createElement("span");
    ComputerChooseTableText.id = "ComputerChooseTableText"
    ComputerChooseTableText.textContent = "Выберите Таблицу"
    ComputerChooseTable.appendChild(ComputerChooseTableText)
    ComputersDates.insertBefore(ComputerChooseTable, ComputerMonitorBrands)

    if (selectList) {
        selectList.remove();
    }
    
    selectList = document.createElement("select");

    const tables = [
        "...",
        "Фирмы мониторов",
        "Модели мониторов",
        "Объемы жестких дисков",
        "Фирмы жестких дисков",
        "Модели жестких дисков",
        "Модели станций",
        "Операционные системы",
        "Процессоры",
        "Оперативная память",
        "Отделы"
    ];

    tables.forEach(tableName => {
        const option = document.createElement("option");
        option.value = tableName;
        option.textContent = tableName;
        selectList.appendChild(option);
    });

    const computerChooseTable = document.getElementById("ComputerChooseTable");
    computerChooseTable.appendChild(selectList);

    selectList.addEventListener("change", (event) => {
        const selectedValue = event.target.value;

        if (selectedValue === "Фирмы мониторов") {
            Invisible()
            ComputerMonitorBrands.style.display = "block";
            displayAll();
        }
        else if (selectedValue === "Модели мониторов") {
            Invisible()
            ComputerMonitorModels.style.display = "block"
            displayAll()
        }
        else if (selectedValue === "Объемы жестких дисков") {
            Invisible()
            ComputerDiskCapasity.style.display = "block"
            displayAll()
        }
        else if (selectedValue === "Фирмы жестких дисков") {
            Invisible()
            ComputerDiskBrand.style.display = "block"
            displayAll()
        }
        else if (selectedValue === "Модели жестких дисков") {
            Invisible()
            ComputerDiskModels.style.display = "block"
            displayAll()
        }
        else if (selectedValue === "Модели станций") {
            Invisible()
            ComputerStationModels.style.display = "block"
            displayAll()
        }
        else if (selectedValue === "Операционные системы") {
            Invisible()
            ComputerOperatingSystems.style.display = "block"
            displayAll()
        }
        else if (selectedValue === "Процессоры") {
            Invisible()
            ComputerProcessors.style.display = "block"
            displayAll()
        }
        else if (selectedValue === "Оперативная память") {
            Invisible()
            ComputerRam.style.display = "block"
            displayAll()
        }
        else if (selectedValue === "Отделы") {
            Invisible()
            ComputerDepartament.style.display = "block"
            displayAll()
        }
        else{
            Invisible()
        }
    });
}

export default SelectTables