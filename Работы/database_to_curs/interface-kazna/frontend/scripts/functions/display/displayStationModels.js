import { getDates } from "../../proto.js";
import changeStationModels from "../changes/changeStationModels.js";

async function displayStationModels() {
    let stantionsmodels = await getDates("stantionsmodels");

    const tableBody = document.getElementById("StationModels");
    tableBody.innerHTML = "";

    stantionsmodels.forEach(model => {
        let row = tableBody.insertRow();
        row.setAttribute('id', "stationmodels_row_" + model.model_id)

        const cellPencil = row.insertCell(0);
        const buttonEdit = document.createElement("button");
        const imgEdit = new Image();
        imgEdit.src = "./images/pencil.png";
        imgEdit.alt = "Edit";
        buttonEdit.appendChild(imgEdit);
        buttonEdit.id = "StationModelsEditButton" + model.model_id
        buttonEdit.classList = "StationModelsEditButton"
        cellPencil.appendChild(buttonEdit);
  
        const cellTrashcan = row.insertCell(1);
        const buttonDelete = document.createElement("button");
        const imgDelete = new Image();  
        imgDelete.src = "./images/delete.png";
        imgDelete.alt = "Delete";
        buttonDelete.appendChild(imgDelete);
        buttonDelete.id = "StationModelsDeleteButton" + model.model_id
        buttonDelete.className = "StationModelsDeleteButton"
        cellTrashcan.appendChild(buttonDelete);

        let cell = row.insertCell(2);
        cell.textContent = model.model_name;
    });
}

document.addEventListener('click', (event) => {
    if (event.target.id.startsWith('StationModelsEditButton')) {
        const rowId = event.target.id.replace('StationModelsEditButton', '');
        changeStationModels(rowId, displayStationModels)
    } else if (event.target.tagName === 'IMG' && event.target.parentElement.tagName === 'BUTTON' && event.target.parentElement.id.startsWith('StationModelsEditButton')) {
        const rowId = event.target.parentElement.id.replace('StationModelsEditButton', '');
        changeStationModels(rowId, displayStationModels)
    }
});

export default displayStationModels