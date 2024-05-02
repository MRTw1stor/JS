import { getDates } from "../../proto.js";
import { updateDifficultTables } from "../../api.js";

const originalCellContent = {};
let currentEditingRowId = null;
let isCurrentlyEditing = false;

async function changeDiskModels(rowId, displayDiskModels) {
    const row = document.getElementById("diskmodels_row_" + rowId);

    let disksmodels = await getDates("disksmodels");
    let disksbrands = await getDates("disksbrands");
    let diskscapasity = await getDates("diskscapasity");
    const existingDiskModels = disksmodels.map(model => model.model_name);

    if (row) {
        if (rowId !== currentEditingRowId) {
            if (isCurrentlyEditing) {
                return;
            }
            if (currentEditingRowId && originalCellContent[currentEditingRowId]) {
                const prevRow = document.getElementById("diskmodels_row_" + currentEditingRowId);
                Array.from(prevRow.children).slice(2).forEach((cell, index) => {
                    cell.textContent = originalCellContent[currentEditingRowId][index];
                });
                originalCellContent[currentEditingRowId] = {};
            }
            let diskBrandStatus = false
            let newdiskBrandValue = 0
            let diskNumberStatus = false
            let newDiskNumberValue = ""
            let diskCapasityStatus = false
            let newdiskCapasityValue = 0

            currentEditingRowId = rowId;
            isCurrentlyEditing = true;

            if (!originalCellContent[rowId] || Object.keys(originalCellContent[rowId]).length === 0) {
                originalCellContent[rowId] = {};
                Array.from(row.children).slice(2).forEach((cell, index) => {
                    originalCellContent[rowId][index] = cell.textContent;
                    if (index === 0) {
                        
                        const selectBrand = document.createElement("select");
                        selectBrand.id = "changeDiskModelBrandSelect"
                    
                        disksbrands.forEach(brand => {
                            const option = document.createElement("option");
                            option.value = brand.brand_id;
                            option.textContent = brand.brand_name;
                            selectBrand.appendChild(option);

                            if (brand.brand_name.trim() === cell.textContent.trim()) {
                                option.selected = true;
                            }
                        })

                        cell.textContent = '';
                        cell.appendChild(selectBrand);

                        selectBrand.addEventListener('change', function(e) {
                            newdiskBrandValue = e.target.value;
                            diskBrandStatus = true
                            return newdiskBrandValue, diskBrandStatus;
                        });
                    }
                    if (index === 1) {
                        const diskModelInput = document.createElement('input');
                        diskModelInput.value = cell.textContent
                        diskModelInput.id = "diskModelInput"

                        cell.textContent = '';
                        cell.appendChild(diskModelInput);

                        diskModelInput.addEventListener('change', function(e) {
                            newDiskNumberValue = e.target.value;
                            diskNumberStatus = true
                            return newDiskNumberValue, diskNumberStatus;
                        });
                    }
                    if (index === 2) {
                        const selectCapasity = document.createElement("select");
                        selectCapasity.id = "changeDiskModelCapasitySelect"

                        diskscapasity.forEach(capacity => {
                            const option = document.createElement("option");
                            option.value = capacity.capasity_id;
                            option.textContent = `${capacity.capasity_name} GB`;
                            selectCapasity.appendChild(option);

                            if (`${capacity.capasity_name} GB` === cell.textContent.trim()) {
                                option.selected = true;
                            }
                        });

                        const saveButton = document.createElement('button');
                        saveButton.textContent = 'Сохранить';
                        saveButton.id = "diskBrandSaveButton"

                        cell.textContent = '';
                        cell.appendChild(selectCapasity);
                        cell.appendChild(saveButton);

                        selectCapasity.addEventListener('change', function(e) {
                            newdiskCapasityValue = e.target.value;
                            diskCapasityStatus = true
                            return newdiskCapasityValue, diskCapasityStatus;
                        });
                    }
                });

                const oldDiskBrandValue = document.getElementById("changeDiskModelBrandSelect").value
                const oldDiskCapasityValue = document.getElementById("changeDiskModelCapasitySelect").value

                document.getElementById("diskBrandSaveButton").addEventListener("click", async () => {
                    let statusReload = false

                    if(!statusReload){

                        if(diskBrandStatus){
                            if (oldDiskBrandValue == newdiskBrandValue) {
                                alert("Значение поля Фирма жесткого диска не было изменено");
                                diskBrandStatus = false
                                return diskBrandStatus;
                            }
                            else{
                                statusReload = true
                            }
                        }
                        if(diskCapasityStatus){
                            if (oldDiskCapasityValue == newdiskCapasityValue) {
                                alert("Значение поля Объем жесткого диска не было изменено");
                                diskCapasityStatus = false
                                return diskCapasityStatus;
                            }
                            else{
                                statusReload = true
                            }
                        }
                        if (diskNumberStatus){
                            if (newDiskNumberValue.trim() === "") {
                                alert("Значение поля Модель жесткого диска не может быть пустым");
                                return;
                            }
                            else if (newDiskNumberValue.length > 50) {
                                alert('Слишком большое значение поля Модель жесткого диска');
                                return;
                            }
                            else if (!/^[a-zA-Zа-яА-Я0-9_-\s]+$/.test(newDiskNumberValue)) {
                                alert("Название Модели диска должно содержать буквы, цифры, дефисы, подчеркивания и пробелы");
                                return;
                            }
                            else if (existingDiskModels.includes(newDiskNumberValue)) {
                                alert('Название такой Модели жесткого диска уже существует');
                                return;
                            }
                            else{
                                statusReload = true
                            }
                        }

                        if (!statusReload){
                            alert("Ничего не было изменено");
                            return;
                        }

                        if (statusReload) {
                            const DiskNumberValue = document.getElementById("diskModelInput").value
                            const saveDiskBrand = document.getElementById("changeDiskModelBrandSelect").value
                            const saveDiskCapasity = document.getElementById("changeDiskModelCapasitySelect").value
    
    
                            updateDifficultTables("disksmodels", "disksmodels", parseInt(rowId), newDiskNumberValue, parseInt(newdiskBrandValue), parseInt(newdiskCapasityValue));

                            setTimeout(async () => {
                                const saveDiskBrandValue = disksbrands.find(brand => brand.brand_id == saveDiskBrand);
                                const saveDiskCapasityValue = diskscapasity.find(cap => cap.capasity_id == saveDiskCapasity);
                                
                                if(newdiskBrandValue == 0){
                                    newdiskBrandValue = saveDiskBrandValue.brand_name
                                }
                                else {
                                    const saveDiskBrandValue = disksbrands.find(brand => brand.brand_id == newdiskBrandValue);
                                    newdiskBrandValue = saveDiskBrandValue.brand_name
                                }
                                if(newdiskCapasityValue == 0){
                                    newdiskCapasityValue = saveDiskCapasityValue.capasity_name
                                }
                                else {
                                    const saveDiskCapasityValue = diskscapasity.find(cap => cap.capasity_id == newdiskCapasityValue);
                                    newdiskCapasityValue = saveDiskCapasityValue.capasity_name
                                }
    
                                originalCellContent[rowId][0] = newdiskBrandValue;
                                originalCellContent[rowId][1] = DiskNumberValue;
                                originalCellContent[rowId][2] = newdiskCapasityValue + " GB";

                                currentEditingRowId = null;
                                isCurrentlyEditing = false;
                                const originalContent = originalCellContent[rowId];
                                delete originalCellContent[rowId];
                                Array.from(row.children).slice(2).forEach((cell, index) => {
                                    cell.textContent = originalContent[index];
                                    originalContent[index] = {};
                                });
                                
                                await displayDiskModels(1);
                            }, 1000);
                        }
                    }
                })
            }
        }
        else {
            currentEditingRowId = null;
            isCurrentlyEditing = false;
            const originalContent = originalCellContent[rowId];
            delete originalCellContent[rowId];
            Array.from(row.children).slice(2).forEach((cell, index) => {
                cell.textContent = originalContent[index];
                originalContent[index] = {};
            });
        }
    }
}

export default changeDiskModels;
