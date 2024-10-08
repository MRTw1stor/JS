import { getDates } from "../../proto.js";

async function displayDiskCapasity(item) {
    let diskscapasity = await getDates("diskscapasity");

    const tableBody = document.getElementById("DiskCapasity");
    tableBody.innerHTML = "";

    if (item == 0){
        diskscapasity.forEach(capasity => {
            let row = tableBody.insertRow();
            row.setAttribute('id', "diskcapasity_row_" + capasity.capasity_id)
    
            let cell = row.insertCell(0);
            cell.textContent = `${capasity.capasity_name} GB`;
        });
    }
    else if (item == 1){
        diskscapasity.forEach(capasity => {
            let row = tableBody.insertRow();
            row.setAttribute('id', "diskcapasity_row_" + capasity.capasity_id)
    
            const cellPencil = row.insertCell(0);
            const buttonEdit = document.createElement("button");
            const imgEdit = new Image();
            imgEdit.src = "./images/pencil.png";
            imgEdit.alt = "Edit";
            buttonEdit.appendChild(imgEdit);
            buttonEdit.id = "DiskCapasityEditButton" + capasity.capasity_id;
            cellPencil.appendChild(buttonEdit);
      
            const cellTrashcan = row.insertCell(1);
            const buttonDelete = document.createElement("button");
            const imgDelete = new Image();
            imgDelete.src = "./images/delete.png";
            imgDelete.alt = "Delete";
            buttonDelete.appendChild(imgDelete);
            buttonDelete.id = "DiskCapasityDeleteButton" + capasity.capasity_id;
            cellTrashcan.appendChild(buttonDelete);
    
            let cell = row.insertCell(2);
            cell.textContent = `${capasity.capasity_name} GB`;
        });
    }
}

export default displayDiskCapasity