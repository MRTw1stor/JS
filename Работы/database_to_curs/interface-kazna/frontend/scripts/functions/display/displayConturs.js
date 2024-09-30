import { getDates } from "../../proto.js";
import changeConturs from "../changes/changeContur.js";

async function displayConturs() {
    let conturs = await getDates("conturs");

    const tableBody = document.getElementById("Conturs");
    tableBody.innerHTML = "";

    conturs.forEach(con => {
        let row = tableBody.insertRow();
        row.setAttribute('id', "conturs_row_" + con.contur_id)

        const cellPencil = row.insertCell(0);
        const buttonEdit = document.createElement("button");
        const imgEdit = new Image();
        imgEdit.src = "./images/pencil.png";
        imgEdit.alt = "Edit";
        buttonEdit.appendChild(imgEdit);
        buttonEdit.id = "ContursEditButton" + con.contur_id;
        cellPencil.appendChild(buttonEdit);
  
        const cellTrashcan = row.insertCell(1);
        const buttonDelete = document.createElement("button");
        const imgDelete = new Image();  
        imgDelete.src = "./images/delete.png";
        imgDelete.alt = "Delete";
        buttonDelete.appendChild(imgDelete);
        buttonDelete.id = "ContursDeleteButton" + con.contur_id;
        cellTrashcan.appendChild(buttonDelete);

        let cell = row.insertCell(2);
        cell.textContent = con.contur_name;
    });
}

document.addEventListener('click', (event) => {
    if (event.target.id.startsWith('ContursEditButton')) {
        const rowId = event.target.id.replace('ContursEditButton', '');
        changeConturs(rowId, displayConturs)
    } else if (event.target.tagName === 'IMG' && event.target.parentElement.tagName === 'BUTTON' && event.target.parentElement.id.startsWith('ContursEditButton')) {
        const rowId = event.target.parentElement.id.replace('ContursEditButton', '');
        changeConturs(rowId, displayConturs)
    }
});

export default displayConturs