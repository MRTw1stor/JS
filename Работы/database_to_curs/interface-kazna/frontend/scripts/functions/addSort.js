const originalOrder = {};

function addSortButtonsToTable(SortTable) {
    const table = document.getElementById("Computer");
    const tableHeaders = table.querySelectorAll("th");
    const existingSelects = table.querySelectorAll("select");
    existingSelects.forEach(select => select.remove());

    tableHeaders.forEach((header, columnIndex) => {
        originalOrder[columnIndex] = Array.from(table.rows).slice(1);
    });

    tableHeaders.forEach((header, columnIndex) => {
        if (columnIndex > 2) {
            const select = document.createElement("select");
            const optionCancel = new Option("Стандарт", "cancel");
            const optionAscending = new Option("По возрастанию", "ascending");
            const optionDescending = new Option("По убыванию", "descending");

            select.appendChild(optionCancel);
            select.appendChild(optionAscending);
            select.appendChild(optionDescending);
            header.appendChild(select);

            select.addEventListener('change', () => {
                const selectedValue = select.value;
            
                if (selectedValue === "cancel") {
                    resetTableOrder(table, columnIndex);
                } else {
                    tableHeaders.forEach((otherHeader, index) => {
                        if (index !== columnIndex) {
                            const otherSelect = otherHeader.querySelector("select");
                            if (otherSelect && otherSelect.value !== "cancel") {
                                otherSelect.value = "cancel";
                            }
                        }
                    });
                    SortTable(table, columnIndex, selectedValue);
                }
            });
        }
    });
}

function resetTableOrder(table, columnIndex) {
    const rows = originalOrder[columnIndex];
    const tbody = table.querySelector("tbody");
        
    tbody.innerHTML = "";
    rows.forEach(row => {
        tbody.appendChild(row);
    });
}

export default addSortButtonsToTable