import { getDates } from "../../proto.js";
import { updateEasyTables } from "../../api.js";

const originalCellContent = {};
let currentEditingRowId = null;
let isCurrentlyEditing = false;

async function changeRam(rowId, displayRam) {
    const row = document.getElementById("ram_row_" + rowId);

    let ram = await getDates("ram");
    const existingRam = ram.map(ramm => ramm.ram_capacity);

    if (row) {
        if (rowId !== currentEditingRowId) {
            if (isCurrentlyEditing) {
                return;
            }
            if (currentEditingRowId && originalCellContent[currentEditingRowId]) {
                const prevRow = document.getElementById("ram_row_" + currentEditingRowId);
                Array.from(prevRow.children).slice(2).forEach((cell, index) => {
                    cell.textContent = originalCellContent[currentEditingRowId][index];
                });
                originalCellContent[currentEditingRowId] = {};
            }
            let RamStatus = false
            let newRamValue = 0

            currentEditingRowId = rowId;
            isCurrentlyEditing = true;

            if (!originalCellContent[rowId] || Object.keys(originalCellContent[rowId]).length === 0) {
                originalCellContent[rowId] = {};
                Array.from(row.children).slice(2).forEach((cell, index) => {
                    originalCellContent[rowId][index] = cell.textContent;
                    if (index === 0) {
                        
                        const ramInput = document.createElement('input');
                        ramInput.value = cell.textContent.replace(' MB', '')
                        ramInput.type = "number"
                        ramInput.id = "ramInput"
                        const saveButton = document.createElement('button');
                        saveButton.textContent = 'Сохранить';
                        saveButton.id = "ramSaveButton"
                        saveButton.addEventListener("click", async () =>{
                            if (RamStatus){
                                if (newRamValue == 0) {
                                    alert("Новое значение поля Объем оперативной памяти не может быть пустым");
                                    return;
                                }
                                else if (existingRam.includes(parseInt(newRamValue))) {
                                    alert('Такой Объем оперативной памяти уже существует');
                                    return;
                                }
                                else if (newRamValue.length > 50) {
                                    alert('Слишком большое значение поля Объем оперативной памяти');
                                    return;
                                }
                                else if (newRamValue !== 0) {
                                    updateEasyTables("ram", "ram", parseInt(rowId), "cap", parseInt(newRamValue));
                                    setTimeout(async () => {
                                        await displayRam(1);
                                        originalCellContent[rowId][0] = newRamValue + " MB";

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
                            if (!RamStatus){
                                alert("Объем оперативной памяти не был изменен");
                                return;
                            }
                        })

                        cell.textContent = '';
                        cell.appendChild(ramInput);
                        cell.appendChild(saveButton);

                        ramInput.addEventListener('change', function(e) {
                            newRamValue = e.target.value;
                            RamStatus = true
                            return newRamValue, RamStatus;
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

export default changeRam;
