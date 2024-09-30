import { getDates } from "../../proto.js";
import { UpdateData } from "../../proto.js";
import { deleteItem } from "../../api.js";
import changeRam from "../changes/changeRam.js";

async function displayRam(item) {
    let workstation = await getDates("workstation");
    let ram = await getDates("ram");
    
    const tableBody = document.getElementById("Ram");
    tableBody.innerHTML = "";

    if (item == 0){
        ram.forEach(ramm => {
            let row = tableBody.insertRow();
            row.setAttribute('id', "ram_row_" + ramm.ram_id)
    
            let cell = row.insertCell(0);
            cell.textContent = `${ramm.ram_capacity} MB`;
        });
    }
    else if (item == 1){
        ram.forEach(ramm => {
            let row = tableBody.insertRow();
            row.setAttribute('id', "ram_row_" + ramm.ram_id)
    
            const cellPencil = row.insertCell(0);
            const buttonEdit = document.createElement("button");
            const imgEdit = new Image();
            imgEdit.src = "./images/pencil.png";
            imgEdit.alt = "Edit";
            buttonEdit.appendChild(imgEdit);
            buttonEdit.id = "RamEditButton" + ramm.ram_id
            cellPencil.appendChild(buttonEdit);
      
            const cellTrashcan = row.insertCell(1);
            const buttonDelete = document.createElement("button");
            const imgDelete = new Image();  
            imgDelete.src = "./images/delete.png";
            imgDelete.alt = "Delete";
            buttonDelete.appendChild(imgDelete);
            buttonDelete.id = "RamDeleteButton" + ramm.ram_id
            buttonDelete.addEventListener("click", async (event) =>{
                const id = parseInt(event.currentTarget.id.split('Button')[1]);
                if (workstation.some(work => work.ram_id === id)) {
                    alert('Эта запись уже используется в другой таблице. Нельзя удалять!');
                    return;
                }
                deleteItem("ram", "ram_id", parseInt(id));
                UpdateData()
                setTimeout(async () => {
                    displayRam(1)
                }, 2000);
            })
            cellTrashcan.appendChild(buttonDelete);
    
            let cell = row.insertCell(2);
            cell.textContent = `${ramm.ram_capacity} MB`;
        });
    }
}

document.addEventListener('click', (event) => {
    if (event.target.id.startsWith('RamEditButton')) {
        const rowId = event.target.id.replace('RamEditButton', '');
        changeRam(rowId, displayRam)
    } else if (event.target.tagName === 'IMG' && event.target.parentElement.tagName === 'BUTTON' && event.target.parentElement.id.startsWith('RamEditButton')) {
        const rowId = event.target.parentElement.id.replace('RamEditButton', '');
        changeRam(rowId, displayRam)
    }
});

export default displayRam