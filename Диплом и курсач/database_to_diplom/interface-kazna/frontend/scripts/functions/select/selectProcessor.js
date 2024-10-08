async function SelectProcessor(processor) {
    const selectElement = document.getElementById("ComputerSelectDates1");
    selectElement.innerHTML = "";

    const firstOption = document.createElement("option");
    firstOption.value = 0;
    firstOption.textContent = "Выберите процессор";
    selectElement.appendChild(firstOption);

    processor.forEach((proc) => {
        const option = document.createElement("option");
        option.value = proc.processor_id;
        option.textContent = proc.processor_name;
        selectElement.appendChild(option);
    });
}

export default SelectProcessor