async function SelectConturs(conturs) {
    const selectElement = document.getElementById("selectContur");
    selectElement.innerHTML = "";

    const firstOption = document.createElement("option");
    firstOption.value = 0;
    firstOption.textContent = "Выберите контур";
    selectElement.appendChild(firstOption);

    conturs.forEach((con) => {
        const option = document.createElement("option");
        option.value = con.contur_id;
        option.textContent = con.contur_name;
        selectElement.appendChild(option);
    });
}

export default SelectConturs