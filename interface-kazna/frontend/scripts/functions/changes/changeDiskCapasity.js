const originalCellContent = {};
let currentEditingRowId = null;
let isCurrentlyEditing = false;

async function changeDiskCapasity(rowId) {
    const row = document.getElementById("diskcapasity_row_" + rowId);

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

            currentEditingRowId = rowId;
            isCurrentlyEditing = true;

            if (!originalCellContent[rowId] || Object.keys(originalCellContent[rowId]).length === 0) {
                originalCellContent[rowId] = {};
                Array.from(row.children).slice(2).forEach((cell, index) => {
                    originalCellContent[rowId][index] = cell.textContent;
                    if (index === 0) {
                        
                        const saveButton = document.createElement('button');
                        saveButton.textContent = 'Сохранить';
                        saveButton.id = "diskCapasitySaveButton"
                        const diskCapasityInput = document.createElement('input');
                        diskCapasityInput.value = cell.textContent.replace(' GB', '')
                        diskCapasityInput.type = "number"
                        diskCapasityInput.id = "diskCapasityInput"

                        cell.textContent = '';
                        cell.appendChild(diskCapasityInput);
                        cell.appendChild(saveButton);
                    }
                });
            }
        }
        else {
            currentEditingRowId = null;
            isCurrentlyEditing = false;
            Array.from(row.children).slice(2).forEach((cell, index) => {
                cell.textContent = originalCellContent[rowId][index];
            });
            originalCellContent[rowId] = {};
        }
    }
}

export default changeDiskCapasity;
