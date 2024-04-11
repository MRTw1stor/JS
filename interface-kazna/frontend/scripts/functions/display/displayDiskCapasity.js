import { getDates } from "../../proto.js";
import { UpdateData } from "../../proto.js";
import { deleteItem } from "../../api.js";
import changeDiskCapasity from "../changes/changeDiskCapasity.js";

async function displayDiskCapasity() {
    let diskscapasity = await getDates("diskscapasity");
    let disksmodels = await getDates("disksmodels");

    const tableBody = document.getElementById("DiskCapasity");
    tableBody.innerHTML = "";

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
        buttonDelete.addEventListener("click", async (event) =>{
            const id = parseInt(event.currentTarget.id.split('Button')[1]);
            if (disksmodels.some(model => model.capasity_id === id)) {
                alert('Эта запись уже используется в другой таблице. Нельзя удалять!');
                return;
            }
            deleteItem("diskscapasity", "capasity_id", parseInt(id));
            UpdateData()
            setTimeout(async () => {
                displayDiskCapasity()
            }, 2000);
        })
        cellTrashcan.appendChild(buttonDelete);

        let cell = row.insertCell(2);
        cell.textContent = `${capasity.capasity_name} GB`;
    });
}

document.addEventListener('click', (event) => {
    if (event.target.id.startsWith('DiskCapasityEditButton')) {
        const rowId = event.target.id.replace('DiskCapasityEditButton', '');
        changeDiskCapasity(rowId)
    } else if (event.target.tagName === 'IMG' && event.target.parentElement.tagName === 'BUTTON' && event.target.parentElement.id.startsWith('DiskCapasityEditButton')) {
        const rowId = event.target.parentElement.id.replace('DiskCapasityEditButton', '');
        changeDiskCapasity(rowId)
    }
});

export default displayDiskCapasity