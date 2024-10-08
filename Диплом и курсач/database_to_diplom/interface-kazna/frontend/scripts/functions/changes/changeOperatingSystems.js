import { getDates } from "../../proto.js";
import { updateEasyTables } from "../../api.js";

const originalCellContent = {};
let currentEditingRowId = null;
let isCurrentlyEditing = false;

async function changeOperatingSystems(rowId, displayOperatingSystems) {
    const row = document.getElementById("operatingsystems_row_" + rowId);

    let os = await getDates("operatingsystems");
    const existingOperatingSystems = os.map(osi => osi.operatingsystem_name);

    if (row) {
        if (rowId !== currentEditingRowId) {
            if (isCurrentlyEditing) {
                return;
            }
            if (currentEditingRowId && originalCellContent[currentEditingRowId]) {
                const prevRow = document.getElementById("operatingsystems_row_" + currentEditingRowId);
                Array.from(prevRow.children).slice(2).forEach((cell, index) => {
                    cell.textContent = originalCellContent[currentEditingRowId][index];
                });
                originalCellContent[currentEditingRowId] = {};
            }
            let operatingSystemsStatus = false
            let newOperatingSystemsValue = ""

            currentEditingRowId = rowId;
            isCurrentlyEditing = true;

            if (!originalCellContent[rowId] || Object.keys(originalCellContent[rowId]).length === 0) {
                originalCellContent[rowId] = {};
                Array.from(row.children).slice(2).forEach((cell, index) => {
                    originalCellContent[rowId][index] = cell.textContent;
                    if (index === 0) {
                        
                        const operatingSystemsInput = document.createElement('input');
                        operatingSystemsInput.value = cell.textContent
                        operatingSystemsInput.id = "operatingSystemsInput"
                        const saveButton = document.createElement('button');
                        saveButton.textContent = 'Сохранить';
                        saveButton.id = "operatingSystemsSaveButton"
                        saveButton.addEventListener("click", async () =>{
                            if (operatingSystemsStatus){
                                if (newOperatingSystemsValue.trim() == "") {
                                    alert("Новое значение поля Операционная система не может быть пустым");
                                    return;
                                }
                                else if (existingOperatingSystems.includes(newOperatingSystemsValue)) {
                                    alert('Название такой Операционной системы уже существует');
                                    return;
                                }
                                else if (newOperatingSystemsValue.length > 50) {
                                    alert('Слишком большое значение поля Операционная система');
                                    return;
                                }
                                else if (!/^[a-zA-Zа-яА-Я0-9_-\s.]+$/.test(newOperatingSystemsValue)) {
                                    alert("Название операционной системы может содержать буквы, цифры, дефисы, подчеркивания, пробелы и точки");
                                    return;
                                }
                                else if (newOperatingSystemsValue.trim() !== "") {
                                    updateEasyTables("operatingsystems", "operatingsystems", parseInt(rowId), newOperatingSystemsValue, 0);
                                    setTimeout(async () => {
                                        await displayOperatingSystems(1);
                                        originalCellContent[rowId][0] = newOperatingSystemsValue;

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
                            if (!operatingSystemsStatus){
                                alert("Название Операционной системы не было изменено");
                                return;
                            }
                        })

                        cell.textContent = '';
                        cell.appendChild(operatingSystemsInput);
                        cell.appendChild(saveButton);

                        operatingSystemsInput.addEventListener('change', function(e) {
                            newOperatingSystemsValue = e.target.value;
                            operatingSystemsStatus = true
                            return newOperatingSystemsValue, operatingSystemsStatus;
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

export default changeOperatingSystems;
