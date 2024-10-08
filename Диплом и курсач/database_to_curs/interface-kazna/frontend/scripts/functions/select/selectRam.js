async function SelectRam(ram) {
    const selectElement = document.getElementById("ComputerSelectDates2");
    selectElement.innerHTML = "";

    const firstOption = document.createElement("option");
    firstOption.value = 0;
    firstOption.textContent = "Выберите объем памяти";
    selectElement.appendChild(firstOption);

    ram.forEach((ramm) => {
        const option = document.createElement("option");
        option.value = ramm.ram_id;
        option.textContent = `${ramm.ram_capacity} MB`;
        selectElement.appendChild(option);
    });
}

export default SelectRam