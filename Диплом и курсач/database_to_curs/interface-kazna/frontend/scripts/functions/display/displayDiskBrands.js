import { getDates } from "../../proto.js";

async function displayDiskBrands(item) {
    let disksbrands = await getDates("disksbrands");

    const tableBody = document.getElementById("DiskBrand");
    tableBody.innerHTML = "";

    if (item == 0){
        disksbrands.forEach(brand => {
            let row = tableBody.insertRow();
            row.setAttribute('id', "diskbrand_row_" + brand.brand_id)
    
            let cell = row.insertCell(0);
            cell.textContent = brand.brand_name;
        });
    }
    else if (item == 1){
        disksbrands.forEach(brand => {
            let row = tableBody.insertRow();
            row.setAttribute('id', "diskbrand_row_" + brand.brand_id)
    
            const cellPencil = row.insertCell(0);
            const buttonEdit = document.createElement("button");
            const imgEdit = new Image();
            imgEdit.src = "./images/pencil.png";
            imgEdit.alt = "Edit";
            buttonEdit.appendChild(imgEdit);
            buttonEdit.id = "DiskBrandEditButton" + brand.brand_id;
            cellPencil.appendChild(buttonEdit);
      
            const cellTrashcan = row.insertCell(1);
            const buttonDelete = document.createElement("button");
            const imgDelete = new Image();
            imgDelete.src = "./images/delete.png";
            imgDelete.alt = "Delete";
            buttonDelete.appendChild(imgDelete);
            buttonDelete.id = "DiskBrandDeleteButton" + brand.brand_id;
            cellTrashcan.appendChild(buttonDelete);
    
            let cell = row.insertCell(2);
            cell.textContent = brand.brand_name;
        });
    }
}

export default displayDiskBrands