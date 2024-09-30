import { getDates } from "../../proto.js";
import { updateEasyTables } from "../../api.js";

const originalCellContent = {};
let currentEditingRowId = null;
let isCurrentlyEditing = false;

async function changeConturs(rowId, displayConturs) {
    const row = document.getElementById("conturs_row_" + rowId);

    let conturs = await getDates("conturs");
    const existingConturs = conturs.map(con => con.contur_name);

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
            let contursStatus = false
            let newContursValue = ""

            currentEditingRowId = rowId;
            isCurrentlyEditing = true;

            if (!originalCellContent[rowId] || Object.keys(originalCellContent[rowId]).length === 0) {
                originalCellContent[rowId] = {};
                Array.from(row.children).slice(2).forEach((cell, index) => {
                    originalCellContent[rowId][index] = cell.textContent;
                    if (index === 0) {
                        
                        const conturInput = document.createElement('input');
                        conturInput.value = cell.textContent
                        conturInput.id = "conturInput"
                        const saveButton = document.createElement('button');
                        saveButton.textContent = 'Сохранить';
                        saveButton.id = "conturSaveButton"
                        saveButton.addEventListener("click", async () =>{
                            if (contursStatus){
                                if (newContursValue.trim() == "") {
                                    alert("Новое значение поля Контур не может быть пустым");
                                    return;
                                }
                                else if (existingConturs.includes(newContursValue)) {
                                    alert('Название такого Контура уже существует');
                                    return;
                                }
                                else if (newContursValue.length > 25) {
                                    alert('Слишком большое значение поля Контур');
                                    return;
                                }
                                else if (!/^[a-zA-Zа-яА-Я0-9\s.]+$/.test(newContursValue)) {
                                    alert("Название Контура может содержать буквы, цифры, точки");
                                    return;
                                }
                                else if (newContursValue.trim() !== "") {
                                    updateEasyTables("conturs", "conturs", parseInt(rowId), newContursValue, 0);
                                    setTimeout(async () => {
                                        await displayConturs(1);
                                        originalCellContent[rowId][0] = newContursValue;

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
                            if (!contursStatus){
                                alert("Название Контура не было изменено");
                                return;
                            }
                        })

                        cell.textContent = '';
                        cell.appendChild(conturInput);
                        cell.appendChild(saveButton);

                        conturInput.addEventListener('change', function(e) {
                            newContursValue = e.target.value;
                            contursStatus = true
                            return newContursValue, contursStatus;
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

export default changeConturs;
