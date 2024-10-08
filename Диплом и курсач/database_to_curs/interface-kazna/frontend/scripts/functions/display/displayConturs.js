import { getDates } from "../../proto.js";

async function displayConturs(item) {
    let conturs = await getDates("conturs");

    const tableBody = document.getElementById("Conturs");
    tableBody.innerHTML = "";

    if (item == 0){
        conturs.forEach(con => {
            let row = tableBody.insertRow();
            row.setAttribute('id', "conturs_row_" + con.contur_id)
    
            let cell = row.insertCell(0);
            cell.textContent = con.contur_name;
        });
    }
    else if (item == 1){
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
}

export default displayConturs