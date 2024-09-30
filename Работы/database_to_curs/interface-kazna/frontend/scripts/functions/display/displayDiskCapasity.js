import { getDates } from "../../proto.js";
import changeDiskCapasity from "../changes/changeDiskCapasity.js";

async function displayDiskCapasity() {
    let diskscapasity = await getDates("diskscapasity");

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
        cellTrashcan.appendChild(buttonDelete);

        let cell = row.insertCell(2);
        cell.textContent = `${capasity.capasity_name} GB`;
    });
}

document.addEventListener('click', (event) => {
    if (event.target.id.startsWith('DiskCapasityEditButton')) {
        const rowId = event.target.id.replace('DiskCapasityEditButton', '');
        changeDiskCapasity(rowId, displayDiskCapasity)
    } else if (event.target.tagName === 'IMG' && event.target.parentElement.tagName === 'BUTTON' && event.target.parentElement.id.startsWith('DiskCapasityEditButton')) {
        const rowId = event.target.parentElement.id.replace('DiskCapasityEditButton', '');
        changeDiskCapasity(rowId, displayDiskCapasity)
    }
});

export default displayDiskCapasity