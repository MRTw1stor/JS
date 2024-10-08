import { getDates } from "../../proto.js";

async function displayStationModels(item) {
    let stantionsmodels = await getDates("stantionsmodels");

    const tableBody = document.getElementById("StationModels");
    tableBody.innerHTML = "";

    if (item == 0){
        stantionsmodels.forEach(model => {
            let row = tableBody.insertRow();
            row.setAttribute('id', "stationmodels_row_" + model.model_id)
    
            let cell = row.insertCell(0);
            cell.textContent = model.model_name;
        });
    }
    else if (item == 1){
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
}

export default displayStationModels