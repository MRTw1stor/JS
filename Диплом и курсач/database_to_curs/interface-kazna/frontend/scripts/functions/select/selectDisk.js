async function SelectDisks(disksbrands, disksmodels, diskscapasity) {
    const selectElement = document.getElementById("ComputerSelectDates3");
    selectElement.innerHTML = "";

    const firstOption = document.createElement("option");
    firstOption.value = 0;
    firstOption.textContent = "Выберите диск";
    selectElement.appendChild(firstOption);

    disksbrands.forEach((brand) => {
        const modelsForBrand = disksmodels.filter((model) => model.brand_id === brand.brand_id);
        modelsForBrand.forEach((model) => {
            const modelOption = document.createElement("option");
            modelOption.value = model.model_id;
            modelOption.textContent = `${brand.brand_name} ${model.model_name}`;
            selectElement.appendChild(modelOption);
        });
    });

    selectElement.addEventListener("change", (event) => {
        if (event.target.value === "") {
            const diskCapasity = document.getElementById("diskCapasity");
            diskCapasity.textContent = "";
        } else {
            const selectedModelId = parseInt(event.target.value);
            const selectedModel = disksmodels.find((model) => model.model_id === selectedModelId);
            const diskCapasity = document.getElementById("diskCapasity");
            const capasity = diskscapasity.find((capasity) => capasity.capasity_id === selectedModel.capasity_id);
            diskCapasity.textContent = `${capasity.capasity_name} GB`;
        }
    });
}

export default SelectDisks