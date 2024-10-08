async function ExportDates(headersCount) {

    let headers
    let table
    let skip

    if (headersCount == 0){
        headers = ['Номер учета', 'Модель', 'Серийный Номер', 'Инвентарный номер', 'Отдел', 'Кабинет', 'Имя', 'Статус', 'Контур', 'IP', 'MAC-адресс', 'Соболь', 
        'Операционная Система', 'Монитор', 'Серийный номер монитора', 'Процессор', 'Оперативная память', 'Жесткий диск', 'Объем диска', 'Серийный номер диска'];
        table = document.getElementById("Computer");
        skip = 3
    }
    else if (headersCount == 1){
        headers = ['Номер списания', 'Дата списания', 'Номер учета', 'Модель', 'Серийный Номер', 'Инвентарный номер',
         'Отдел', 'Кабинет', 'Имя', 'Статус', 'Контур', 'IP', 'MAC-адресс', 'Соболь', 'Операционная Система', 'Монитор', 
         'Серийный номер монитора', 'Процессор', 'Оперативная память', 'Жесткий диск', 'Объем диска', 'Серийный номер диска'];
        table = document.getElementById("StationsWriteOf");
        skip = 1
    }

    const rows = table.getElementsByTagName('tr');
    const data = [];

    for (let i = 0; i < rows.length; i++) {
        if (rows[i].style.display != "none") {
            const row = rows[i];
            const rowData = {};
    
            const cells = row.getElementsByTagName('td');
    
            for (let j = skip; j < cells.length; j++) {
                const cell = cells[j];
                const header = headers[j - skip];
                rowData[header] = cell.textContent.trim();
            }
    
            data.push(rowData);
        }
    }

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(data);

    XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');
    XLSX.writeFile(workbook, 'data.xlsx');
}

export default ExportDates;