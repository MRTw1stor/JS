import { getDates } from "../../proto.js";

async function displayDepartament(item) {
    let departments = await getDates("departments");
    
    const tableBody = document.getElementById("Departament");
    tableBody.innerHTML = "";

    if (item == 0){
        departments.forEach(dep => {
            let row = tableBody.insertRow();
            row.setAttribute('id', "departament_row_" + dep.department_id)
    
            let cell = row.insertCell(0);
            cell.textContent = dep.department_name;
        });
    }
    else if (item == 1){
        departments.forEach(dep => {
            let row = tableBody.insertRow();
            row.setAttribute('id', "departament_row_" + dep.department_id)
    
            const cellPencil = row.insertCell(0);
            const buttonEdit = document.createElement("button");
            const imgEdit = new Image();
            imgEdit.src = "./images/pencil.png";
            imgEdit.alt = "Edit";
            buttonEdit.appendChild(imgEdit);
            buttonEdit.id = "DepartamentEditButton" + dep.department_id;
            cellPencil.appendChild(buttonEdit);
      
            const cellTrashcan = row.insertCell(1);
            const buttonDelete = document.createElement("button");
            const imgDelete = new Image();
            imgDelete.src = "./images/delete.png";
            imgDelete.alt = "Delete";
            buttonDelete.appendChild(imgDelete);
            buttonDelete.id = "DepartamentDeleteButton" + dep.department_id;
            cellTrashcan.appendChild(buttonDelete);
    
            let cell = row.insertCell(2);
            cell.textContent = dep.department_name;
        });
    }
}

export default displayDepartament