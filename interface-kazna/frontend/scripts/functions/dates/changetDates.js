import { getDates } from "../../proto.js";

const changesdates = await getDates("changesdatas");
const departments = await getDates("departments");
const os = await getDates("operatingsystems");
const monitorbrands = await getDates("monitorbrands");
const monitormodels = await getDates("monitormodels")
const processor = await getDates("processors");
const ram = await getDates("ram");
const disksbrands = await getDates("disksbrands");
const disksmodels = await getDates("disksmodels");

const russianNames = [
    { en: "station_name", ru: "Имя станции" },
    { en: "station_status", ru: "Статус станции" },
    { en: "station_contur", ru: "Контур" },
    { en: "station_ip", ru: "IP" },
    { en: "mac_address", ru: "MAC адрес" },
    { en: "soble", ru: "Соболь" },
    { en: "station_os", ru: "Операционная система" },
    { en: "monitor_model_id", ru: "Монитор" },
    { en: "monitor_serial_number", ru: "Серийный номер Монитора" },
    { en: "processor_id", ru: "Процессор" },
    { en: "ram_id", ru: "Объем ОЗУ" },
    { en: "disk_model_id", ru: "Жесткий диск" },
    { en: "disk_serial_number", ru: "Серийный номер Жесткого диска" },
    { en: "inventory_number", ru: "Инвентарный номер" },
    { en: "department_id", ru: "Отдел" },
    { en: "cabinet", ru: "Кабинет" }
];

const disksModelsBrandMap = new Map();
const monitorModelsBrandMap = new Map();

for (const model of monitormodels) {
    const brand = monitorbrands.find(brand => brand.brand_id === model.brand_id);
    if (brand) {
        monitorModelsBrandMap.set(model.model_id, `${brand.brand_name} ${model.model_name}`);
    }
}
for (const model of disksmodels) {
    const brand = disksbrands.find(brand => brand.brand_id === model.brand_id);
    if (brand) {
        disksModelsBrandMap.set(model.model_id, `${brand.brand_name} ${model.model_name}`);
    }
}

const osMap = new Map(os.map(item => [item.operatingsystem_id, item.operatingsystem_name]));
const processorMap = new Map(processor.map(item => [item.processor_id, item.processor_name]));
const ramMap = new Map(ram.map(item => [item.ram_id, item.ram_capacity]));
const departmentMap = new Map(departments.map(dep => [dep.department_id, dep.department_name]));

const Computers = document.getElementById("Computers");
const ChangesDates = document.getElementById("ChangesDates");
ChangesDates.style.display = "none";

async function changetDates(rowId) {
    Computers.style.display = "none";
    ChangesDates.style.display = "block";

    const tbodyChanges = document.getElementById("BodyChanges");
    tbodyChanges.innerHTML = '';
    const filteredData = changesdates.filter(item => item.accountingequipment_id == rowId);

    for (const item of filteredData) {
        const tr = document.createElement('tr');
        
        for (const key in item) {

            if (key !== 'changesdata_id') {
                let value = item[key];

                if (key === 'field_name') {
                    const russianName = russianNames.find(name => name.en === item[key]);
                    if (russianName) {
                        value = russianName.ru;
                    }
                }

                if (key === 'old_value' || key === 'new_value') {
                    if (item['field_name'] === 'station_os') {
                        value = osMap.get(parseInt(value)) || value;
                    }
                    if (item['field_name'] === 'monitor_model_id') {
                        value = monitorModelsBrandMap.get(parseInt(value)) || value;
                    }
                    if (item['field_name'] === 'processor_id') {
                        value = processorMap.get(parseInt(value)) || value;
                    }
                    if (item['field_name'] === 'ram_id') {
                        value = ramMap.get(parseInt(value)) || value;
                    }
                    if (item['field_name'] === 'disk_model_id') {
                        value = disksModelsBrandMap.get(parseInt(value)) || value;
                    }
                    if (item['field_name'] === 'department_id') {
                        value = departmentMap.get(parseInt(value)) || value;
                    }
                }

                if (key === 'changes_date') {
                    const date = new Date(value);
                    const day = String(date.getDate()).padStart(2, '0');
                    const month = String(date.getMonth() + 1).padStart(2, '0');
                    const year = date.getFullYear();
                    const hours = String(date.getHours()).padStart(2, "0");
                    const minutes = String(date.getMinutes()).padStart(2, "0");
                    const formattedDate = `${day}.${month}.${year} в ${hours}:${minutes}`;

                    value = formattedDate
                }

                const td = document.createElement('td');
                td.textContent = value;
                tr.appendChild(td);
            }
            
        }
        
        tbodyChanges.appendChild(tr);
    }
}


document.getElementById("ChangesDatesGoBackButton").addEventListener("click", () => {
    Computers.style.display = "block";
    ChangesDates.style.display = "none";
});

export default changetDates;
