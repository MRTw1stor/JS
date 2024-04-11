import { getDates } from "../../proto.js";
import { UpdateData } from "../../proto.js";
import { deleteItem } from "../../api.js";
import changeMonitorBrands from "../changes/changeMonitorBrands.js";

async function displayMonitorBrands() {
    let monitorbrands = await getDates("monitorbrands");
    let monitormodels = await getDates("monitormodels")

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
        buttonDelete.addEventListener("click", async (event) =>{
            const id = parseInt(event.currentTarget.id.split('Button')[1]);
            if (monitormodels.some(model => model.brand_id === id)) {
                alert('Эта запись уже используется в другой таблице. Нельзя удалять!');
                return;
            }
            deleteItem("monitorbrands", "brand_id", parseInt(id));
            UpdateData()
            setTimeout(async () => {
                displayMonitorBrands()
            }, 2000);
        })
        cellTrashcan.appendChild(buttonDelete);
  
        const cellBrandName = row.insertCell(2);
        cellBrandName.textContent = brand.brand_name;
    });
}
  
document.addEventListener('click', (event) => {
    if (event.target.id.startsWith('MonitorBrandsEditButton')) {
        const rowId = event.target.id.replace('MonitorBrandsEditButton', '');
        changeMonitorBrands(rowId)
    } else if (event.target.tagName === 'IMG' && event.target.parentElement.tagName === 'BUTTON' && event.target.parentElement.id.startsWith('MonitorBrandsEditButton')) {
        const rowId = event.target.parentElement.id.replace('MonitorBrandsEditButton', '');
        changeMonitorBrands(rowId)
    }
});

export default displayMonitorBrands;  