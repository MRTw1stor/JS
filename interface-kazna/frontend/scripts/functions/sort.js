function SortTable(table, columnIndex, order) {
    const tbody = table.querySelector("tbody");
    const rows = Array.from(tbody.rows);

    rows.sort((a, b) => {
        const textA = a.cells[columnIndex].textContent.trim();
        const textB = b.cells[columnIndex].textContent.trim();

        if (!isNaN(textA) && !isNaN(textB)) {
            return order === 'ascending' ? Number(textA) - Number(textB) : Number(textB) - Number(textA);
        } else {
            return order === 'ascending' ? textA.localeCompare(textB) : textB.localeCompare(textA);
        }
    });

    tbody.innerHTML = "";
    rows.forEach(row => {
        tbody.appendChild(row);
    });
}

export default SortTable