async function SelectOC(os) {
    const selectElement = document.getElementById("selectOC");
    selectElement.innerHTML = "";

    const firstOption = document.createElement("option");
    firstOption.value = 0;
    firstOption.textContent = "Выберите ОС";
    selectElement.appendChild(firstOption);

    os.forEach((osi) => {
        const option = document.createElement("option");
        option.value = osi.operatingsystem_id;
        option.textContent = osi.operatingsystem_name;
        selectElement.appendChild(option);
    });
}

export default SelectOC