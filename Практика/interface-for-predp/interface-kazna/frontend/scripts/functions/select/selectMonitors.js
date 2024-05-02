async function SelectMonitors(monitorbrands, monitormodels) {
    const selectElement = document.getElementById("selectMonitor");
    selectElement.innerHTML = "";

    const firstOption = document.createElement("option");
    firstOption.value = 0;
    firstOption.textContent = "Выберите монитор";
    selectElement.appendChild(firstOption);

    monitorbrands.forEach((brand) => {
        const modelsForBrand = monitormodels.filter((model) => model.brand_id === brand.brand_id);
        modelsForBrand.forEach((model) => {
            const modelOption = document.createElement("option");
            modelOption.value = model.model_id;
            modelOption.textContent = `${brand.brand_name} ${model.model_name}`;
            selectElement.appendChild(modelOption);
        });
    });
}

export default SelectMonitors