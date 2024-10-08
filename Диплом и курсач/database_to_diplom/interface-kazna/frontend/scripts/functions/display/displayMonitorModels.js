import { getDates } from "../../proto.js";
import { UpdateData } from "../../proto.js";
import { deleteItem } from "../../api.js";
import changeMonitorModels from "../changes/changeMonitorModel.js";

async function displayMonitorModels(item) {
    let workstation = await getDates("workstation");
    let monitorbrands = await getDates("monitorbrands");
    let monitormodels = await getDates("monitormodels")

    const tableBody = document.getElementById("MonitorModels");
    const selectBrand = document.getElementById("ComputerNewMonitorModelSelect");
    tableBody.innerHTML = "";
    selectBrand.innerHTML = "";

    if (item == 0){
        for (const model of monitormodels) {
            let row = tableBody.insertRow();
            row.setAttribute('id', "monitormodels_row_" + model.model_id)
    
            let brandCell = row.insertCell(0);
            let modelCell = row.insertCell(1);
            
            const brand = monitorbrands.find(brand => brand.brand_id === model.brand_id);
            
            if (brand) {
                brandCell.textContent = brand.brand_name;
                modelCell.textContent = model.model_name;
            }
        }
    
        let defaultOption = document.createElement("option");
        defaultOption.value = "";
        defaultOption.textContent = "Выберите бренд";
        selectBrand.appendChild(defaultOption);
    
        for (const brand of monitorbrands) {
            let option = document.createElement("option");
            option.value = brand.brand_id;
            option.textContent = brand.brand_name;
            selectBrand.appendChild(option);
          }
    }
    else if (item == 1){
        for (const model of monitormodels) {
            let row = tableBody.insertRow();
            row.setAttribute('id', "monitormodels_row_" + model.model_id)
    
            const cellPencil = row.insertCell(0);
            const buttonEdit = document.createElement("button");
            const imgEdit = new Image();
            imgEdit.src = "./images/pencil.png";
            imgEdit.alt = "Edit";
            buttonEdit.appendChild(imgEdit);
            buttonEdit.id = "MonitorModelsEditButton" + model.model_id;
            cellPencil.appendChild(buttonEdit);
      
            const cellTrashcan = row.insertCell(1);
            const buttonDelete = document.createElement("button");
            const imgDelete = new Image();
            imgDelete.src = "./images/delete.png";
            imgDelete.alt = "Delete";
            buttonDelete.appendChild(imgDelete);
            buttonDelete.id = "MonitorModelsDeleteButton" + model.model_id;
            buttonDelete.addEventListener("click", async (event) =>{
                const id = parseInt(event.currentTarget.id.split('Button')[1]);
                if (workstation.some(work => work.monitor_model_id === id)) {
                    alert('Эта запись уже используется в другой таблице. Нельзя удалять!');
                    return;
                }
                deleteItem("monitormodels", "model_id", parseInt(id));
                UpdateData()
                setTimeout(async () => {
                    displayMonitorModels(1)
                }, 2000);
            })
            cellTrashcan.appendChild(buttonDelete);
    
            let brandCell = row.insertCell(2);
            let modelCell = row.insertCell(3);
            
            const brand = monitorbrands.find(brand => brand.brand_id === model.brand_id);
            
            if (brand) {
                brandCell.textContent = brand.brand_name;
                modelCell.textContent = model.model_name;
            }
        }
    
        let defaultOption = document.createElement("option");
        defaultOption.value = "";
        defaultOption.textContent = "Выберите бренд";
        selectBrand.appendChild(defaultOption);
    
        for (const brand of monitorbrands) {
            let option = document.createElement("option");
            option.value = brand.brand_id;
            option.textContent = brand.brand_name;
            selectBrand.appendChild(option);
          }
    }
}

document.addEventListener('click', (event) => {
    if (event.target.id.startsWith('MonitorModelsEditButton')) {
        const rowId = event.target.id.replace('MonitorModelsEditButton', '');
        changeMonitorModels(rowId, displayMonitorModels)
    } else if (event.target.tagName === 'IMG' && event.target.parentElement.tagName === 'BUTTON' && event.target.parentElement.id.startsWith('MonitorModelsEditButton')) {
        const rowId = event.target.parentElement.id.replace('MonitorModelsEditButton', '');
        changeMonitorModels(rowId, displayMonitorModels)
    }
});

export default displayMonitorModels