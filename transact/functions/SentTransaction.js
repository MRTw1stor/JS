const tableSentTransfers = document.getElementById("tableSentTransfers");
const whoTransact = document.getElementById("who");

// Функция которая отрисовывает и добавляет данные в таблицу отправленные переводы
async function SentTransaction(allTransfers, RemoveItem) {
    RemoveItem();
    tableSentTransfers.style.display = "block";
    const tableSent = document.getElementById("tableSent");

    for (let i = 0; i < allTransfers.length; i++) {
        if (whoTransact.value == allTransfers[i].who &&
            allTransfers[i].status_execution == false &&
            allTransfers[i].status_reception == true) {
            let body = document.createElement("tbody");
            let tdName = document.createElement("td");
            let tdMoney = document.createElement("td");

            tdName.textContent = allTransfers[i].to;
            tdMoney.textContent = allTransfers[i].money / 100 ** 18 + " " + "Eth";
            body.append(tdName, tdMoney);
            tableSent.append(body);

            document.querySelectorAll("#quickButton").forEach(button => {
                button.addEventListener("click", async () => {
                    body.remove();
                });
            });
        }
    }
}

export default SentTransaction
