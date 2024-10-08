import { getDates } from "../../proto.js";

async function displayOperatingSystems(item) {
    let os = await getDates("operatingsystems");

    const tableBody = document.getElementById("OperatingSystems");
    tableBody.innerHTML = "";

    if (item == 0){
        os.forEach(osi => {
            let row = tableBody.insertRow();
            row.setAttribute('id', "operatingsystems_row_" + osi.operatingsystem_id)
    
            let cell = row.insertCell(0);
            cell.textContent = osi.operatingsystem_name;
        });
    }
    else if (item == 1){
        os.forEach(osi => {
            let row = tableBody.insertRow();
            row.setAttribute('id', "operatingsystems_row_" + osi.operatingsystem_id)
    
            const cellPencil = row.insertCell(0);
            const buttonEdit = document.createElement("button");
            const imgEdit = new Image();
            imgEdit.src = "./images/pencil.png";
            imgEdit.alt = "Edit";
            buttonEdit.appendChild(imgEdit);
            buttonEdit.id = "OperatingSystemsEditButton" + osi.operatingsystem_id;
            cellPencil.appendChild(buttonEdit);
      
            const cellTrashcan = row.insertCell(1);
            const buttonDelete = document.createElement("button");
            const imgDelete = new Image();  
            imgDelete.src = "./images/delete.png";
            imgDelete.alt = "Delete";
            buttonDelete.appendChild(imgDelete);
            buttonDelete.id = "OperatingSystemsDeleteButton" + osi.operatingsystem_id;
            cellTrashcan.appendChild(buttonDelete);
    
            let cell = row.insertCell(2);
            cell.textContent = osi.operatingsystem_name;
        });
    }
}

export default displayOperatingSystems