import { getDates } from "../proto.js";
import { createItem } from "../api.js";
import { displayAll } from "../proto.js";
import { selectAll } from "../proto.js";
import { UpdateData } from "../proto.js";
import ViewDates from "./dates/viewDates.js";

const workstation = await getDates("workstation");
const accountingEquipment = await getDates("accountingequipment");

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

async function CreateRow(){
    const tbody = document.getElementById("BodyComputer");

    if (tbody.querySelectorAll("tr.newRow").length === 0) {
        const newRow = document.createElement("tr");
        newRow.classList.add("newRow");

        const rov = document.createElement("td");
        newRow.appendChild(rov);

        const row = document.createElement("td");
        newRow.appendChild(row);

        const rowv = document.createElement("td");
        newRow.appendChild(rowv);

        const createButtonCell = document.createElement("td");
        const createButton = document.createElement("button");
        createButton.textContent = "Создать";
        createButton.id = "ComputerCreate";
        createButtonCell.appendChild(createButton);
        newRow.appendChild(createButtonCell);

        const selectmodel = document.createElement("td");
        const selectModel = document.createElement("select");
        selectModel.id = "selectModel";
        const buttonmodel = document.createElement("button");
        buttonmodel.textContent = "+";
        buttonmodel.id = "buttonmodel";
        buttonmodel.addEventListener("click", () => {
            Computers.style.display = "none"
            ComputersDates.style.display = "block";
            ComputerStationModels.style.display = "block";
            displayAll()

            const RowStationModel = document.createElement("div");
            RowStationModel.id = "RowStationModel"
            const RowStationModelBackText = document.createElement("span");
            RowStationModelBackText.id = "RowStationModelBackText"
            RowStationModelBackText.textContent = "К учету рабочих станций"
            const RowStationModelBackButton = document.createElement("button");
            RowStationModelBackButton.id = "RowStationModelBackButton"
            RowStationModelBackButton.textContent = "Перейти"
            RowStationModelBackButton.addEventListener("click", async () => {
                Computers.style.display = "block"
                ComputersDates.style.display = "none";
                ComputerStationModels.style.display = "none";
                RowStationModel.remove()
                await UpdateData()
                await selectAll()
            })
            RowStationModel.appendChild(RowStationModelBackText);
            RowStationModel.appendChild(RowStationModelBackButton);
            ComputersDates.insertBefore(RowStationModel, ComputerStationModels)
        })
        selectmodel.appendChild(selectModel);
        selectmodel.appendChild(buttonmodel);
        newRow.appendChild(selectmodel);
        
        const inputserialnumber = document.createElement("td");
        const inputSerialNumber = document.createElement("input");
        inputSerialNumber.type = "text";
        inputSerialNumber.placeholder = "Введите значение";
        inputSerialNumber.id = "inputSerialNumber";
        inputserialnumber.appendChild(inputSerialNumber);
        newRow.appendChild(inputserialnumber);

        const inputinventorynumber = document.createElement("td");
        const inputInventoryNumber = document.createElement("input");
        inputInventoryNumber.type = "number";
        inputInventoryNumber.placeholder = "Введите значение";
        inputInventoryNumber.id = "inputInventoryNumber";
        inputinventorynumber.appendChild(inputInventoryNumber);
        newRow.appendChild(inputinventorynumber);

        const selectdepartament = document.createElement("td");
        const selectDepartament = document.createElement("select");
        selectDepartament.id = "selectDepartament";
        const buttondepartament = document.createElement("button");
        buttondepartament.textContent = "+";
        buttondepartament.id = "buttondepartament";
        buttondepartament.addEventListener("click", () => {
            Computers.style.display = "none"
            ComputersDates.style.display = "block";
            ComputerDepartament.style.display = "block";
            displayAll()

            const RowDepartaments = document.createElement("div");
            RowDepartaments.id = "RowDepartaments"
            const RowDepartamentsBackText = document.createElement("span");
            RowDepartamentsBackText.id = "RowDepartamentsBackText"
            RowDepartamentsBackText.textContent = "К учету рабочих станций"
            const RowDepartamentsBackButton = document.createElement("button");
            RowDepartamentsBackButton.id = "RowDepartamentsBackButton"
            RowDepartamentsBackButton.textContent = "Перейти"
            RowDepartamentsBackButton.addEventListener("click", async () => {
                Computers.style.display = "block"
                ComputersDates.style.display = "none";
                ComputerDepartament.style.display = "none";
                RowDepartaments.remove()
                await UpdateData()
                await selectAll()
            })
            RowDepartaments.appendChild(RowDepartamentsBackText);
            RowDepartaments.appendChild(RowDepartamentsBackButton);
            ComputersDates.insertBefore(RowDepartaments, ComputerDepartament)
        })
        selectdepartament.appendChild(selectDepartament);
        selectdepartament.appendChild(buttondepartament);
        newRow.appendChild(selectdepartament);

        for (let i = 1; i < 3; i++) {
            const td = document.createElement("td");
            const input = document.createElement("input");
            input.type = "text";
            input.placeholder = "Введите значение";
            input.id = "ComputerDatesInputs" + i;
            td.appendChild(input);
            newRow.appendChild(td);
        }

        const status = document.createElement("td");
        const Status = document.createElement("select");
        Status.id = "Status"
        const option1 = document.createElement("option");
        option1.textContent = "Выберите статус";
        option1.value = ""
        const option2 = document.createElement("option");
        option2.textContent = "используется";
        option2.value = "true"
        const option3 = document.createElement("option");
        option3.textContent = "не используется";
        option3.value = "false"
        Status.appendChild(option1);
        Status.appendChild(option2);
        Status.appendChild(option3);
        status.appendChild(Status);
        newRow.appendChild(status);

        for (let i = 3; i < 7; i++) {
            const td = document.createElement("td");
            const input = document.createElement("input");
            input.type = "text";
            input.placeholder = "Введите значение";
            input.id = "ComputerDatesInputs" + i;
            td.appendChild(input);
            newRow.appendChild(td);
        }

        const selectoc = document.createElement("td");
        const selectOC = document.createElement("select");
        selectOC.id = "selectOC";
        const buttoOc = document.createElement("button");
        buttoOc.textContent = "+";
        buttoOc.id = "buttoOc";
        buttoOc.addEventListener("click", () => {
            Computers.style.display = "none"
            ComputersDates.style.display = "block";
            ComputerOperatingSystems.style.display = "block";
            displayAll()

            const RowOperatingSystems = document.createElement("div");
            RowOperatingSystems.id = "RowOperatingSystems"
            const RowOperatingSystemsBackText = document.createElement("span");
            RowOperatingSystemsBackText.id = "RowOperatingSystemsBackText"
            RowOperatingSystemsBackText.textContent = "К учету рабочих станций"
            const RowOperatingSystemsBackButton = document.createElement("button");
            RowOperatingSystemsBackButton.id = "RowOperatingSystemsBackButton"
            RowOperatingSystemsBackButton.textContent = "Перейти"
            RowOperatingSystemsBackButton.addEventListener("click", async () => {
                Computers.style.display = "block"
                ComputersDates.style.display = "none";
                ComputerOperatingSystems.style.display = "none";
                RowOperatingSystems.remove()
                await UpdateData()
                await selectAll()
            })
            RowOperatingSystems.appendChild(RowOperatingSystemsBackText);
            RowOperatingSystems.appendChild(RowOperatingSystemsBackButton);
            ComputersDates.insertBefore(RowOperatingSystems, ComputerOperatingSystems)
        })
        selectoc.appendChild(selectOC);
        selectoc.appendChild(buttoOc);
        newRow.appendChild(selectoc);

        const selectmonitor = document.createElement("td");
        const selectMonitor = document.createElement("select");
        selectMonitor.id = "selectMonitor";
        const buttomonitor = document.createElement("button");
        buttomonitor.textContent = "+";
        buttomonitor.id = "buttomonitor";
        buttomonitor.addEventListener("click", () => {
            Computers.style.display = "none"
            ComputersDates.style.display = "block";
            ComputerMonitorModels.style.display = "block";
            displayAll()

            const RowMonitorModels = document.createElement("div");
            RowMonitorModels.id = "RowMonitorModels"
            const RowMonitorModelsBackText = document.createElement("span");
            RowMonitorModelsBackText.id = "RowMonitorModelsBackText"
            RowMonitorModelsBackText.textContent = "К учету рабочих станций"
            const RowMonitorModelsBackButton = document.createElement("button");
            RowMonitorModelsBackButton.id = "RowMonitorModelsBackButton"
            RowMonitorModelsBackButton.textContent = "Перейти"
            RowMonitorModelsBackButton.addEventListener("click", async () => {
                Computers.style.display = "block"
                ComputersDates.style.display = "none";
                ComputerMonitorModels.style.display = "none";
                RowMonitorModels.remove()
                RowGoMonitorBrands.remove()
                await UpdateData()
                await selectAll()
            })
            RowMonitorModels.appendChild(RowMonitorModelsBackText);
            RowMonitorModels.appendChild(RowMonitorModelsBackButton);
            ComputersDates.insertBefore(RowMonitorModels, ComputerMonitorModels)
            
            const RowGoMonitorBrands = document.createElement("div");
            RowGoMonitorBrands.id = "RowGoMonitorBrands"
            const RowGoMonitorBrandsText = document.createElement("span");
            RowGoMonitorBrandsText.id = "RowMonitorBrandsBackText"
            RowGoMonitorBrandsText.textContent = "Добавить фирму монитора"
            const RowGoMonitorBrandsButton = document.createElement("button");
            RowGoMonitorBrandsButton.id = "RowGoMonitorBrandsButton"
            RowGoMonitorBrandsButton.textContent = "Перейти"
            RowGoMonitorBrandsButton.addEventListener("click", () => {
                RowMonitorModels.style.display = "none";
                RowGoMonitorBrands.style.display = "none";
                ComputerMonitorModels.style.display = "none";
                ComputerMonitorBrands.style.display = "block";

                const RowMonitorBrands = document.createElement("div");
                RowMonitorBrands.id = "RowMonitorBrands"
                const RowMonitorBrandsText = document.createElement("span");
                RowMonitorBrandsText.id = "RowMonitorBrandsText"
                RowMonitorBrandsText.textContent = "К добавлению модели монитора"
                const RowMonitorBrandsButton = document.createElement("button");
                RowMonitorBrandsButton.id = "RowMonitorBrandsButton"
                RowMonitorBrandsButton.textContent = "Перейти"
                RowMonitorBrandsButton.addEventListener("click", async () => {
                    RowMonitorModels.style.display = "flex";
                    RowGoMonitorBrands.style.display = "flex";
                    ComputerMonitorModels.style.display = "block";
                    ComputerMonitorBrands.style.display = "none";
                    RowMonitorBrands.style.display = "none";
                    await UpdateData()
                    await selectAll()
                })
                RowMonitorBrands.appendChild(RowMonitorBrandsText);
                RowMonitorBrands.appendChild(RowMonitorBrandsButton);
                ComputersDates.insertBefore(RowMonitorBrands, ComputerMonitorBrands)
            })
            RowGoMonitorBrands.appendChild(RowGoMonitorBrandsText);
            RowGoMonitorBrands.appendChild(RowGoMonitorBrandsButton);
            ComputersDates.insertBefore(RowGoMonitorBrands, ComputerMonitorModels)

        })
        selectmonitor.appendChild(selectMonitor);
        selectmonitor.appendChild(buttomonitor);
        newRow.appendChild(selectmonitor);

        const inputmonitornumber = document.createElement("td");
        const inputMonitorNumber = document.createElement("input");
        inputMonitorNumber.type = "text";
        inputMonitorNumber.placeholder = "Введите значение";
        inputMonitorNumber.id = "inputMonitorNumber";
        inputmonitornumber.appendChild(inputMonitorNumber);
        newRow.appendChild(inputmonitornumber);

        for (let i = 1; i < 4; i++) {
            const td = document.createElement("td");
            const select = document.createElement("select");
            select.id = "ComputerSelectDates" + i;
            const buttonAdd = document.createElement("button");
            buttonAdd.textContent = "+";
            buttonAdd.id = "AddButton" + i;
            td.appendChild(select);
            td.appendChild(buttonAdd);
            newRow.appendChild(td);
        }

        const CreateProcessorTable = newRow.querySelector("#AddButton1")
        CreateProcessorTable.addEventListener("click", async () => {
            Computers.style.display = "none"
            ComputersDates.style.display = "block";
            ComputerProcessors.style.display = "block";
            displayAll()

            const RowProcessor = document.createElement("div");
            RowProcessor.id = "RowProcessor"
            const RowProcessorBackText = document.createElement("span");
            RowProcessorBackText.id = "RowProcessorBackText"
            RowProcessorBackText.textContent = "К учету рабочих станций"
            const RowProcessorBackButton = document.createElement("button");
            RowProcessorBackButton.id = "RowProcessorBackButton"
            RowProcessorBackButton.textContent = "Перейти"
            RowProcessorBackButton.addEventListener("click", async () => {
                Computers.style.display = "block"
                ComputersDates.style.display = "none";
                ComputerProcessors.style.display = "none";
                RowProcessor.remove()
                await UpdateData()
                await selectAll()
            })
            RowProcessor.appendChild(RowProcessorBackText);
            RowProcessor.appendChild(RowProcessorBackButton);
            ComputersDates.insertBefore(RowProcessor, ComputerProcessors)
        })

        const CreateRamTable = newRow.querySelector("#AddButton2")
        CreateRamTable.addEventListener("click", async () => {
            Computers.style.display = "none"
            ComputersDates.style.display = "block";
            ComputerRam.style.display = "block";
            displayAll()

            const RowRam = document.createElement("div");
            RowRam.id = "RowRam"
            const RowRamBackText = document.createElement("span");
            RowRamBackText.id = "RowRamBackText"
            RowRamBackText.textContent = "К учету рабочих станций"
            const RowRamBackButton = document.createElement("button");
            RowRamBackButton.id = "RowRamBackButton"
            RowRamBackButton.textContent = "Перейти"
            RowRamBackButton.addEventListener("click", async () => {
                Computers.style.display = "block"
                ComputersDates.style.display = "none";
                ComputerRam.style.display = "none";
                RowRam.remove()
                await UpdateData()
                await selectAll()
            })
            RowRam.appendChild(RowRamBackText);
            RowRam.appendChild(RowRamBackButton);
            ComputersDates.insertBefore(RowRam, ComputerRam)
        })

        const CreateDiskTable = newRow.querySelector("#AddButton3")
        CreateDiskTable.addEventListener("click", async () => {
            Computers.style.display = "none"
            ComputersDates.style.display = "block";
            ComputerDiskModels.style.display = "block";
            displayAll()

            const RowDiskModels = document.createElement("div");
            RowDiskModels.id = "RowDiskModels"
            const RowDiskModelsBackText = document.createElement("span");
            RowDiskModelsBackText.id = "RowDiskModelsBackText"
            RowDiskModelsBackText.textContent = "К учету рабочих станций"
            const RowDiskModelsBackButton = document.createElement("button");
            RowDiskModelsBackButton.id = "RowDiskModelsBackButton"
            RowDiskModelsBackButton.textContent = "Перейти"
            RowDiskModelsBackButton.addEventListener("click", async () => {
                Computers.style.display = "block"
                ComputersDates.style.display = "none";
                ComputerDiskModels.style.display = "none";
                RowDiskModels.remove()
                RowGoDiskBrands.remove()
                RowGoDiskCapasity.remove()
                await UpdateData()
                await selectAll()
            })
            RowDiskModels.appendChild(RowDiskModelsBackText);
            RowDiskModels.appendChild(RowDiskModelsBackButton);
            ComputersDates.insertBefore(RowDiskModels, ComputerDiskModels)
            
            const RowGoDiskBrands = document.createElement("div");
            RowGoDiskBrands.id = "RowGoDiskBrands"
            const RowGoDiskBrandsText = document.createElement("span");
            RowGoDiskBrandsText.id = "RowGoDiskBrandsText"
            RowGoDiskBrandsText.textContent = "Добавить фирму диска"
            const RowGoDiskBrandsButton = document.createElement("button");
            RowGoDiskBrandsButton.id = "RowGoDiskBrandsButton"
            RowGoDiskBrandsButton.textContent = "Перейти"
            RowGoDiskBrandsButton.addEventListener("click", () => {
                RowDiskModels.style.display = "none";
                RowGoDiskBrands.style.display = "none";
                RowGoDiskCapasity.style.display = "none";
                ComputerDiskModels.style.display = "none";
                ComputerDiskBrand.style.display = "block";

                const RowDiskBrands = document.createElement("div");
                RowDiskBrands.id = "RowDiskBrands"
                const RowDiskBrandsText = document.createElement("span");
                RowDiskBrandsText.id = "RowDiskBrandsText"
                RowDiskBrandsText.textContent = "К добавлению модели диска"
                const RowDiskBrandsButton = document.createElement("button");
                RowDiskBrandsButton.id = "RowDiskBrandsButton"
                RowDiskBrandsButton.textContent = "Перейти"
                RowDiskBrandsButton.addEventListener("click", async () => {
                    RowDiskModels.style.display = "flex";
                    RowGoDiskBrands.style.display = "flex";
                    RowGoDiskCapasity.style.display = "flex";
                    ComputerDiskModels.style.display = "block";
                    ComputerDiskBrand.style.display = "none";
                    RowDiskBrands.style.display = "none";
                    await UpdateData()
                    await selectAll()
                })

                RowDiskBrands.appendChild(RowDiskBrandsText);
                RowDiskBrands.appendChild(RowDiskBrandsButton);
                ComputersDates.insertBefore(RowDiskBrands, ComputerDiskBrand)
            })

            RowGoDiskBrands.appendChild(RowGoDiskBrandsText);
            RowGoDiskBrands.appendChild(RowGoDiskBrandsButton);
            ComputersDates.insertBefore(RowGoDiskBrands, ComputerDiskModels)

            const RowGoDiskCapasity = document.createElement("div");
            RowGoDiskCapasity.id = "RowGoDiskCapasity"
            const RowGoDiskCapasityText = document.createElement("span");
            RowGoDiskCapasityText.id = "RowGoDiskCapasityText"
            RowGoDiskCapasityText.textContent = "Добавить объем диска"
            const RowGoDiskCapasityButton = document.createElement("button");
            RowGoDiskCapasityButton.id = "RowGoDiskCapasityButton"
            RowGoDiskCapasityButton.textContent = "Перейти"
            RowGoDiskCapasityButton.addEventListener("click", () => {
                RowDiskModels.style.display = "none";
                RowGoDiskCapasity.style.display = "none";
                RowGoDiskBrands.style.display = "none";
                ComputerDiskModels.style.display = "none";
                ComputerDiskCapasity.style.display = "block";

                const RowDiskCapasity = document.createElement("div");
                RowDiskCapasity.id = "RowDiskCapasity"
                const RowDiskCapasityText = document.createElement("span");
                RowDiskCapasityText.id = "RowDiskCapasityText"
                RowDiskCapasityText.textContent = "К добавлению модели диска"
                const RowDiskCapasityButton = document.createElement("button");
                RowDiskCapasityButton.id = "RowDiskCapasityButton"
                RowDiskCapasityButton.textContent = "Перейти"
                RowDiskCapasityButton.addEventListener("click", async () => {
                    RowDiskModels.style.display = "flex";
                    RowGoDiskCapasity.style.display = "flex";
                    RowGoDiskBrands.style.display = "flex";
                    ComputerDiskModels.style.display = "block";
                    ComputerDiskCapasity.style.display = "none";
                    RowDiskCapasity.style.display = "none";
                    await UpdateData()
                    await selectAll()
                })

                RowDiskCapasity.appendChild(RowDiskCapasityText);
                RowDiskCapasity.appendChild(RowDiskCapasityButton);
                ComputersDates.insertBefore(RowDiskCapasity, ComputerDiskCapasity)
            })

            RowGoDiskCapasity.appendChild(RowGoDiskCapasityText);
            RowGoDiskCapasity.appendChild(RowGoDiskCapasityButton);
            ComputersDates.insertBefore(RowGoDiskCapasity, ComputerDiskModels)

        })

        const diskCapasity = document.createElement("td");
        diskCapasity.id = "diskCapasity"
        newRow.appendChild(diskCapasity);

        const inputdisknumber = document.createElement("td");
        const inputDiskNumber = document.createElement("input");
        inputDiskNumber.type = "text";
        inputDiskNumber.placeholder = "Введите значение";
        inputDiskNumber.id = "inputDiskNumber";
        inputdisknumber.appendChild(inputDiskNumber);
        newRow.appendChild(inputdisknumber);

        const firstRow = tbody.querySelector("tr");
        tbody.insertBefore(newRow, firstRow);

        selectAll()

        document.getElementById("ComputerCreate").addEventListener("click", async () => {
            const selectModel = document.getElementById("selectModel");
            const inputSerialNumber = document.getElementById("inputSerialNumber");
            const inputInventoryNumber = document.getElementById("inputInventoryNumber");
            const selectDepartament = document.getElementById("selectDepartament");
            const inputCabinet = document.getElementById("ComputerDatesInputs1");
            const inputStationName = document.getElementById("ComputerDatesInputs2");
            const Status = document.getElementById("Status");
            const inputContur = document.getElementById("ComputerDatesInputs3");
            const inputIP = document.getElementById("ComputerDatesInputs4");
            const inputMACadress = document.getElementById("ComputerDatesInputs5");
            const inputSoble = document.getElementById("ComputerDatesInputs6");
            const selectOC = document.getElementById("selectOC");
            const selectMonitor = document.getElementById("selectMonitor");
            const inputMonitorNumber = document.getElementById("inputMonitorNumber");
            const selectProcessor = document.getElementById("ComputerSelectDates1");
            const selectRam = document.getElementById("ComputerSelectDates2");
            const selectDisk = document.getElementById("ComputerSelectDates3");
            const inputDiskNumber = document.getElementById("inputDiskNumber");

            const correspondingMonitorNumber = workstation.find(work => work.monitor_serial_number === inputMonitorNumber.value);
            const correspondingDiskNumber = workstation.find(work => work.disk_serial_number === inputDiskNumber.value);
            const correspondingStationNumber = workstation.find(work => work.serial_number === inputSerialNumber.value);
            const correspondingInventoryNumber = accountingEquipment.find(acc => acc.inventory_number === inputInventoryNumber.value);

            if (selectModel.value.trim() === "") {
                alert("Пожалуйста, выберите модель");
                return;
            }
            if (inputSerialNumber.value.trim() === "") {
                alert("Пожалуйста, введите серийный номер рабочей станции");
                return;
            }
            if (inputSerialNumber.value.length > 51) {
                alert("Слишком большое значение Серийного номера Станции");
                return;
            }
            if (correspondingStationNumber) {
                alert("Рабочая станция с таким Серийным номером уже зарегистрирован");
                return;
            }
            if (inputInventoryNumber.value.length >= 20) {
                alert("Слишком большое значение Инвентарного номера Станции");
                return;
            }
            if (correspondingInventoryNumber) {
                alert("Этот инвентарный номер уже используется");
                return;
            }
            if (selectDepartament.value.trim() === "") {
                alert("Пожалуйста, выберите отдел");
                return;
            }
            if (inputCabinet.value.length > 11) {
                alert("Слишком большое значение Кабинета");
                return;
            }
            if (inputStationName.value.length > 26) {
                alert("Слишком большое значение Имени станции");
                return;
            }
            if (Status.value.trim() === "") {
                alert("Пожалуйста, выберите статус");
                return;
            }
            if (inputContur.value.length > 26) {
                alert("Слишком большое значение Контура станции");
                return;
            }
            if (inputIP.value.length > 26) {
                alert("Слишком большое значение IP станции");
                return;
            }
            if (inputMACadress.value.length > 26) {
                alert("Слишком большое значение MAC-адреса станции");
                return;
            }
            if (inputSoble.value.length > 26) {
                alert("Слишком большое значение Соболя станции");
                return;
            }
            if (correspondingMonitorNumber) {
                alert("Монитор с таким серийным номером уже зарегистрирован");
                return;
            }
            if (correspondingDiskNumber) {
                alert("Диск с таким серийным номером уже зарегистрирован");
                return;
            }
            if (selectModel.value.trim() !== "" && inputSerialNumber.value.trim() !== ""  && Status.value.trim() !== "") {
                let statusWork = false
                let statusReload = false
                let InventValue = 0
            
                await createItem("workstation", 
                    parseInt(selectModel.value),
                    inputSerialNumber.value, 
                    inputStationName.value, 
                    Status.value, 
                    inputContur.value, 
                    inputIP.value, 
                    inputMACadress.value, 
                    inputSoble.value, 
                    parseInt(selectOC.value),
                    parseInt(selectMonitor.value),
                    inputMonitorNumber.value, 
                    parseInt(selectProcessor.value),
                    parseInt(selectRam.value),
                    parseInt(selectDisk.value),
                    inputDiskNumber.value
                );

                const newworkstation = await getDates("workstation");
                statusWork = true;

                if (inputInventoryNumber.value.trim() !== "") {
                    InventValue = inputInventoryNumber.value
                }

                const lastWorkstationId = Math.max(...newworkstation.map(work => work.station_id));

                if(statusWork){
                    await createItem("accountingequipment", parseInt(lastWorkstationId), InventValue, parseInt(selectDepartament.value), inputCabinet.value)
                    await UpdateData()
                    statusReload = true;
                }
    
                if(statusReload){
                    const newRow = tbody.querySelector("tr.newRow");
                    newRow.remove();
                    ViewDates()
                }
            }
        })
    }
    else {
        const newRow = tbody.querySelector("tr.newRow");
        newRow.remove();
    }
}

export default CreateRow