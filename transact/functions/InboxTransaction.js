const tableInboxTransfers = document.getElementById("tableInboxTransfers");
const whoTransact = document.getElementById("who");

// Функция которая отрисовывает и добавляет данные в таблицу входящие переводы
async function InboxTransaction(allTransfers, RemoveItem) {
    RemoveItem();
    tableInboxTransfers.style.display = "block";
    const tableInbox = document.getElementById("tableInbox");

    for (let i = 0; i < allTransfers.length; i++) {
        if (whoTransact.value == allTransfers[i].to &&
            allTransfers[i].status_execution == false &&
            allTransfers[i].status_reception == true) {
            let body = document.createElement("tbody");
            let tdName = document.createElement("td");
            let tdMoney = document.createElement("td");

            tdName.textContent = allTransfers[i].who;
            tdMoney.textContent = allTransfers[i].money / 100 ** 18 + " " + "Eth";
            body.append(tdName, tdMoney);
            tableInbox.append(body);
            document.getElementById("quickBtn").addEventListener("click", () => {
                body.remove();
            });
        }
    }
}

export default InboxTransaction
