async function SelectModels(stantionsmodels) {
    const selectElement = document.getElementById("selectModel");
    selectElement.innerHTML = "";

    const firstOption = document.createElement("option");
    firstOption.value = "";
    firstOption.textContent = "Выберите модель";
    selectElement.appendChild(firstOption);

    stantionsmodels.forEach((model) => {
        const option = document.createElement("option");
        option.value = model.model_id;
        option.textContent = model.model_name;
        selectElement.appendChild(option);
    });
}

export default SelectModels