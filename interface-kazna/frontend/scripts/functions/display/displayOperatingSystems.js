import { getDates } from "../../proto.js";
import { UpdateData } from "../../proto.js";
import { deleteItem } from "../../api.js";
import changeOperatingSystems from "../changes/changeOperatingSystems.js";

async function displayOperatingSystems() {
    let workstation = await getDates("workstation");
    let os = await getDates("operatingsystems");

    const tableBody = document.getElementById("OperatingSystems");
    tableBody.innerHTML = "";

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
        buttonDelete.addEventListener("click", async (event) =>{
            const id = parseInt(event.currentTarget.id.split('Button')[1]);
            if (workstation.some(work => work.station_os === id)) {
                alert('Эта запись уже используется в другой таблице. Нельзя удалять!');
                return;
            }
            deleteItem("operatingsystems", "operatingsystem_id", parseInt(id));
            UpdateData()
            setTimeout(async () => {
                displayOperatingSystems()
            }, 2000);
        })
        cellTrashcan.appendChild(buttonDelete);

        let cell = row.insertCell(2);
        cell.textContent = osi.operatingsystem_name;
    });
}

document.addEventListener('click', (event) => {
    if (event.target.id.startsWith('OperatingSystemsEditButton')) {
        const rowId = event.target.id.replace('OperatingSystemsEditButton', '');
        changeOperatingSystems(rowId)
    } else if (event.target.tagName === 'IMG' && event.target.parentElement.tagName === 'BUTTON' && event.target.parentElement.id.startsWith('OperatingSystemsEditButton')) {
        const rowId = event.target.parentElement.id.replace('OperatingSystemsEditButton', '');
        changeOperatingSystems(rowId)
    }
});

export default displayOperatingSystems