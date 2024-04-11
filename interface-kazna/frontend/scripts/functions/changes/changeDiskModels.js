import { getDates } from "../../proto.js";

let disksbrands = await getDates("disksbrands");
let diskscapasity = await getDates("diskscapasity");

const originalCellContent = {};
let currentEditingRowId = null;
let isCurrentlyEditing = false;

async function changeDiskModels(rowId) {
    const row = document.getElementById("diskmodels_row_" + rowId);

    if (row) {
        if (rowId !== currentEditingRowId) {
            if (isCurrentlyEditing) {
                return;
            }
            if (currentEditingRowId && originalCellContent[currentEditingRowId]) {
                const prevRow = document.getElementById("diskmodels_row_" + currentEditingRowId);
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
                        
                        const selectBrand = document.createElement("select");
                        selectBrand.id = "changeDiskModelBrandSelect"
                        const emptyBrandOption = document.createElement("option");
                        emptyBrandOption.value = "";
                        emptyBrandOption.textContent = "...";
                        selectBrand.appendChild(emptyBrandOption);
                    
                        disksbrands.forEach(brand => {
                            const option = document.createElement("option");
                            option.value = brand.brand_id;
                            option.textContent = brand.brand_name;
                            selectBrand.appendChild(option);

                            if (brand.brand_name.trim() === cell.textContent.trim()) {
                                option.selected = true;
                            }
                        })

                        cell.textContent = '';
                        cell.appendChild(selectBrand);
                    }
                    if (index === 1) {
                        const diskModelInput = document.createElement('input');
                        diskModelInput.value = cell.textContent
                        diskModelInput.id = "diskModelInput"

                        cell.textContent = '';
                        cell.appendChild(diskModelInput);
                    }
                    if (index === 2) {
                        const selectCapasity = document.createElement("select");
                        selectCapasity.id = "changeDiskModelCapasitySelect"
                        const emptyCapasityOption = document.createElement("option");
                        emptyCapasityOption.value = "";
                        emptyCapasityOption.textContent = "...";
                        selectCapasity.appendChild(emptyCapasityOption);

                        diskscapasity.forEach(capacity => {
                            const option = document.createElement("option");
                            option.value = capacity.capasity_id;
                            option.textContent = `${capacity.capasity_name} GB`;
                            selectCapasity.appendChild(option);

                            if (`${capacity.capasity_name} GB` === cell.textContent.trim()) {
                                option.selected = true;
                            }
                        });

                        const saveButton = document.createElement('button');
                        saveButton.textContent = 'Сохранить';
                        saveButton.id = "diskBrandSaveButton"

                        cell.textContent = '';
                        cell.appendChild(selectCapasity);
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

export default changeDiskModels;
