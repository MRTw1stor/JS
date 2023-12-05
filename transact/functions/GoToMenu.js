const user = document.querySelector(".user");
const transfer = document.querySelector(".transfer");
const newtransfer = document.querySelector(".newtransfer");
const compTrans = document.querySelector(".compTrans");
const transferComplite = document.querySelector(".transferComplite");
const canselTransfer = document.querySelector(".canselTrans");
const tableCanselTransfers = document.querySelector(".transferCansel");
const comitTransfers = document.querySelector(".comitTransfers");
const tableSentTransfers = document.querySelector(".tableSentTransfers");
const sentTransfers = document.querySelector(".sentTransfers");
const tableInboxTransfers = document.querySelector(".tableInboxTransfers");
const valueToTransfer = document.querySelector(".value");
const code = document.querySelector(".code");
const whoTransact = document.getElementById("who");

// Функция выхода в меню
async function GoToMenu(CheckRole, web3, users) {
    transfer.style.display = "none";
    user.style.display = "block";
    newtransfer.style.display = "block";
    compTrans.style.display = "block";
    transferComplite.style.display = "none";
    canselTransfer.style.display = "block";
    tableCanselTransfers.style.display = "none";
    comitTransfers.style.display = "block";
    tableSentTransfers.style.display = "none";
    sentTransfers.style.display = "block";
    tableInboxTransfers.style.display = "none";
    CheckRole(users);
    valueToTransfer.value = "";
    code.value = "";
    document.querySelector(".balance").textContent = "Баланс кошелька:" + " " + (await web3.eth.getBalance(whoTransact.value)) / 10 ** 18 + " " + "Eth";
}

export default GoToMenu