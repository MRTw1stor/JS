import { getDates } from "../../proto.js";
import { UpdateData } from "../../proto.js";
import { deleteItem } from "../../api.js";
import changeDiskBrands from "../changes/changeDiskBrands.js";

async function displayDiskBrands(item) {
    let disksbrands = await getDates("disksbrands");
    let disksmodels = await getDates("disksmodels");

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
            buttonDelete.addEventListener("click", async (event) =>{
                const id = parseInt(event.currentTarget.id.split('Button')[1]);
                if (disksmodels.some(model => model.brand_id === id)) {
                    alert('Эта запись уже используется в другой таблице. Нельзя удалять!');
                    return;
                }
                deleteItem("disksbrands", "brand_id", parseInt(id));
                UpdateData()
                setTimeout(async () => {
                    displayDiskBrands(1)
                }, 2000);
            })
            cellTrashcan.appendChild(buttonDelete);
    
            let cell = row.insertCell(2);
            cell.textContent = brand.brand_name;
        });
    }
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