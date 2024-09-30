import { getDates } from "../../proto.js";
import { updateEasyTables } from "../../api.js";

const originalCellContent = {};
let currentEditingRowId = null;
let isCurrentlyEditing = false;

async function changeDiskCapasity(rowId, displayDiskCapasity) {
    const row = document.getElementById("diskcapasity_row_" + rowId);

    let diskscapasity = await getDates("diskscapasity");
    const existingDisksCapasity = diskscapasity.map(cap => cap.capasity_name);

    if (row) {
        if (rowId !== currentEditingRowId) {
            if (isCurrentlyEditing) {
                return;
            }
            if (currentEditingRowId && originalCellContent[currentEditingRowId]) {
                const prevRow = document.getElementById("diskcapasity_row_" + currentEditingRowId);
                Array.from(prevRow.children).slice(2).forEach((cell, index) => {
                    cell.textContent = originalCellContent[currentEditingRowId][index];
                });
                originalCellContent[currentEditingRowId] = {};
            }
            let diskCapasityStatus = false
            let newDiskCapasityValue = 0

            currentEditingRowId = rowId;
            isCurrentlyEditing = true;

            if (!originalCellContent[rowId] || Object.keys(originalCellContent[rowId]).length === 0) {
                originalCellContent[rowId] = {};
                Array.from(row.children).slice(2).forEach((cell, index) => {
                    originalCellContent[rowId][index] = cell.textContent;
                    if (index === 0) {
                        
                        const diskCapasityInput = document.createElement('input');
                        diskCapasityInput.value = cell.textContent.replace(' GB', '')
                        diskCapasityInput.type = "number"
                        diskCapasityInput.id = "diskCapasityInput"
                        const saveButton = document.createElement('button');
                        saveButton.textContent = 'Сохранить';
                        saveButton.id = "diskCapasitySaveButton"
                        saveButton.addEventListener("click", async () =>{
                            if (diskCapasityStatus){
                                if (newDiskCapasityValue == 0) {
                                    alert("Новое значение поля Объем жесткого диска не может быть пустым");
                                    return;
                                }
                                else if (existingDisksCapasity.includes(parseInt(newDiskCapasityValue))) {
                                    alert('Такой Объем жесткого диска уже существует');
                                    return;
                                }
                                else if (newDiskCapasityValue.length > 50) {
                                    alert('Слишком большое значение поля Объем жесткого диска');
                                    return;
                                }
                                else if (newDiskCapasityValue !== 0) {
                                    updateEasyTables("diskscapasity", "diskscapasity", parseInt(rowId), "cap", parseInt(newDiskCapasityValue));
                                    setTimeout(async () => {
                                        await displayDiskCapasity(1);
                                        originalCellContent[rowId][0] = newDiskCapasityValue + " GB";

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
                            if (!diskCapasityStatus){
                                alert("Объем жесткого диска не был изменен");
                                return;
                            }
                        })

                        cell.textContent = '';
                        cell.appendChild(diskCapasityInput);
                        cell.appendChild(saveButton);

                        diskCapasityInput.addEventListener('change', function(e) {
                            newDiskCapasityValue = e.target.value;
                            diskCapasityStatus = true
                            return newDiskCapasityValue, diskCapasityStatus;
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

export default changeDiskCapasity;
