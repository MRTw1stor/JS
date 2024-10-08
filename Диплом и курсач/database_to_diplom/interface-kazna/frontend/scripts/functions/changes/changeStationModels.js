import { getDates } from "../../proto.js";
import { updateEasyTables } from "../../api.js";

const originalCellContent = {};
let currentEditingRowId = null;
let isCurrentlyEditing = false;

async function changeStationModels(rowId, displayStationModels) {
    const row = document.getElementById("stationmodels_row_" + rowId);

    let stantionsmodels = await getDates("stantionsmodels");
    const existingStantionsModels = stantionsmodels.map(model => model.model_name);

    if (row) {
        if (rowId !== currentEditingRowId) {
            if (isCurrentlyEditing) {
                return;
            }
            if (currentEditingRowId && originalCellContent[currentEditingRowId]) {
                const prevRow = document.getElementById("stationmodels_row_" + currentEditingRowId);
                Array.from(prevRow.children).slice(2).forEach((cell, index) => {
                    cell.textContent = originalCellContent[currentEditingRowId][index];
                });
                originalCellContent[currentEditingRowId] = {};
            }
            let stationModelStatus = false
            let newStationModelValue = ""

            currentEditingRowId = rowId;
            isCurrentlyEditing = true;

            if (!originalCellContent[rowId] || Object.keys(originalCellContent[rowId]).length === 0) {
                originalCellContent[rowId] = {};
                Array.from(row.children).slice(2).forEach((cell, index) => {
                    originalCellContent[rowId][index] = cell.textContent;
                    if (index === 0) {
                        
                        const stationModelstInput = document.createElement('input');
                        stationModelstInput.value = cell.textContent
                        stationModelstInput.id = "stationModelstInput"
                        const saveButton = document.createElement('button');
                        saveButton.textContent = 'Сохранить';
                        saveButton.id = "stationModelsSaveButton"
                        saveButton.addEventListener("click", async () =>{
                            if (stationModelStatus){
                                if (newStationModelValue.trim() == "") {
                                    alert("Новое значение поля Модель станции не может быть пустым");
                                    return;
                                }
                                else if (existingStantionsModels.includes(newStationModelValue)) {
                                    alert('Название такой Модели станции уже существует');
                                    return;
                                }
                                else if (newStationModelValue.length > 50) {
                                    alert('Слишком большое значение поля Модель станции');
                                    return;
                                }
                                else if (!/^[a-zA-Zа-яА-Я0-9_-\s]+$/.test(newStationModelValue)) {
                                    alert("Название модели станции может содержать буквы, цифры, дефисы, подчеркивания и пробелы");
                                    return;
                                }
                                else if (newStationModelValue.trim() !== "") {
                                    updateEasyTables("stantionsmodels", "stantionsmodels", parseInt(rowId), newStationModelValue, 0);
                                    setTimeout(async () => {
                                        await displayStationModels(1);
                                        originalCellContent[rowId][0] = newStationModelValue;

                                        currentEditingRowId = null;
                                        isCurrentlyEditing = false;
                                        const originalContent = originalCellContent[rowId];
                                        delete originalCellContent[rowId];
                                        Array.from(row.children).slice(2).forEach((cell, index) => {
                                            cell.textContent = originalContent[index];
                                            originalContent[index] = {};
                                        });
                                    }, 1000);
                                }
                            }
                            if (!stationModelStatus){
                                alert("Название Модели станции не было изменено");
                                return;
                            }
                        })

                        cell.textContent = '';
                        cell.appendChild(stationModelstInput);
                        cell.appendChild(saveButton);

                        stationModelstInput.addEventListener('change', function(e) {
                            newStationModelValue = e.target.value;
                            stationModelStatus = true
                            return newStationModelValue, stationModelStatus;
                        });
                    }
                });
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

export default changeStationModels;
