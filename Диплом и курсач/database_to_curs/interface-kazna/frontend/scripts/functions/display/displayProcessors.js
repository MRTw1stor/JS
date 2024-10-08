import { getDates } from "../../proto.js";

async function displayProcessors(item) {
    let processor = await getDates("processors");

    const tableBody = document.getElementById("Processors");
    tableBody.innerHTML = "";

    if (item == 0){
        processor.forEach(proc => {
            let row = tableBody.insertRow();
            row.setAttribute('id', "processors_row_" + proc.processor_id)
    
            let cell = row.insertCell(0);
            cell.textContent = proc.processor_name;
        });
    }
    else if (item == 1){
        processor.forEach(proc => {
            let row = tableBody.insertRow();
            row.setAttribute('id', "processors_row_" + proc.processor_id)
    
            const cellPencil = row.insertCell(0);
            const buttonEdit = document.createElement("button");
            const imgEdit = new Image();
            imgEdit.src = "./images/pencil.png";
            imgEdit.alt = "Edit";
            buttonEdit.appendChild(imgEdit);
            buttonEdit.id = "ProcessorsEditButton" + proc.processor_id;
            cellPencil.appendChild(buttonEdit);
      
            const cellTrashcan = row.insertCell(1);
            const buttonDelete = document.createElement("button");
            const imgDelete = new Image();  
            imgDelete.src = "./images/delete.png";
            imgDelete.alt = "Delete";
            buttonDelete.appendChild(imgDelete);
            buttonDelete.id = "ProcessorsDeleteButton" + proc.processor_id;
            cellTrashcan.appendChild(buttonDelete);
    
            let cell = row.insertCell(2);
            cell.textContent = proc.processor_name;
        });
    }
}

export default displayProcessors