import { getDates } from "../../proto.js";
import { updateEasyTables } from "../../api.js";

const originalCellContent = {};
let currentEditingRowId = null;
let isCurrentlyEditing = false;

async function changeDiskBrands(rowId, displayDiskBrands) {
    const row = document.getElementById("diskbrand_row_" + rowId);

    let disksbrands = await getDates("disksbrands");
    const existingDiskBrands = disksbrands.map(brand => brand.brand_name);

    if (row) {
        if (rowId !== currentEditingRowId) {
            if (isCurrentlyEditing) {
                return;
            }
            if (currentEditingRowId && originalCellContent[currentEditingRowId]) {
                const prevRow = document.getElementById("diskbrand_row_" + currentEditingRowId);
                Array.from(prevRow.children).slice(2).forEach((cell, index) => {
                    cell.textContent = originalCellContent[currentEditingRowId][index];
                });
                originalCellContent[currentEditingRowId] = {};
            }

            let diskBrandStatus = false
            let newDiskBrandValue = ""

            currentEditingRowId = rowId;
            isCurrentlyEditing = true;

            if (!originalCellContent[rowId] || Object.keys(originalCellContent[rowId]).length === 0) {
                originalCellContent[rowId] = {};
                Array.from(row.children).slice(2).forEach((cell, index) => {
                    originalCellContent[rowId][index] = cell.textContent;
                    if (index === 0) {
                        
                        const diskBrandInput = document.createElement('input');
                        diskBrandInput.value = cell.textContent
                        diskBrandInput.id = "diskBrandInput"
                        const saveButton = document.createElement('button');
                        saveButton.textContent = 'Сохранить';
                        saveButton.id = "diskBrandSaveButton"
                        saveButton.addEventListener("click", async () =>{
                            if (diskBrandStatus){
                                if (newDiskBrandValue.trim() == "") {
                                    alert("Новое значение поля Фирма диска не может быть пустым");
                                    return;
                                }
                                else if (existingDiskBrands.includes(newDiskBrandValue)) {
                                    alert('Название такой Фирмы диска уже существует');
                                    return;
                                }
                                else if (newDiskBrandValue.length > 50) {
                                    alert('Слишком большое значение поля Фирма диска');
                                    return;
                                }
                                else if (!/^[a-zA-Zа-яА-Я]+$/.test(newDiskBrandValue)) {
                                    alert("Название Фирмы диска может содержать только буквы");
                                    return;
                                }
                                else if (newDiskBrandValue.trim() !== "") {
                                    updateEasyTables("disksbrands", "disksbrands", parseInt(rowId), newDiskBrandValue, 0);
                                    setTimeout(async () => {
                                        await displayDiskBrands(1);
                                        originalCellContent[rowId][0] = newDiskBrandValue;

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
                            if (!diskBrandStatus){
                                alert("Название Фирмы диска не было изменено");
                                return;
                            }
                        })

                        cell.textContent = '';
                        cell.appendChild(diskBrandInput);
                        cell.appendChild(saveButton);

                        diskBrandInput.addEventListener('change', function(e) {
                            newDiskBrandValue = e.target.value;
                            diskBrandStatus = true
                            return newDiskBrandValue, diskBrandStatus;
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

export default changeDiskBrands;
