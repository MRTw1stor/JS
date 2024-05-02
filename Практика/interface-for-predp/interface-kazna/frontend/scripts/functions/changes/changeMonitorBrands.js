import { getDates } from "../../proto.js";
import { updateEasyTables } from "../../api.js";

const originalCellContent = {};
let currentEditingRowId = null;
let isCurrentlyEditing = false;

async function changeMonitorBrands(rowId, displayMonitorBrands) {
    const row = document.getElementById("monitorbrands_row_" + rowId);

    let monitorbrands = await getDates("monitorbrands");
    const existingMonitorBrands = monitorbrands.map(brand => brand.brand_name);

    if (row) {
        if (rowId !== currentEditingRowId) {
            if (isCurrentlyEditing) {
                return;
            }
            if (currentEditingRowId && originalCellContent[currentEditingRowId]) {
                const prevRow = document.getElementById("monitorbrands_row_" + currentEditingRowId);
                Array.from(prevRow.children).slice(2).forEach((cell, index) => {
                    cell.textContent = originalCellContent[currentEditingRowId][index];
                });
                originalCellContent[currentEditingRowId] = {};
            }

            let monitorBrandStatus = false
            let newMonitorBrandValue = ""

            currentEditingRowId = rowId;
            isCurrentlyEditing = true;

            if (!originalCellContent[rowId] || Object.keys(originalCellContent[rowId]).length === 0) {
                originalCellContent[rowId] = {};
                Array.from(row.children).slice(2).forEach((cell, index) => {
                    originalCellContent[rowId][index] = cell.textContent;
                    if (index === 0) {
                        
                        const monitorBrandsInput = document.createElement('input');
                        monitorBrandsInput.value = cell.textContent
                        monitorBrandsInput.id = "monitorBrandsInput"
                        const saveButton = document.createElement('button');
                        saveButton.textContent = 'Сохранить';
                        saveButton.id = "monitorBrandsSaveButton"
                        saveButton.addEventListener("click", async () =>{
                            if (monitorBrandStatus){
                                if (newMonitorBrandValue.trim() == "") {
                                    alert("Новое значение поля Фирма монитора не может быть пустым");
                                    return;
                                }
                                else if (existingMonitorBrands.includes(newMonitorBrandValue)) {
                                    alert('Название такой Фирмы монитора уже существует');
                                    return;
                                }
                                else if (newMonitorBrandValue.length > 50) {
                                    alert('Слишком большое значение поля Фирма монитора');
                                    return;
                                }
                                else if (!/^[a-zA-Zа-яА-Я]+$/.test(newMonitorBrandValue)) {
                                    alert("Название Фирмы монитора может содержать только буквы");
                                    return;
                                }
                                else if (newMonitorBrandValue.trim() !== "") {
                                    updateEasyTables("monitorbrands", "monitorbrands", parseInt(rowId), newMonitorBrandValue, 0);
                                    setTimeout(async () => {
                                        await displayMonitorBrands(1);
                                        originalCellContent[rowId][0] = newMonitorBrandValue;

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
                            if (!monitorBrandStatus){
                                alert("Название Фирмы монитора не было изменено");
                                return;
                            }
                        })

                        cell.textContent = '';
                        cell.appendChild(monitorBrandsInput);
                        cell.appendChild(saveButton);

                        monitorBrandsInput.addEventListener('change', function(e) {
                            newMonitorBrandValue = e.target.value;
                            monitorBrandStatus = true
                            return newMonitorBrandValue, monitorBrandStatus;
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

export default changeMonitorBrands;
