import { getDates } from "../../proto.js";
import { updateEasyTables } from "../../api.js";

const originalCellContent = {};
let currentEditingRowId = null;
let isCurrentlyEditing = false;

async function ChangeDepartament(rowId, displayDepartament) {
    const row = document.getElementById("departament_row_" + rowId);

    let departments = await getDates("departments");
    const existingDepartaments = departments.map(dep => dep.department_name);

    if (row) {
        if (rowId !== currentEditingRowId) {
            if (isCurrentlyEditing) {
                return;
            }
            if (currentEditingRowId && originalCellContent[currentEditingRowId]) {
                const prevRow = document.getElementById("departament_row_" + currentEditingRowId);
                Array.from(prevRow.children).slice(2).forEach((cell, index) => {
                    cell.textContent = originalCellContent[currentEditingRowId][index];
                });
                originalCellContent[currentEditingRowId] = {};
            }

            let departamentStatus = false
            let newDepartamentValue = ""

            currentEditingRowId = rowId;
            isCurrentlyEditing = true;

            if (!originalCellContent[rowId] || Object.keys(originalCellContent[rowId]).length === 0) {
                originalCellContent[rowId] = {};
                Array.from(row.children).slice(2).forEach((cell, index) => {
                    originalCellContent[rowId][index] = cell.textContent;
                    if (index === 0) {
                        
                        const departamentInput = document.createElement('input');
                        departamentInput.value = cell.textContent
                        departamentInput.id = "departamentInput"
                        const saveButton = document.createElement('button');
                        saveButton.textContent = 'Сохранить';
                        saveButton.id = "departamenSaveButton"
                        saveButton.addEventListener("click", async () =>{
                            if (departamentStatus){
                                if (newDepartamentValue.trim() == "") {
                                    alert("Новое значение поля Отдел не может быть пустым");
                                    return;
                                }
                                else if (existingDepartaments.includes(newDepartamentValue)) {
                                    alert('Название такого Отдела уже существует');
                                    return;
                                }
                                else if (newDepartamentValue.length > 50) {
                                    alert('Слишком большое значение поля Отдел');
                                    return;
                                }
                                else if (!/^[a-zA-Zа-яА-Я_\-]+$/.test(newDepartamentValue)) {
                                    alert("Название Oтдела может содержать буквы, дефисы и подчеркивания");
                                    return;
                                }
                                else if (newDepartamentValue.trim() !== "") {
                                    updateEasyTables("departments", "departments", parseInt(rowId), newDepartamentValue, 0);
                                    setTimeout(async () => {
                                        await displayDepartament(1);
                                        originalCellContent[rowId][0] = newDepartamentValue;

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
                            if (!departamentStatus){
                                alert("Название Отдела не было изменено");
                                return;
                            }
                        })

                        cell.textContent = '';
                        cell.appendChild(departamentInput);
                        cell.appendChild(saveButton);

                        departamentInput.addEventListener('change', function(e) {
                            newDepartamentValue = e.target.value;
                            departamentStatus = true
                            return newDepartamentValue, departamentStatus;
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

export default ChangeDepartament;