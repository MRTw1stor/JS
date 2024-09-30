import { getDates } from "../../proto.js";
import changeMonitorBrands from "../changes/changeMonitorBrands.js";

async function displayMonitorBrands() {
    let monitorbrands = await getDates("monitorbrands");

    const tableBody = document.getElementById("MonitorBrands");
    tableBody.innerHTML = "";

    monitorbrands.forEach(brand => {
        const row = tableBody.insertRow();
        row.setAttribute('id', "monitorbrands_row_" + brand.brand_id)

        const cellPencil = row.insertCell(0);
        const buttonEdit = document.createElement("button");
        const imgEdit = new Image();
        imgEdit.src = "./images/pencil.png";
        imgEdit.alt = "Edit";
        buttonEdit.appendChild(imgEdit);
        buttonEdit.id = "MonitorBrandsEditButton" + brand.brand_id;
        cellPencil.appendChild(buttonEdit);
  
        const cellTrashcan = row.insertCell(1);
        const buttonDelete = document.createElement("button");
        const imgDelete = new Image();
        imgDelete.src = "./images/delete.png";
        imgDelete.alt = "Delete";
        buttonDelete.appendChild(imgDelete);
        buttonDelete.id = "MonitorBrandsDeleteButton" + brand.brand_id;
        cellTrashcan.appendChild(buttonDelete);
  
        const cellBrandName = row.insertCell(2);
        cellBrandName.textContent = brand.brand_name;
    });
}
  
document.addEventListener('click', (event) => {
    if (event.target.id.startsWith('MonitorBrandsEditButton')) {
        const rowId = event.target.id.replace('MonitorBrandsEditButton', '');
        changeMonitorBrands(rowId, displayMonitorBrands)
    } else if (event.target.tagName === 'IMG' && event.target.parentElement.tagName === 'BUTTON' && event.target.parentElement.id.startsWith('MonitorBrandsEditButton')) {
        const rowId = event.target.parentElement.id.replace('MonitorBrandsEditButton', '');
        changeMonitorBrands(rowId, displayMonitorBrands)
    }
});

export default displayMonitorBrands;  