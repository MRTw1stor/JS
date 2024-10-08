import { getDates } from "../../proto.js";
import { UpdateData } from "../../proto.js";
import { deleteItem } from "../../api.js";
import changeProcessors from "../changes/changeProcessors.js";

async function displayProcessors(item) {
    let workstation = await getDates("workstation");
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
            buttonDelete.addEventListener("click", async (event) =>{
                const id = parseInt(event.currentTarget.id.split('Button')[1]);
                if (workstation.some(work => work.processor_id === id)) {
                    alert('Эта запись уже используется в другой таблице. Нельзя удалять!');
                    return;
                }
                deleteItem("processors", "processor_id", parseInt(id));
                UpdateData()
                setTimeout(async () => {
                    displayProcessors(1)
                }, 2000);
            })
            cellTrashcan.appendChild(buttonDelete);
    
            let cell = row.insertCell(2);
            cell.textContent = proc.processor_name;
        });
    }
}

document.addEventListener('click', (event) => {
    if (event.target.id.startsWith('ProcessorsEditButton')) {
        const rowId = event.target.id.replace('ProcessorsEditButton', '');
        changeProcessors(rowId, displayProcessors)
    } else if (event.target.tagName === 'IMG' && event.target.parentElement.tagName === 'BUTTON' && event.target.parentElement.id.startsWith('ProcessorsEditButton')) {
        const rowId = event.target.parentElement.id.replace('ProcessorsEditButton', '');
        changeProcessors(rowId, displayProcessors)
    }
});

export default displayProcessors