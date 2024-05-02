import { getDates } from "../../proto.js";
import { updateDifficultTables } from "../../api.js";

const originalCellContent = {};
let currentEditingRowId = null;
let isCurrentlyEditing = false;

async function changeMonitorModels(rowId, displayMonitorModels) {
    const row = document.getElementById("monitormodels_row_" + rowId);

    let monitorbrands = await getDates("monitorbrands");
    let monitormodels = await getDates("monitormodels")
    const existingMonitorModels = monitormodels.map(model => model.model_name);

    if (row) {
        if (rowId !== currentEditingRowId) {
            if (isCurrentlyEditing) {
                return;
            }
            if (currentEditingRowId && originalCellContent[currentEditingRowId]) {
                const prevRow = document.getElementById("monitormodels_row_" + currentEditingRowId);
                Array.from(prevRow.children).slice(2).forEach((cell, index) => {
                    cell.textContent = originalCellContent[currentEditingRowId][index];
                });
                originalCellContent[currentEditingRowId] = {};
            }
            let monitorBrandStatus = false
            let newMonitorBrandValue = 0
            let monitorNumberStatus = false
            let newMonitorNumberValue = ""

            currentEditingRowId = rowId;
            isCurrentlyEditing = true;

            if (!originalCellContent[rowId] || Object.keys(originalCellContent[rowId]).length === 0) {
                originalCellContent[rowId] = {};
                Array.from(row.children).slice(2).forEach((cell, index) => {
                    originalCellContent[rowId][index] = cell.textContent;
                    if (index === 0) {
                        
                        const selectBrand = document.createElement("select");
                        selectBrand.id = "changeMonitorModelBrandSelect"
                        const emptyBrandOption = document.createElement("option");
                        emptyBrandOption.value = "";
                        emptyBrandOption.textContent = "...";
                        selectBrand.appendChild(emptyBrandOption);
                    
                        monitorbrands.forEach(brand => {
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
                            newMonitorBrandValue = e.target.value;
                            monitorBrandStatus = true
                            return newMonitorBrandValue, monitorBrandStatus;
                        });
                    }
                    if (index === 1) {
                        const monitorModelInput = document.createElement('input');
                        monitorModelInput.value = cell.textContent
                        monitorModelInput.id = "monitorModelInput"
                        const saveButton = document.createElement('button');
                        saveButton.textContent = 'Сохранить';
                        saveButton.id = "monitorBrandSaveButton"

                        cell.textContent = '';
                        cell.appendChild(monitorModelInput);
                        cell.appendChild(saveButton);

                        monitorModelInput.addEventListener('change', function(e) {
                            newMonitorNumberValue = e.target.value;
                            monitorNumberStatus = true
                            return newMonitorNumberValue, monitorNumberStatus;
                        });
                    }
                });

                const oldMonitorBrandValue = document.getElementById("changeMonitorModelBrandSelect").value

                document.getElementById("monitorBrandSaveButton").addEventListener("click", async () => {
                    let statusReload = false

                    if (!statusReload){

                        if(monitorBrandStatus){
                            if (oldMonitorBrandValue == newMonitorBrandValue) {
                                alert("Значение поля Фирма монитора не было изменено");
                                monitorBrandStatus = false
                                return monitorBrandStatus;
                            }
                            else{
                                statusReload = true
                            }
                        }
                        if (monitorNumberStatus){
                            if (newMonitorNumberValue.trim() === "") {
                                alert("Значение поля Модель монитора не может быть пустым");
                                return;
                            }
                            else if (newMonitorNumberValue.length > 50) {
                                alert('Слишком большое значение поля Модель монитора');
                                return;
                            }
                            else if (!/^[a-zA-Zа-яА-Я0-9_-\s]+$/.test(newMonitorNumberValue)) {
                                alert("Название Модели монитора должно содержать буквы, цифры, дефисы, подчеркивания и пробелы");
                                return;
                            }
                            else if (existingMonitorModels.includes(newMonitorNumberValue)) {
                                alert('Название такой Модели монитора уже существует');
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
                            const MonitorNumberValue = document.getElementById("monitorModelInput").value
                            const saveMonitorBrand = document.getElementById("changeMonitorModelBrandSelect").value
    
    
                            updateDifficultTables("monitormodels", "monitormodels", parseInt(rowId), newMonitorNumberValue, parseInt(newMonitorBrandValue), 0);

                            setTimeout(async () => {
                                const saveMonitorBrandValue = monitorbrands.find(brand => brand.brand_id == saveMonitorBrand);
                                
                                if(newMonitorBrandValue == 0){
                                    newMonitorBrandValue = saveMonitorBrandValue.brand_name
                                }
                                else {
                                    const saveMonitorBrand = monitorbrands.find(brand => brand.brand_id == newMonitorBrandValue);
                                    newMonitorBrandValue = saveMonitorBrand.brand_name
                                }
    
                                originalCellContent[rowId][0] = newMonitorBrandValue;
                                originalCellContent[rowId][1] = MonitorNumberValue;

                                currentEditingRowId = null;
                                isCurrentlyEditing = false;
                                const originalContent = originalCellContent[rowId];
                                delete originalCellContent[rowId];
                                Array.from(row.children).slice(2).forEach((cell, index) => {
                                    cell.textContent = originalContent[index];
                                    originalContent[index] = {};
                                });
                                
                                await displayMonitorModels(1);
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

export default changeMonitorModels;
