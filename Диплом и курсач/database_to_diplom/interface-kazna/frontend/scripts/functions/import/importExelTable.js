async function ImportExelTable() {
    let processedData;

    await new Promise((resolve, reject) => {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = '.xlsx, .xls';

        fileInput.addEventListener('change', async (e) => {
            const selectedFile = e.target.files[0];
            const reader = new FileReader();

            reader.onload = (event) => {
                const data = event.target.result;
                const workbook = XLSX.read(data, { type: 'array' });
                const sheet_name_list = workbook.SheetNames;
                const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]], { header: 1 });

                processedData = sheetData.map(row => {
                    while (row.length < 19) {
                        row.push('');
                    }

                    for (let i = 0; i < row.length; i++) {
                        if (row[i] == undefined || row[i] == null || row[i] === '') {
                            if (i == 6 || i == 10 || i == 11 || i == 14 || i == 15 || i == 16 || i == 18) {
                                row[i] = 0;
                            } else {
                                row[i] = '';
                            }
                        }
                    }
                    return row;
                });

                resolve();
            };

            reader.onerror = (error) => {
                reject(error);
            };

            reader.readAsArrayBuffer(selectedFile);
        });

        fileInput.click();
    });

    return processedData;
}

export default ImportExelTable;
