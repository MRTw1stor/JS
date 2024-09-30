import { getDates } from "../../proto.js";
import changeDiskBrands from "../changes/changeDiskBrands.js";

async function displayDiskBrands() {
    let disksbrands = await getDates("disksbrands");

    const tableBody = document.getElementById("DiskBrand");
    tableBody.innerHTML = "";

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

document.addEventListener('click', (event) => {
    if (event.target.id.startsWith('DiskBrandEditButton')) {
        const rowId = event.target.id.replace('DiskBrandEditButton', '');
        changeDiskBrands(rowId, displayDiskBrands)
    } else if (event.target.tagName === 'IMG' && event.target.parentElement.tagName === 'BUTTON' && event.target.parentElement.id.startsWith('DiskBrandEditButton')) {
        const rowId = event.target.parentElement.id.replace('DiskBrandEditButton', '');
        changeDiskBrands(rowId, displayDiskBrands)
    }
});

export default displayDiskBrands