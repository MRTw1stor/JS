import { getDates } from "../proto.js";
import { updateInventoryNumber, updateDepartamentAndCabinet, updateStationStatus, updateWorkStationTechnik, updateWorkstationFisical } from "../api.js";
import { UpdateData } from "../proto.js";
import ViewDates from "./dates/viewDates.js";

const originalCellContent = {};
let currentEditingRowId = null;
let isCurrentlyEditing = false;

async function ChangeRow(rowId) {
    const row = document.getElementById("station_row_" + rowId);

    let accountingEquipment = await getDates("accountingequipment");
    let departments = await getDates("departments");
    let conturs = await getDates("conturs");
    let os = await getDates("operatingsystems");
    let monitorbrands = await getDates("monitorbrands");
    let monitormodels = await getDates("monitormodels")
    let processor = await getDates("processors");
    let ram = await getDates("ram");
    let disksbrands = await getDates("disksbrands");
    let diskscapasity = await getDates("diskscapasity");
    let disksmodels = await getDates("disksmodels");

    if (row) {
        if (rowId !== currentEditingRowId) {

            const existingInventoryNumbers = accountingEquipment.map(equipment => equipment.inventory_number);

            let newInventoryNumberValue = 0;
            let inventoryNumberStatus = false
            let newDepartamentValue = 0
            let departamentStatus = false
            let newCabinetValue = "cab"
            let cabinetStatus = false

            let statusStatus = false
            let newStatusValue = ""
            let StationNameStatus = false
            let newStationNameValue = ""
            let ConturStatus = false
            let newConturValue = 0
            let IPStatus = false
            let newIPValue = ""
            let MACStatus = false
            let newMACValue = ""
            let SobleStatus = false
            let newSobleValue = ""
            let OSStatus = false
            let newOSValue = 0
            let ProcessorStatus = false
            let newProcessorValue = 0
            let RamStatus = false
            let newRamValue = 0
            let MonitorStatus = false
            let newMonitorValue = 0
            let MonitorNumberStatus = false
            let newMonitorNumberValue = "monitor"
            let DiskStatus = false
            let newDiskValue = 0
            let DiskNumberStatus = false
            let newDiskNumberValue = "disk"


            if (isCurrentlyEditing) {
                return;
            }
            if (currentEditingRowId && originalCellContent[currentEditingRowId]) {
                const prevRow = document.getElementById("station_row_" + currentEditingRowId);
                Array.from(prevRow.children).slice(3).forEach((cell, index) => {
                    cell.textContent = originalCellContent[currentEditingRowId][index];
                });
                originalCellContent[currentEditingRowId] = {};
            }

            currentEditingRowId = rowId;
            isCurrentlyEditing = true;

            if (!originalCellContent[rowId] || Object.keys(originalCellContent[rowId]).length === 0) {
                originalCellContent[rowId] = {};
                Array.from(row.children).slice(3).forEach((cell, index) => {
                    originalCellContent[rowId][index] = cell.textContent;
                    if (index === 1 || index === 2) {}
                    else if (index === 0) {

                        const saveButton = document.createElement('button');
                        saveButton.textContent = 'Сохранить';
                        saveButton.id = "saveChangeButton"
                        cell.textContent = '';
                        cell.appendChild(saveButton);
                    }
                    else if (index === 3) {
                        const changeInputInventoryNumber = document.createElement("input");
                        changeInputInventoryNumber.type = "number";
                        changeInputInventoryNumber.id = "changeInputInventoryNumber"
                        changeInputInventoryNumber.value = cell.textContent.trim();

                        cell.textContent = "";
                        cell.appendChild(changeInputInventoryNumber);

                        changeInputInventoryNumber.addEventListener('change', function(e) {
                            newInventoryNumberValue = e.target.value;
                            inventoryNumberStatus = true
                            return newInventoryNumberValue, inventoryNumberStatus;
                        });
                    }
                    else if (index === 4) {
                        const selectChangeDepartament = document.createElement("select");
                        selectChangeDepartament.id = "selectChangeDepartament";

                        const emptyOption = document.createElement("option");
                        emptyOption.value = 0;
                        emptyOption.text = "...";
                        selectChangeDepartament.appendChild(emptyOption);

                        departments.forEach((dep) => {
                            const option = document.createElement("option");
                            option.value = dep.department_id;
                            option.text = dep.department_name;
                            selectChangeDepartament.appendChild(option);

                            if (dep.department_name.trim() === cell.textContent.trim()) {
                                option.selected = true;
                            }
                        });
                            
                        cell.textContent = "";
                        cell.appendChild(selectChangeDepartament);

                        selectChangeDepartament.addEventListener('change', function(e) {
                            newDepartamentValue = e.target.value;
                            departamentStatus = true
                            return newDepartamentValue, departamentStatus;
                        });
                    }
                    else if (index === 5) {
                        const changeInputCabinet = document.createElement("input");
                        changeInputCabinet.type = "text";
                        changeInputCabinet.id = "changeInputCabinet"
                        changeInputCabinet.value = cell.textContent.trim();

                        cell.textContent = "";
                        cell.appendChild(changeInputCabinet);

                        changeInputCabinet.addEventListener('change', function(e) {
                            newCabinetValue = e.target.value;
                            cabinetStatus = true
                            return newCabinetValue, cabinetStatus;
                        });
                    }
                    else if (index === 6) {
                        const changeInputStationName = document.createElement("input");
                        changeInputStationName.type = "text";
                        changeInputStationName.id = "changeInputStationName"
                        changeInputStationName.value = cell.textContent.trim();

                        cell.textContent = "";
                        cell.appendChild(changeInputStationName);

                        changeInputStationName.addEventListener('change', function(e) {
                            newStationNameValue = e.target.value;
                            StationNameStatus = true
                            return newStationNameValue, StationNameStatus;
                        });
                    }
                    else if (index === 7) {
                        const selectChangeStatus = document.createElement("select");
                        selectChangeStatus.id = "selectChangeStatus";

                        const usedOption = document.createElement("option");
                        usedOption.value = "используется";
                        usedOption.text = "используется";
                        selectChangeStatus.appendChild(usedOption);

                        const notUsedOption = document.createElement("option");
                        notUsedOption.value = "не используется";
                        notUsedOption.text = "не используется";
                        selectChangeStatus.appendChild(notUsedOption);

                        if (cell.textContent.trim() === "используется" || cell.textContent.trim() === "не используется") {
                            selectChangeStatus.value = cell.textContent.trim();
                        }

                        cell.textContent = "";
                        cell.appendChild(selectChangeStatus);

                        selectChangeStatus.addEventListener('change', function(e) {
                            newStatusValue = e.target.value;
                            statusStatus = true
                            return statusStatus , newStatusValue;
                        });
                    }
                    else if (index === 8) {
                        const selectChangeContur = document.createElement("select");
                        selectChangeContur.id = "selectChangeContur";

                        const emptyOption = document.createElement("option");
                        emptyOption.value = 0;
                        emptyOption.text = "...";
                        selectChangeContur.appendChild(emptyOption);

                        conturs.forEach((con) => {
                            const option = document.createElement("option");
                            option.value = con.contur_id;
                            option.text = con.contur_name;
                            selectChangeContur.appendChild(option);

                            if (con.contur_name.trim() === cell.textContent.trim()) {
                                option.selected = true;
                            }
                        });

                        cell.textContent = "";
                        cell.appendChild(selectChangeContur); 

                        selectChangeContur.addEventListener('change', function(e) {
                            newConturValue = e.target.value;
                            ConturStatus = true
                            return newConturValue, ConturStatus;
                        });
                    }
                    else if (index === 9) {
                        const changeInputStationIP = document.createElement("input");
                        changeInputStationIP.type = "text";
                        changeInputStationIP.id = "changeInputStationIP"
                        changeInputStationIP.value = cell.textContent.trim();

                        cell.textContent = "";
                        cell.appendChild(changeInputStationIP);

                        changeInputStationIP.addEventListener('change', function(e) {
                            newIPValue = e.target.value;
                            IPStatus = true
                            return newIPValue, IPStatus;
                        });
                    }
                    else if (index === 10) {
                        const changeInputStationMAC = document.createElement("input");
                        changeInputStationMAC.type = "text";
                        changeInputStationMAC.id = "changeInputStationMAC"
                        changeInputStationMAC.value = cell.textContent.trim();

                        cell.textContent = "";
                        cell.appendChild(changeInputStationMAC);

                        changeInputStationMAC.addEventListener('change', function(e) {
                            newMACValue = e.target.value;
                            MACStatus = true
                            return newMACValue, MACStatus;
                        });
                    }
                    else if (index === 11) {
                        const changeInputStationSoble = document.createElement("input");
                        changeInputStationSoble.type = "text";
                        changeInputStationSoble.id = "changeInputStationSoble"
                        changeInputStationSoble.value = cell.textContent.trim();

                        cell.textContent = "";
                        cell.appendChild(changeInputStationSoble);

                        changeInputStationSoble.addEventListener('change', function(e) {
                            newSobleValue = e.target.value;
                            SobleStatus = true
                            return newSobleValue, SobleStatus;
                        });
                    }
                    else if (index === 12) {
                        const selectChangeOC = document.createElement("select");
                        selectChangeOC.id = "selectChangeOC";

                        const emptyOption = document.createElement("option");
                        emptyOption.value = 0;
                        emptyOption.text = "...";
                        selectChangeOC.appendChild(emptyOption);

                        os.forEach((osi) => {
                            const option = document.createElement("option");
                            option.value = osi.operatingsystem_id;
                            option.text = osi.operatingsystem_name;
                            selectChangeOC.appendChild(option);

                            if (osi.operatingsystem_name.trim() === cell.textContent.trim()) {
                                option.selected = true;
                            }
                        });

                        cell.textContent = "";
                        cell.appendChild(selectChangeOC);

                        selectChangeOC.addEventListener('change', function(e) {
                            newOSValue = e.target.value;
                            OSStatus = true
                            return newOSValue, OSStatus;
                        });
                    }
                    else if (index === 13) {
                        const selectChangeMonitor = document.createElement("select");
                        selectChangeMonitor.id = "selectChangeMonitor";
                    
                        const emptyOption = document.createElement("option");
                        emptyOption.value = 0;
                        emptyOption.text = "...";
                        selectChangeMonitor.appendChild(emptyOption);
                    
                        monitormodels.forEach((model) => {
                            const brand = monitorbrands.find(brand => brand.brand_id === model.brand_id);
                            if (brand) {
                                const option = document.createElement("option");
                                option.value = model.model_id;
                                option.text = `${brand.brand_name} ${model.model_name}`;
                                selectChangeMonitor.appendChild(option);
                    
                                if (cell.textContent.trim() === `${brand.brand_name} ${model.model_name}`) {
                                    option.selected = true;
                                }
                            }
                        });

                        cell.textContent = "";
                        cell.appendChild(selectChangeMonitor);

                        selectChangeMonitor.addEventListener('change', function(e) {
                            newMonitorValue = e.target.value;
                            MonitorStatus = true
                            return newMonitorValue, MonitorStatus;
                        });
                    }
                    else if (index === 14) {
                        const changeInputMonitorNumber = document.createElement("input");
                        changeInputMonitorNumber.type = "text";
                        changeInputMonitorNumber.id = "changeInputMonitorNumber"
                        changeInputMonitorNumber.value = cell.textContent.trim();

                        cell.textContent = "";
                        cell.appendChild(changeInputMonitorNumber);

                        changeInputMonitorNumber.addEventListener('change', function(e) {
                            newMonitorNumberValue = e.target.value;
                            MonitorNumberStatus = true
                            return newMonitorNumberValue, MonitorNumberStatus;
                        });
                    }
                    else if (index === 15) {
                        const selectChangeProcessor = document.createElement("select");
                        selectChangeProcessor.id = "selectChangeProcessor";
                    
                        const emptyOption = document.createElement("option");
                        emptyOption.value = 0;
                        emptyOption.text = "...";
                        selectChangeProcessor.appendChild(emptyOption);
                    
                        processor.forEach((proc) => {
                            const option = document.createElement("option");
                            option.value = proc.processor_id;
                            option.text = proc.processor_name;
                            selectChangeProcessor.appendChild(option);

                            if (proc.processor_name.trim() === cell.textContent.trim()) {
                                option.selected = true;
                            }
                        });

                        cell.textContent = "";
                        cell.appendChild(selectChangeProcessor);

                        selectChangeProcessor.addEventListener('change', function(e) {
                            newProcessorValue = e.target.value;
                            ProcessorStatus = true
                            return newProcessorValue, ProcessorStatus;
                        });
                    }
                    else if (index === 16) {
                        const selectChangeRam = document.createElement("select");
                        selectChangeRam.id = "selectChangeRam";
                    
                        const emptyOption = document.createElement("option");
                        emptyOption.value = 0;
                        emptyOption.text = "...";
                        selectChangeRam.appendChild(emptyOption);
                    
                        ram.forEach((ramm) => {
                            const option = document.createElement("option");
                            option.value = ramm.ram_id;
                            option.text = ramm.ram_capacity;
                            selectChangeRam.appendChild(option);

                            const cellCapacity = parseInt(cell.textContent.trim().replace(" MB", ""));
                            if (ramm.ram_capacity === cellCapacity) {
                                option.selected = true;
                            }
                        });

                        cell.textContent = "";
                        cell.appendChild(selectChangeRam);

                        selectChangeRam.addEventListener('change', function(e) {
                            newRamValue = e.target.value;
                            RamStatus = true
                            return newRamValue, RamStatus;
                        });
                    }
                    else if (index === 17) {
                        const selectChangeDisk = document.createElement("select");
                        selectChangeDisk.id = "selectChangeDisk";
                    
                        const emptyOption = document.createElement("option");
                        emptyOption.value = 0;
                        emptyOption.text = "...";
                        selectChangeDisk.appendChild(emptyOption);
                    
                        disksmodels.forEach((model) => {
                            const brand = disksbrands.find(brand => brand.brand_id === model.brand_id);
                            if (brand) {
                                const option = document.createElement("option");
                                option.value = model.model_id;
                                option.text = `${brand.brand_name} ${model.model_name}`;
                                selectChangeDisk.appendChild(option);
                    
                                if (cell.textContent.trim() === `${brand.brand_name} ${model.model_name}`) {
                                    option.selected = true;
                                }
                            }
                        });

                        cell.textContent = "";
                        cell.appendChild(selectChangeDisk);

                        selectChangeDisk.addEventListener('change', function(e) {
                            newDiskValue = e.target.value;
                            DiskStatus = true
                            return newDiskValue, DiskStatus;
                        });
                    }
                    else if (index === 18) {
                        selectChangeDisk.addEventListener("change", (event) => {
                            if (event.target.value === "") {
                                cell.textContent = "";
                            } else {
                                const selectedModelId = parseInt(event.target.value);
                                const selectedModel = disksmodels.find((model) => model.model_id === selectedModelId);
                        
                                if (selectedModel) {
                                    const capasity = diskscapasity.find((capasity) => capasity.capasity_id === selectedModel.capasity_id);
                                    cell.textContent = `${capasity.capasity_name} GB`;
                                } else {
                                    cell.textContent = "";
                                }
                            }
                        });
                    }
                    else if (index === 19) {
                        const changeInputDiskNumber = document.createElement("input");
                        changeInputDiskNumber.type = "text";
                        changeInputDiskNumber.id = "changeInputDiskNumber"
                        changeInputDiskNumber.value = cell.textContent.trim();

                        cell.textContent = "";
                        cell.appendChild(changeInputDiskNumber); 

                        changeInputDiskNumber.addEventListener('change', function(e) {
                            newDiskNumberValue = e.target.value;
                            DiskNumberStatus = true
                            return newDiskNumberValue, DiskNumberStatus;
                        });
                    }

                });
            }

            const oldDepartamentValue = document.getElementById("selectChangeDepartament").value
            const oldConturValue = document.getElementById("selectChangeContur").value
            const oldStatusValue = document.getElementById("selectChangeStatus").value
            const oldOSValue = document.getElementById("selectChangeOC").value
            const oldProcessorValue = document.getElementById("selectChangeProcessor").value
            const oldRamValue = document.getElementById("selectChangeRam").value
            const oldMonitorValue = document.getElementById("selectChangeMonitor").value
            const oldDiskValue = document.getElementById("selectChangeDisk").value

            document.getElementById("saveChangeButton").addEventListener('click', async () => {
                let statusReload = true
                
                if (statusReload){
                    if (inventoryNumberStatus){
                        if (newInventoryNumberValue.trim() == 0) {
                            alert("Поле Инвентарный номер не может быть пустым");
                            return;
                        }
                        else if (existingInventoryNumbers.includes(newInventoryNumberValue)) {
                            alert('Этот инвентарный номер уже существует');
                            return;
                        }
                        else if (newInventoryNumberValue.length >= 20) {
                            alert('Слишком большое значение инвентарного номера');
                            return;
                        }
                        else {
                            statusReload = false
                        }
                    }

                    if (departamentStatus) {
                        if (newDepartamentValue.trim() == 0) {
                            alert("Поле Отдел не может быть пустым");
                            return;
                        }
                        else if (newDepartamentValue.trim() == oldDepartamentValue){
                            alert("Новое значения поля Отдел равно старому");
                            departamentStatus = false
                            return departamentStatus;
                        }
                        else {
                            statusReload = false
                        }
                    }

                    if (cabinetStatus) {
                        if (newCabinetValue.length > 11) {
                            alert('Слишком большое значение кабинета');
                            return;
                        }
                        else {
                            statusReload = false
                        }
                    }

                    if (statusStatus) {
                        if(newStatusValue == oldStatusValue){
                            alert("Новое значения поля Статус равно старому");
                            statusStatus = false
                            return statusStatus;
                        }
                        else {
                            statusReload = false
                        }
                    }

                    if (StationNameStatus) {
                        if (newStationNameValue.length > 26) {
                            alert('Слишком большое значение Имени станции');
                            return;
                        }
                        else {
                            statusReload = false
                        }
                    }

                    if (ConturStatus) {
                        if (newConturValue.trim() == oldConturValue){
                            alert("Новое значения поля Контур равно старому");
                            ConturStatus = false
                            return ConturStatus;
                        }
                        else {
                            statusReload = false
                        }
                    }

                    if (IPStatus) {
                        if (newIPValue.length > 26) {
                            alert('Слишком большое значение IP станции');
                            return;
                        }
                        else {
                            statusReload = false
                        }
                    }

                    if (MACStatus) {
                        if (newMACValue.length > 26) {
                            alert('Слишком большое значение MAC-адреса станции');
                            return;
                        }
                        else {
                            statusReload = false
                        }
                    }
                    
                    if (SobleStatus) {
                        if (newMACValue.length > 26) {
                            alert('Слишком большое значение Соболя станции');
                            return;
                        }
                        else {
                            statusReload = false
                        }
                    }

                    if (OSStatus) {
                        if (newOSValue == oldOSValue) {
                            alert("Новое значения поля OC равно старому");
                            OSStatus = false
                            return OSStatus;
                        }
                        else {
                            statusReload = false
                        }
                    }

                    if (ProcessorStatus) {
                        if (newProcessorValue == oldProcessorValue) {
                            alert("Новое значения поля Процессор равно старому");
                            ProcessorStatus = false
                            return ProcessorStatus;
                        }
                        else {
                            statusReload = false
                        }
                    }

                    if (RamStatus) {
                        if (newRamValue == oldRamValue) {
                            alert("Новое значения поля ОЗУ равно старому");
                            RamStatus = false
                            return RamStatus;
                        }
                        else {
                            statusReload = false
                        }
                    }

                    if (MonitorStatus) {
                        if (newMonitorValue == oldMonitorValue) {
                            alert("Новое значения поля Монитор равно старому");
                            MonitorStatus = false
                            return MonitorStatus;
                        }
                        else {
                            statusReload = false
                        }
                    }

                    if (MonitorNumberStatus) {
                        if (newMonitorNumberValue.length > 51) {
                            alert('Слишком большое значение Серийного номера Монитора');
                            return;
                        }
                        else {
                            statusReload = false
                        }
                    }

                    if (DiskStatus) {
                        if (newDiskValue == oldDiskValue) {
                            alert("Новое значения поля Диск равно старому");
                            DiskStatus = false
                            return DiskStatus;
                        }
                        else {
                            statusReload = false
                        }
                    }

                    if (DiskNumberStatus) {
                        if (newDiskNumberValue.length > 51) {
                            alert('Слишком большое значение Серийного номера Диска');
                            return;
                        }
                        else {
                            statusReload = false
                        }
                    }

                    if (statusReload){
                        alert("Ничего не было изменено");
                        return;
                    }

                    if (!statusReload) {
                        if (inventoryNumberStatus) {
                            setTimeout(() => {
                                updateInventoryNumber("accountingequipment", parseInt(rowId), Number(newInventoryNumberValue))
                                inventoryNumberStatus = false
                                return inventoryNumberStatus;
                            }, 1000);
                        }
                        if (departamentStatus) {
                            setTimeout(() => {
                                updateDepartamentAndCabinet("accountingequipment", parseInt(rowId), parseInt(newDepartamentValue), newCabinetValue)
                                departamentStatus = false
                                return departamentStatus;
                            }, 1000);
                        }
                        if (cabinetStatus) {
                            setTimeout(() => {
                                updateDepartamentAndCabinet("accountingequipment", parseInt(rowId), parseInt(newDepartamentValue), newCabinetValue)
                                cabinetStatus = false
                                return cabinetStatus;
                            }, 1000);
                        }
                        if (statusStatus) {
                            setTimeout(() => {
                                updateStationStatus("workstation", parseInt(rowId))
                                statusStatus = false
                                return statusStatus;
                            }, 1000);
                        }
                        if (StationNameStatus) {
                            setTimeout(() => {
                                updateWorkStationTechnik("workstation", parseInt(rowId), "station_name", newStationNameValue)
                                StationNameStatus = false
                                return StationNameStatus;
                            }, 1000);
                        }
                        if (ConturStatus) {
                            setTimeout(() => {
                                updateWorkStationTechnik("workstation", parseInt(rowId), "station_contur", parseInt(newConturValue))
                                ConturStatus = false
                                return ConturStatus;
                            }, 1000);
                        }
                        if (IPStatus) {
                            setTimeout(() => {
                                updateWorkStationTechnik("workstation", parseInt(rowId), "station_ip", newIPValue)
                                IPStatus = false
                                return IPStatus;
                            }, 1000);
                        }
                        if (MACStatus) {
                            setTimeout(() => {
                                updateWorkStationTechnik("workstation", parseInt(rowId), "mac_address", newMACValue)
                                MACStatus = false
                                return MACStatus;
                            }, 1000);
                        }
                        if (SobleStatus) {
                            setTimeout(() => {
                                updateWorkStationTechnik("workstation", parseInt(rowId), "soble", newSobleValue)
                                SobleStatus = false
                                return SobleStatus;
                            }, 1000);
                        }
                        if (OSStatus){
                            setTimeout(() => {
                                updateWorkstationFisical("workstation", parseInt(rowId), "station_os", parseInt(newOSValue))
                                OSStatus = false
                                return OSStatus;
                            }, 1000);
                        }
                        if (ProcessorStatus) {
                            setTimeout(() => {
                                updateWorkstationFisical("workstation", parseInt(rowId), "processor_id", parseInt(newProcessorValue))
                                ProcessorStatus = false
                                return ProcessorStatus;
                            }, 1000);
                        }
                        if (RamStatus) {
                            setTimeout(() => {
                                updateWorkstationFisical("workstation", parseInt(rowId), "ram_id", parseInt(newRamValue))
                                RamStatus = false
                                return RamStatus;
                            }, 1000);
                        }
                        if (MonitorStatus) {
                            setTimeout(() => {
                                updateWorkstationFisical("workstation", parseInt(rowId), "monitor_model_id", parseInt(newMonitorValue))
                                MonitorStatus = false
                                return MonitorStatus;
                            }, 1000);
                        }
                        if (MonitorNumberStatus) {
                            setTimeout(() => {
                                updateWorkStationTechnik("workstation", parseInt(rowId), "monitor_serial_number", newMonitorNumberValue)
                                MonitorNumberStatus = false
                                return MonitorNumberStatus;
                            }, 1000);
                        }
                        if (DiskStatus) {
                            setTimeout(() => {
                                updateWorkstationFisical("workstation", parseInt(rowId), "disk_model_id", parseInt(newDiskValue))
                                DiskStatus = false
                                return DiskStatus;
                            }, 1000);
                        }
                        if (DiskNumberStatus) {
                            setTimeout(() => {
                                updateWorkStationTechnik("workstation", parseInt(rowId), "disk_serial_number", newDiskNumberValue)
                                DiskNumberStatus = false
                                return DiskNumberStatus;
                            }, 1000);
                        }

                        await UpdateData()
                        statusReload = true
                    }
                }

                if (statusReload){
                    setTimeout(() => {
                        currentEditingRowId = null;
                        isCurrentlyEditing = false;
                        const originalContent = originalCellContent[rowId];
                        delete originalCellContent[rowId];
                        Array.from(row.children).slice(3).forEach((cell, index) => {
                            cell.textContent = originalContent[index];
                            originalContent[index] = {};
                        });

                        ViewDates()
                    }, 2000);
                }
            });
        }
        else {
            currentEditingRowId = null;
            isCurrentlyEditing = false;
            const originalContent = originalCellContent[rowId];
            delete originalCellContent[rowId];
            Array.from(row.children).slice(3).forEach((cell, index) => {
                cell.textContent = originalContent[index];
                originalContent[index] = {};
            });
        }
    }
}

export default ChangeRow