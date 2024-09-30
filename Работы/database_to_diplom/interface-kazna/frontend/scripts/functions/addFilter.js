function addFilterInputsToTable(FilterTable) {
    const tableHeaders = document.querySelectorAll("#Computer th");

    const existingInputs = document.querySelectorAll("#Computer th input");
    existingInputs.forEach(input => input.remove());

    tableHeaders.forEach((header, index) => {
        if (index > 2) {
            const input = document.createElement("input");
            input.type = "text";
            input.placeholder = "Сортировать...";
            header.appendChild(input);

            input.addEventListener('input', () => {
                FilterTable(header.cellIndex, input.value);
            });
        }
    });
}

export default addFilterInputsToTable