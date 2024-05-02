import { getDates } from "../../proto.js";
import { UpdateData } from "../../proto.js";
import { deleteItem } from "../../api.js";
import changeDiskModels from "../changes/changeDiskModels.js";

async function displayDiskModels(item) {
    let workstation = await getDates("workstation");
    let disksbrands = await getDates("disksbrands");
    let diskscapasity = await getDates("diskscapasity");
    let disksmodels = await getDates("disksmodels");

    const tableBody = document.getElementById("DiskModels");
    const selectBrand = document.getElementById("ComputerNewDiskModelSelectBrand");
    const selectCapasity = document.getElementById("ComputerNewDiskModelSelectCapasity");
    tableBody.innerHTML = "";
    selectBrand.innerHTML = "";
    selectCapasity.innerHTML = "";

    if (item == 0){
        for (let model of disksmodels) {
            const brand = disksbrands.find(brand => brand.brand_id === model.brand_id);
            const capacity = diskscapasity.find(capacity => capacity.capasity_id === model.capasity_id);
    
            let row = tableBody.insertRow();
            row.setAttribute('id', "diskmodels_row_" + model.model_id)
    
            let brandCell = row.insertCell(0);
            let modelCell = row.insertCell(1);
            let capacityCell = row.insertCell(2);
    
            brandCell.textContent = brand.brand_name;
            modelCell.textContent = model.model_name;
            capacityCell.textContent = `${capacity.capasity_name} GB`;
        }
    
        const emptyBrandOption = document.createElement("option");
        emptyBrandOption.value = "";
        emptyBrandOption.textContent = "Выберите бренд";
        selectBrand.appendChild(emptyBrandOption);
    
        const emptyCapasityOption = document.createElement("option");
        emptyCapasityOption.value = "";
        emptyCapasityOption.textContent = "Выберите объем";
        selectCapasity.appendChild(emptyCapasityOption);
    
        disksbrands.forEach(brand => {
            const option = document.createElement("option");
            option.value = brand.brand_id;
            option.textContent = brand.brand_name;
            selectBrand.appendChild(option);
        });
    
        diskscapasity.forEach(capacity => {
            const option = document.createElement("option");
            option.value = capacity.capasity_id;
            option.textContent = `${capacity.capasity_name} GB`;
            selectCapasity.appendChild(option);
        });
    }
    else if (item == 1){
        for (let model of disksmodels) {
            const brand = disksbrands.find(brand => brand.brand_id === model.brand_id);
            const capacity = diskscapasity.find(capacity => capacity.capasity_id === model.capasity_id);
    
            let row = tableBody.insertRow();
            row.setAttribute('id', "diskmodels_row_" + model.model_id)
    
            const cellPencil = row.insertCell(0);
            const buttonEdit = document.createElement("button");
            const imgEdit = new Image();
            imgEdit.src = "./images/pencil.png";
            imgEdit.alt = "Edit";
            buttonEdit.appendChild(imgEdit);
            buttonEdit.id = "DiskModelsEditButton" + model.model_id;
            cellPencil.appendChild(buttonEdit);
      
            const cellTrashcan = row.insertCell(1);
            const buttonDelete = document.createElement("button");
            const imgDelete = new Image();
            imgDelete.src = "./images/delete.png";
            imgDelete.alt = "Delete";
            buttonDelete.appendChild(imgDelete);
            buttonDelete.id = "DiskModelsDeleteButton" + model.model_id;
            buttonDelete.addEventListener("click", async (event) =>{
                const id = parseInt(event.currentTarget.id.split('Button')[1]);
                if (workstation.some(work => work.disk_model_id === id)) {
                    alert('Эта запись уже используется в другой таблице. Нельзя удалять!');
                    return;
                }
                deleteItem("disksmodels", "model_id", parseInt(id));
                UpdateData()
                setTimeout(async () => {
                    displayDiskModels(1)
                }, 2000);
            })
            cellTrashcan.appendChild(buttonDelete);
    
            let brandCell = row.insertCell(2);
            let modelCell = row.insertCell(3);
            let capacityCell = row.insertCell(4);
    
            brandCell.textContent = brand.brand_name;
            modelCell.textContent = model.model_name;
            capacityCell.textContent = `${capacity.capasity_name} GB`;
        }
    
        const emptyBrandOption = document.createElement("option");
        emptyBrandOption.value = "";
        emptyBrandOption.textContent = "Выберите бренд";
        selectBrand.appendChild(emptyBrandOption);
    
        const emptyCapasityOption = document.createElement("option");
        emptyCapasityOption.value = "";
        emptyCapasityOption.textContent = "Выберите объем";
        selectCapasity.appendChild(emptyCapasityOption);
    
        disksbrands.forEach(brand => {
            const option = document.createElement("option");
            option.value = brand.brand_id;
            option.textContent = brand.brand_name;
            selectBrand.appendChild(option);
        });
    
        diskscapasity.forEach(capacity => {
            const option = document.createElement("option");
            option.value = capacity.capasity_id;
            option.textContent = `${capacity.capasity_name} GB`;
            selectCapasity.appendChild(option);
        });
    }
}

document.addEventListener('click', (event) => {
    if (event.target.id.startsWith('DiskModelsEditButton')) {
        const rowId = event.target.id.replace('DiskModelsEditButton', '');
        changeDiskModels(rowId, displayDiskModels)
    } else if (event.target.tagName === 'IMG' && event.target.parentElement.tagName === 'BUTTON' && event.target.parentElement.id.startsWith('DiskModelsEditButton')) {
        const rowId = event.target.parentElement.id.replace('DiskModelsEditButton', '');
        changeDiskModels(rowId, displayDiskModels)
    }
});

export default displayDiskModels