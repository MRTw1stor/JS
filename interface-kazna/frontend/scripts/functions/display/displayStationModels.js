import { getDates } from "../../proto.js";
import { UpdateData } from "../../proto.js";
import { deleteItem } from "../../api.js";
import changeStationModels from "../changes/changeStationModels.js";

async function displayStationModels() {
    let workstation = await getDates("workstation");
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
        cellPencil.appendChild(buttonEdit);
  
        const cellTrashcan = row.insertCell(1);
        const buttonDelete = document.createElement("button");
        const imgDelete = new Image();  
        imgDelete.src = "./images/delete.png";
        imgDelete.alt = "Delete";
        buttonDelete.appendChild(imgDelete);
        buttonDelete.id = "StationModelsDeleteButton" + model.model_id
        buttonDelete.addEventListener("click", async (event) =>{
            const id = parseInt(event.currentTarget.id.split('Button')[1]);
            if (workstation.some(work => work.model_id === id)) {
                alert('Эта запись уже используется в другой таблице. Нельзя удалять!');
                return;
            }
            deleteItem("stantionsmodels", "model_id", parseInt(id));
            UpdateData()
            setTimeout(async () => {
                displayStationModels()
            }, 2000);
        })
        cellTrashcan.appendChild(buttonDelete);

        let cell = row.insertCell(2);
        cell.textContent = model.model_name;
    });
}

document.addEventListener('click', (event) => {
    if (event.target.id.startsWith('StationModelsEditButton')) {
        const rowId = event.target.id.replace('StationModelsEditButton', '');
        changeStationModels(rowId)
    } else if (event.target.tagName === 'IMG' && event.target.parentElement.tagName === 'BUTTON' && event.target.parentElement.id.startsWith('StationModelsEditButton')) {
        const rowId = event.target.parentElement.id.replace('StationModelsEditButton', '');
        changeStationModels(rowId)
    }
});

export default displayStationModels