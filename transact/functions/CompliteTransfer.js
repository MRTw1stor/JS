let transferComplite = document.querySelector(".transferComplite");
let whoTransact = document.getElementById("who");

async function CompliteTransfer(allTransfers, compliteMoneyTransfer, canselMoneyTransfer, RemoveItem) {
    RemoveItem();
    transferComplite.style.display = "block";
    const tableComplite = document.getElementById("tableComplite");
  
    for(let i = 0; i < allTransfers.length; i++) {
        if (whoTransact.value == allTransfers[i].to) {
            let body = document.createElement("tbody");
            let tdName = document.createElement("td");
            let tdMoney = document.createElement("td");
            let tdPasword = document.createElement("td");

            const input = document.createElement("input");
            input.classList.add("input_list");
            input.id = `${allTransfers[i].id_transfer}`;
            input.type = "password";
            tdPasword.append(input);

            let tdButtonComl = document.createElement("td");
            const Button = document.createElement("button");
            Button.classList.add("buttonAccept");
            Button.id = `${allTransfers[i].id_transfer}`;
            Button.textContent = "Подтвердить";
            tdButtonComl.append(Button);

            let tdButtonCans = document.createElement("td");
            const button = document.createElement("button");
            button.classList.add("buttonCansel");
            button.id = `${allTransfers[i].id_transfer}` + `${allTransfers[i].id_transfer}`;
            button.textContent = "Отменить";
            tdButtonCans.append(button);

            tdName.textContent = allTransfers[i].who;
            tdMoney.textContent = allTransfers[i].money / 100 ** 18 + " " + "Eth";
            body.append(tdName, tdMoney, tdPasword, tdButtonComl, tdButtonCans);
            tableComplite.append(body);

            document.getElementById("quicBtn").addEventListener("click", () => {
                body.remove();
            });
            compliteMoneyTransfer();
            canselMoneyTransfer()
        }
    }
}

export default CompliteTransfer