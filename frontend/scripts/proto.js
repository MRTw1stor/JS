import { getItems, createItem, deleteItem, update } from "./api.js";

const Home = document.getElementById("Home")
const Computers = document.getElementById("Computers")
Computers.style.display = "none"
const ComputersDates = document.getElementById("ComputerDates")
ComputersDates.style.display = "none"

const ComputerMonitorBrands = document.getElementById("ComputerMonitorBrands")
ComputerMonitorBrands.style.display = "none"


async function test(tableName) {
    const items = await getItems(tableName);
    const item = items.rows
    return item
}

let computerSpects = await test("computers");
console.log(computerSpects);
let computerModels = await test("computermodels");
let numberedEquipment = await test("numberedequipment");
let accountingEquipment = await test("accountingequipment");
let departments = await test("departments");
let os = await test("operatingsystems");
let monitors = await test("monitors");
let monitorbrands = await test("monitorbrands");
let monitormodels = await test("monitormodels")
let processor = await test("processors");
let ram = await test("ram");
let disks = await test("disks");
let disksbrands = await test("disksbrands");
let diskscapasity = await test("diskscapasity");
let disksmodels = await test("disksmodels");

async function UpdateData() {
    computerSpects = await test("computers");
    computerModels = await test("computermodels");
    numberedEquipment = await test("numberedequipment");
    accountingEquipment = await test("accountingequipment");
    departments = await test("departments");
    os = await test("operatingsystems");
    monitors = await test("monitors");
    monitorbrands = await test("monitorbrands");
    monitormodels = await test("monitormodels")
    processor = await test("processors");
    ram = await test("ram");
    disks = await test("disks");
    disksbrands = await test("disksbrands");
    diskscapasity = await test("diskscapasity");
    disksmodels = await test("disksmodels");
}

document.getElementById("GoComputersButton").addEventListener("click", async () => {
    Home.style.display = "none";
    Computers.style.display = "block";

    let inventoryNumberCounter = 0;
    const tbody = document.getElementById("BodyComputer");
    tbody.innerHTML = '';

    const identificatorsMap = {};
    for (const item of computerSpects) {
        const identificators = await getIdentificatorForComputer(item.сomputer_id, numberedEquipment, accountingEquipment);
        identificatorsMap[item.сomputer_id] = identificators;
    }

    const inventoryNumbersMap = {};
    for (const item of computerSpects) {
        const inventoryNumbers = await getInventoryNumbersForComputer(item.сomputer_id, numberedEquipment, accountingEquipment);
        inventoryNumbersMap[item.сomputer_id] = inventoryNumbers;
    }

    const departamentsMap = {};
    for (const item of computerSpects) {
        const dapartaments = await getDepartamentsForComputer(item.сomputer_id, numberedEquipment, accountingEquipment);
        departamentsMap[item.сomputer_id] = dapartaments;
    }

    const cabinetsMap = {};
    for (const item of computerSpects) {
        const cabinets = await getCabinetsForComputer(item.сomputer_id, numberedEquipment, accountingEquipment);
        cabinetsMap[item.сomputer_id] = cabinets;
    }

    const monitorsMap = {};
    for (const item of monitors) {
        const model = monitormodels.find(model => model.model_id === item.model_id);
        const brand = monitorbrands.find(brand => brand.brand_id === model.brand_id);
        monitorsMap[item.monitor_id] = {
            brand: brand.brand_name,
            model: model.model_name
        };
    }

    const disksMap = {};
    for (const item of disks) {
        const model = disksmodels.find(model => model.model_id === item.model_id);
        const brand = disksbrands.find(brand => brand.brand_id === model.brand_id);
        disksMap[item.disk_id] = {
            brand: brand.brand_name,
            model: model.model_name
        };
    }

    const disksMapCapasity = {};
    for (const item of disks) {
        const model = disksmodels.find(model => model.model_id === item.model_id);
        const capasity = diskscapasity.find(capasity => capasity.capasity_id === model.capasity_id);
        disksMapCapasity[item.disk_id] = {
            capasity: capasity.capasity_name
        };
    }

    for (const item of computerSpects) {
        const tr = document.createElement('tr');

        for (const key in item) {
            let value = item[key];
            if (key === 'сomputer_id'){
                const inventoryNumbers = identificatorsMap[item.сomputer_id][inventoryNumberCounter];
                value = inventoryNumbers

                const tdEdit = document.createElement('td');
                const buttonEdit = document.createElement("button");
                buttonEdit.textContent = "Редактировать";
                buttonEdit.id = "ComputerChangeDatesButton" + inventoryNumbers;
                tdEdit.appendChild(buttonEdit);
                tr.appendChild(tdEdit);
            }
            if (key === 'model_id') {
                const correspondingModel = computerModels.find(model => model.model_id === value);
                if (correspondingModel) {
                    value = correspondingModel.model_name;
                }
            }
            if (key === 'сomputer_status'){
                const statusValue = value === true ? 'используется' : 'не используется';
                value = statusValue;

                const inventoryNumbers = inventoryNumbersMap[item.сomputer_id][inventoryNumberCounter];
                const tdInventoryNumbers = document.createElement('td');
                tdInventoryNumbers.textContent = inventoryNumbers;
                tr.appendChild(tdInventoryNumbers);
                
                const departaments = departamentsMap[item.сomputer_id][inventoryNumberCounter];
                const tdDepartments = document.createElement('td');
                
                const correspondingDepartment = departments.find(department => department.department_id === departaments);
                if (correspondingDepartment) {
                    const departmentName = correspondingDepartment.department_name;
                    tdDepartments.textContent = departmentName;
                    tr.appendChild(tdDepartments);
                }
                
                const cabinets = cabinetsMap[item.сomputer_id][inventoryNumberCounter];
                const tdCabinets = document.createElement('td');
                tdCabinets.textContent = cabinets;
                tr.appendChild(tdCabinets);
            }
            if(key === 'сomputer_os'){
                const correspondingOS = os.find(os => os.operatingsystem_id === value);
                if (correspondingOS) {
                    value = correspondingOS.operatingsystem_name;
                }
            }
            if(key === 'monitor_id'){
                const monitorInfo = monitorsMap[item.monitor_id];
                if (monitorInfo) {
                    value = `${monitorInfo.brand} ${monitorInfo.model}`
                }
            }
            if(key === 'processor_id'){
                const correspondingProcessor = processor.find(processor => processor.processor_id === value);
                if (correspondingProcessor) {
                    value = correspondingProcessor.processor_name;
                }

                const correspondingMonitorNumber = monitors.find(monitor => monitor.monitor_id === item.monitor_id);
                const tdMonitorNumber = document.createElement('td');
                if (correspondingMonitorNumber) {
                    tdMonitorNumber.textContent = correspondingMonitorNumber.serial_number;
                }
                tr.appendChild(tdMonitorNumber);
            }
            if(key === 'ram_id'){
                const correspondingRam = ram.find(ram => ram.ram_id === value);
                if (correspondingRam) {
                    value = correspondingRam.ram_capacity;
                }
            }
            if(key === 'disk_id'){
                const diskInfo = disksMap[item.disk_id];
                if (diskInfo) {
                    value = `${diskInfo.brand} ${diskInfo.model}`
                }
            }
                
            const td = document.createElement('td');
            td.textContent = value;
            tr.appendChild(td);
            
        }
        const correspondingDiskNumber = disks.find(disk => disk.disk_id === item.disk_id);
        const tdDiskNumber = document.createElement('td');
        if (correspondingDiskNumber) {
            tdDiskNumber.textContent = correspondingDiskNumber.disk_serial_number;
        }
        tr.appendChild(tdDiskNumber);

        const diskInfo = disksMapCapasity[item.disk_id];
        const tdDiskCapasity = document.createElement('td');
        if (diskInfo) {
            tdDiskCapasity.textContent = diskInfo.capasity;
        }
        tr.appendChild(tdDiskCapasity);

        tbody.appendChild(tr);
        inventoryNumberCounter++; // Увеличиваем порядковый номер для следующего компьютера
    }

    addFilterInputsToTable();
    addSortButtonsToTable();
});

async function getIdentificatorForComputer(computerId, numberedEquipment, accountingEquipment) {
    const correspondingNumberedEquipment = numberedEquipment.find(eq => eq.computer_id === computerId);
    if (correspondingNumberedEquipment) {
        const correspondingAccountingEquipment = accountingEquipment.filter(accEq => accEq.numberedEquipment_id === correspondingNumberedEquipment.numberedEquipment_id);
        return correspondingAccountingEquipment.map(accEq => accEq.accountingequipment_id);
    }
    return [];
}

async function getInventoryNumbersForComputer(computerId, numberedEquipment, accountingEquipment) {
    const correspondingNumberedEquipment = numberedEquipment.find(eq => eq.computer_id === computerId);
    if (correspondingNumberedEquipment) {
        const correspondingAccountingEquipment = accountingEquipment.filter(accEq => accEq.numberedEquipment_id === correspondingNumberedEquipment.numberedEquipment_id);
        return correspondingAccountingEquipment.map(accEq => accEq.inventory_number);
    }
    return [];
}

async function getDepartamentsForComputer(computerId, numberedEquipment, accountingEquipment) {
    const correspondingNumberedEquipment = numberedEquipment.find(eq => eq.computer_id === computerId);
    if (correspondingNumberedEquipment) {
        const correspondingAccountingEquipment = accountingEquipment.filter(accEq => accEq.numberedEquipment_id === correspondingNumberedEquipment.numberedEquipment_id);
        return correspondingAccountingEquipment.map(accEq => accEq.department_id);
    }
    return [];
}

async function getCabinetsForComputer(computerId, numberedEquipment, accountingEquipment) {
    const correspondingNumberedEquipment = numberedEquipment.find(eq => eq.computer_id === computerId);
    if (correspondingNumberedEquipment) {
        const correspondingAccountingEquipment = accountingEquipment.filter(accEq => accEq.numberedEquipment_id === correspondingNumberedEquipment.numberedEquipment_id);
        return correspondingAccountingEquipment.map(accEq => accEq.cabinet);
    }
    return [];
}

function addFilterInputsToTable() {
    const tableHeaders = document.querySelectorAll("#Computer th");

    // Удаляем все существующие инпуты, если они уже были созданы
    const existingInputs = document.querySelectorAll("#Computer input");
    existingInputs.forEach(input => input.remove());

    tableHeaders.forEach((header, index) => {
        // Пропускаем создание input для первого столбца
        if (index > 0) {
            const input = document.createElement("input");
            input.type = "text";
            input.placeholder = "Сортировать...";
            header.appendChild(input);

            input.addEventListener('input', () => {
                filterTable(header.cellIndex, input.value);
            });
        }
    });
}

// Функция для сортировки таблицы
function FilterTable() {
    const table = document.getElementById("Computer");
    const rows = Array.from(table.rows).slice(1); // Пропускаем заголовки
  
    rows.forEach(row => {
        let isRowVisible = true; // По умолчанию строка видима
        document.querySelectorAll("#Computer th input").forEach((input, index) => {
            if (input.value !== "" && !row.cells[index].textContent.toLowerCase().includes(input.value.toLowerCase())) {
                isRowVisible = false; // Если для любого инпута значение не соответствует ячейке, строка становится невидимой
            }
        });
        row.style.display = isRowVisible ? "" : "none"; // Устанавливаем CSS-свойство для отображения/скрытия строки
    });
}

const originalOrder = {}; // Выносим объявление originalOrder в глобальную область

function addSortButtonsToTable() {
    const table = document.getElementById("Computer");
    const tableHeaders = table.querySelectorAll("th");

    // Удаляем все существующие выпадающие списки, если они уже были созданы
    const existingSelects = table.querySelectorAll("select");
    existingSelects.forEach(select => select.remove());

    // Запоминаем исходный порядок данных для каждого столбца
    tableHeaders.forEach((header, columnIndex) => {
        originalOrder[columnIndex] = Array.from(table.rows).slice(1); // Пропускаем заголовки
    });

    tableHeaders.forEach((header, columnIndex) => {
        if (columnIndex > 0) {
            const select = document.createElement("select");
            const optionCancel = document.createElement("option");
            optionCancel.value = "cancel";
            optionCancel.text = "Стандарт";
            const optionAscending = document.createElement("option");
            optionAscending.value = "ascending";
            optionAscending.text = "По возрастанию";
            const optionDescending = document.createElement("option");
            optionDescending.value = "descending";
            optionDescending.text = "По убыванию";

            select.appendChild(optionCancel);
            select.appendChild(optionAscending);
            select.appendChild(optionDescending);

            select.addEventListener('change', () => {
                const selectedValue = select.value;

                if (selectedValue === "cancel") {
                    resetTableOrder(table, columnIndex);
                } else {
                    // Сбрасываем все остальные выпадающие списки к "стандарт"
                    tableHeaders.forEach((header, index) => {
                        if (index !== columnIndex) {
                            const otherSelect = header.querySelector("select");
                            if (otherSelect.value !== "cancel") {
                                otherSelect.value = "cancel";
                            }
                        }
                    });

                    // Сортируем таблицу в соответствии с выбранным значением
                    sortTable(table, columnIndex, selectedValue);
                }
            });

            header.appendChild(select);
        }
    });
}


function resetTableOrder(table, columnIndex) {
    // Восстанавливаем исходный порядок данных для указанного столбца
    const rows = originalOrder[columnIndex];
    const tbody = table.querySelector("tbody");
        
    // Очищаем и добавляем строки в таблицу в соответствии с порядком в originalOrder
    tbody.innerHTML = "";
    rows.forEach(row => {
        tbody.appendChild(row);
    });
}

function sortTable(table, columnIndex, order) {
    const tbody = table.querySelector("tbody");
    const rows = Array.from(tbody.rows);

    rows.sort((a, b) => {
        const textA = a.cells[columnIndex].textContent.trim();
        const textB = b.cells[columnIndex].textContent.trim();

        if (!isNaN(textA) && !isNaN(textB)) {
            return order === 'ascending' ? Number(textA) - Number(textB) : Number(textB) - Number(textA);
        } else {
            return order === 'ascending' ? textA.localeCompare(textB) : textB.localeCompare(textA);
        }
    });

    tbody.innerHTML = "";
    rows.forEach(row => {
        tbody.appendChild(row);
    });
}



document.getElementById("ComputerFilterButton").addEventListener("click", function() {
    document.querySelectorAll("#Computer th input").forEach(input => input.value = "");
    FilterTable(); // Вызываем функцию сортировки после очистки фильтров
});


document.getElementById("ComputerBackButton").addEventListener("click", () => {
    Home.style.display = "block"
    Computers.style.display = "none"
})

let selectList;

document.getElementById("ComputerCreateDatesButton").addEventListener("click", () => {
    Computers.style.display = "none";
    ComputersDates.style.display = "block";

    const computerChooseTable = document.getElementById("ComputerChooseTable");

    if (selectList) {
        selectList.remove();
    }
    
    // Создаем новый элемент select
    selectList = document.createElement("select");

    // Получаем имена таблиц из ваших переменных
    const tables = [
        "...",
        "Фирмы Мониторов",
        "Модели Мониторов",
        "Мониторы",
        "Объемы Жестких Дисков",
        "Фирмы Жестких Дисков",
        "Модели Жестких Дисков",
        "Жесткие Диски",
        "Модели компьютеров",
        "Операционные системы",
        "Процессоры",
        "Оперативная память",
        "Характеристика компьютера",
        "Типы Техники",
        "Нумерованные Типы Техники",
        "Отделы",
        "Учет Техники"
    ];

    // Создаем и добавляем варианты выбора для выпадающего списка
    tables.forEach(tableName => {
        const option = document.createElement("option");
        option.value = tableName;
        option.textContent = tableName;
        selectList.appendChild(option);
    });

    // Добавляем выпадающий список в элемент #ComputerChooseTable
    computerChooseTable.appendChild(selectList);

    // Добавляем обработчик события изменения значения в списке
    selectList.addEventListener("change", (event) => {
        const selectedValue = event.target.value;

        if (selectedValue === "Фирмы Мониторов") {
            // При выборе "Фирмы Мониторов" показываем элемент ComputerMonitorBrands
            ComputerMonitorBrands.style.display = "block";
            displayMonitorBrands();
        } else {
            // В остальных случаях скрываем элемент ComputerMonitorBrands
            ComputerMonitorBrands.style.display = "none";
        }
    });
});

async function displayMonitorBrands() {
    const tableBody = document.getElementById("MonitorBrands");

    // Очищаем содержимое таблицы
    tableBody.innerHTML = "";

    // Заполняем таблицу данными из базы данных
    monitorbrands.forEach(brand => {
        let row = tableBody.insertRow();
        let cell = row.insertCell(0);
        cell.textContent = brand.brand_name;
    });
}

document.getElementById("ComputerNewMonitorBrandsButton").addEventListener("click", async () => {
    const input = document.getElementById("ComputerNewMonitorBrandsInput");
    const inputValue = input.value.trim();
    const tableBody = document.getElementById("MonitorBrands");
    const warningText = document.getElementById("warningText");

    if (inputValue === "") {
        warningText.textContent = "Пожалуйста, введите название фирмы монитора";
        warningText.style.display = "block";
        setTimeout(() => { warningText.style.display = "none"; }, 5000);
    } else if (!/^[a-zA-Zа-яА-Я]+$/.test(inputValue)) {
        warningText.textContent = "Название фирмы монитора должно содержать только буквы";
        warningText.style.display = "block";
        setTimeout(() => { warningText.style.display = "none"; }, 5000);
    } else {
        warningText.style.display = "none";
        createItem("monitorbrands", input.value);
        input.value = "";
        await UpdateData();
        await displayMonitorBrands();
    }
});

document.getElementById("ComputerCreateDatesBackButton").addEventListener("click", () => {
    Computers.style.display = "block"
    ComputersDates.style.display = "none"
    ComputerMonitorBrands.style.display = "none";
})

