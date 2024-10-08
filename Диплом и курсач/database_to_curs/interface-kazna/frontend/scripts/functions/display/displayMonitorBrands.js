import { getDates } from "../../proto.js";

async function displayMonitorBrands(item) {
    let monitorbrands = await getDates("monitorbrands");

    const tableBody = document.getElementById("MonitorBrands");
    tableBody.innerHTML = "";

    if (item == 0){
        monitorbrands.forEach(brand => {
            const row = tableBody.insertRow();
            row.setAttribute('id', "monitorbrands_row_" + brand.brand_id)
      
            const cellBrandName = row.insertCell(0);
            cellBrandName.textContent = brand.brand_name;
        });
    }
    else if (item == 1){
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
}

export default displayMonitorBrands;  