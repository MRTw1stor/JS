import { abi } from "./abi.js";

import CheckRole from "./functions/CheckRole.js";
import HideItems from "./functions/HideItems.js";
import GoToMenu from "./functions/GoToMenu.js";

const contractAddress = '0xD498beA692195B6E0FE759f20FE38daFF25140fb';
const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));
const myContract = new web3.eth.Contract(abi, contractAddress);

const whoTransact = document.getElementById("who");
const StatementsCheck = document.getElementById("StatementsCheck");
const StatementsNew = document.getElementById("StatementsNew");
const StatementsChange = document.getElementById("StatementsChange");

let statements = await myContract.methods.CheckStatements().call();

async function getAccaunts() {
    const accounts = await web3.eth.getAccounts();
    const acaunts = accounts;

    for (let i = 0; i < acaunts.length; i++) {
        let address = document.createElement("option");
        address.text = acaunts[i];
        whoTransact.add(address);
    }
    CheckRole(whoTransact.value);
    GoToMenu()
}
getAccaunts()

document.getElementById('who').addEventListener('change', async () => {
    const userAccount = document.getElementById('who').value;
    CheckRole(userAccount);
});

async function UpdateData() {
    statements = await myContract.methods.CheckStatements().call();
}

document.getElementById("checkbutton").addEventListener("click", async () => {
    HideItems()
    StatementsCheck.style.display = "block";
    const tablecheck = document.getElementById("tablecheck")

    for (let i = 0; i < statements.length; i++) {
        if (whoTransact.value == statements[i].who) {
            let body = document.createElement("tbody");
            let tdNumberCar = document.createElement("td");
            let tdDescription = document.createElement("td");
            let tdStatus = document.createElement("td");

            tdNumberCar.textContent = statements[i].car_number
            tdDescription.textContent = statements[i].description_violation
            if (statements[i].status == 0) {
                tdStatus.textContent = "Новая"
            }
            else if (statements[i].status == 1) {
                tdStatus.textContent = "Подтверждено"
            }
            else if (statements[i].status == 2) {
                tdStatus.textContent = "Отклонено"
            }
            body.append(tdNumberCar, tdDescription, tdStatus)
            tablecheck.append(body)
        }
    }
})

document.getElementById("gotomenucheck").addEventListener("click", async () => {
    GoToMenu()
    const userAccount = document.getElementById('who').value;
    CheckRole(userAccount);
    const tablecheck = document.getElementById("tablecheck")
    let tbodyList = tablecheck.querySelectorAll('tbody');
    tbodyList.forEach(tbody => {
        tbody.remove();
    });
})

document.getElementById("newbutton").addEventListener("click", async () => {
    HideItems()
    StatementsNew.style.display = "block";
})

async function NewStatement() {
    const input1 = document.getElementById("newinput1")
    const input2 = document.getElementById("newinput2")

    if (input1.value.trim() === '') {
        alert('Введите номер автомобиля');
        return;
    }
    if (input2.value.trim() === '') {
        alert('Введите описание нарушения');
        return;
    }

    await myContract.methods.NewStatement(input1.value, input2.value).send({
        from: whoTransact.value,
        gas: 30000000,
    });
    UpdateData()
    alert("Вы успешно создали заявку")

    input1.value = ""
    input2.value = ""
}

document.getElementById("createstatement").addEventListener("click", async () => { await NewStatement() })

document.getElementById("gotomenunew").addEventListener("click", async () => {
    GoToMenu()
    const userAccount = document.getElementById('who').value;
    CheckRole(userAccount);
})

document.getElementById("changebutton").addEventListener("click", async () => {
    HideItems()
    StatementsChange.style.display = "block";
    const tablechange = document.getElementById("tablechange")

    for (let i = 0; i < statements.length; i++) {
        if (statements[i].status == 0) {
            let body = document.createElement("tbody");
            let tdWho = document.createElement("td");
            let tdNumberCar = document.createElement("td");
            let tdDescription = document.createElement("td");
            let tdStatus = document.createElement("td");
            let tdButtonComl = document.createElement("td");
            let tdButtonCans = document.createElement("td");

            tdWho.textContent = statements[i].who
            tdNumberCar.textContent = statements[i].car_number
            tdDescription.textContent = statements[i].description_violation
            if (statements[i].status == 0) {
                tdStatus.textContent = "Новая"
            }

            let Button = document.createElement("button");
            Button.classList.add("buttonAccept");
            Button.id = `accept_${statements[i].id_statements}`
            Button.textContent = "Подтвердить";
            Button.addEventListener("click", async () => { await ConfirmStatement(statements[i].id_statements, statements) })
            tdButtonComl.append(Button);

            let button = document.createElement("button");
            button.classList.add("buttonCansel");
            button.id = `accept_${statements[i].id_statements}`
            button.textContent = "Отклонить";
            button.addEventListener("click", async () => { await CanselStatement(statements[i].id_statements, statements) })
            tdButtonCans.append(button);

            body.append(tdWho, tdNumberCar, tdDescription, tdStatus, tdButtonComl, tdButtonCans)
            tablechange.append(body)

            Button.addEventListener("click", async () => { body.remove(); })
            button.addEventListener("click", async () => { body.remove(); })
        }
    }
})

async function CanselStatement(statementsId, statements) {
    for (let i = 0; i < statements.length; i++) {
        if (statements[i].id_statements === statementsId && statements[i].status == 0) {
            await myContract.methods.confirmViolationReport(parseInt(statementsId), parseInt(1)).send({
                from: whoTransact.value,
                gas: 30000000,
            });
            alert('Вы отменили этот перевод');
            UpdateData();
            break;
        }
    }
}

async function ConfirmStatement(statementsId, statements) {
    for (let i = 0; i < statements.length; i++) {
        if (statements[i].id_statements === statementsId && statements[i].status == 0) {
            await myContract.methods.confirmViolationReport(parseInt(statementsId), parseInt(0)).send({
                from: whoTransact.value,
                gas: 30000000,
            });
            alert('Вы подтвердили этот перевод');
            UpdateData();
            break;
        }
    }
}

document.getElementById("gotomenuchange").addEventListener("click", async () => {
    GoToMenu()
    const userAccount = document.getElementById('who').value;
    CheckRole(userAccount);
    const tablechange = document.getElementById("tablechange")
    let tbodyList = tablechange.querySelectorAll('tbody');
    tbodyList.forEach(tbody => {
        tbody.remove();
    });
})