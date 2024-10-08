function FilterTable() {
    const table = document.getElementById("Computer");
    const rows = Array.from(table.rows).slice(1);
  
    rows.forEach(row => {
        let isRowVisible = true;
        Array.from(row.cells).forEach((cell, index) => {
            const input = table.querySelector(`#Computer th:nth-child(${index + 1}) input`);
            if (input && input.value !== "" && !cell.textContent.toLowerCase().includes(input.value.toLowerCase())) {
                isRowVisible = false; 
            }
        });
        row.style.display = isRowVisible ? "" : "none";
    });
}

export default FilterTable