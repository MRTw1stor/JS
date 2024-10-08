async function SelectDepartament(departments) {
    const selectElement = document.getElementById("selectDepartament");
    selectElement.innerHTML = "";

    const firstOption = document.createElement("option");
    firstOption.value = "";
    firstOption.textContent = "Выберите отдел";
    selectElement.appendChild(firstOption);

    departments.forEach((dep) => {
        const option = document.createElement("option");
        option.value = dep.department_id;
        option.textContent = dep.department_name;
        selectElement.appendChild(option);
    });
}

export default SelectDepartament