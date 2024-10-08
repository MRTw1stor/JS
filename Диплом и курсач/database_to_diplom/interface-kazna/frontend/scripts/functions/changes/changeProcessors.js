import { getDates } from "../../proto.js";
import { updateEasyTables } from "../../api.js";

const originalCellContent = {};
let currentEditingRowId = null;
let isCurrentlyEditing = false;

async function changeProcessors(rowId, displayProcessors) {
    const row = document.getElementById("processors_row_" + rowId);

    let processor = await getDates("processors");
    const existingProcessor = processor.map(proc => proc.processor_name);

    if (row) {
        if (rowId !== currentEditingRowId) {
            if (isCurrentlyEditing) {
                return;
            }
            if (currentEditingRowId && originalCellContent[currentEditingRowId]) {
                const prevRow = document.getElementById("processors_row_" + currentEditingRowId);
                Array.from(prevRow.children).slice(2).forEach((cell, index) => {
                    cell.textContent = originalCellContent[currentEditingRowId][index];
                });
                originalCellContent[currentEditingRowId] = {};
            }
            let processorsStatus = false
            let newProcessorsValue = ""

            currentEditingRowId = rowId;
            isCurrentlyEditing = true;

            if (!originalCellContent[rowId] || Object.keys(originalCellContent[rowId]).length === 0) {
                originalCellContent[rowId] = {};
                Array.from(row.children).slice(2).forEach((cell, index) => {
                    originalCellContent[rowId][index] = cell.textContent;
                    if (index === 0) {
                        
                        const processorsInput = document.createElement('input');
                        processorsInput.value = cell.textContent
                        processorsInput.id = "processorsInput"
                        const saveButton = document.createElement('button');
                        saveButton.textContent = 'Сохранить';
                        saveButton.id = "processorsSaveButton"
                        saveButton.addEventListener("click", async () =>{
                            if (processorsStatus){
                                if (newProcessorsValue.trim() == "") {
                                    alert("Новое значение поля Процессор не может быть пустым");
                                    return;
                                }
                                else if (existingProcessor.includes(newProcessorsValue)) {
                                    alert('Название такого Процессора уже существует');
                                    return;
                                }
                                else if (newProcessorsValue.length > 50) {
                                    alert('Слишком большое значение поля Процессор');
                                    return;
                                }
                                else if (!/^[a-zA-Zа-яА-Я0-9_-\s.®]+$/.test(newProcessorsValue)) {
                                    alert("Название Процессора может содержать буквы, цифры, дефисы, подчеркивания, пробелы, точки");
                                    return;
                                }
                                else if (newProcessorsValue.trim() !== "") {
                                    updateEasyTables("processors", "processors", parseInt(rowId), newProcessorsValue, 0);
                                    setTimeout(async () => {
                                        await displayProcessors(1);
                                        originalCellContent[rowId][0] = newProcessorsValue;

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
                            if (!processorsStatus){
                                alert("Название Процессора не было изменено");
                                return;
                            }
                        })

                        cell.textContent = '';
                        cell.appendChild(processorsInput);
                        cell.appendChild(saveButton);

                        processorsInput.addEventListener('change', function(e) {
                            newProcessorsValue = e.target.value;
                            processorsStatus = true
                            return newProcessorsValue, processorsStatus;
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

export default changeProcessors;
