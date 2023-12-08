const user = document.getElementById("user");
const transfer = document.getElementById("transfer");
const newtransfer = document.getElementById("newtransfer");
const compTrans = document.getElementById("compTrans");
const transferComplite = document.getElementById("transferComplite");
const canselTransfer = document.getElementById("canselTrans");
const tableCanselTransfers = document.getElementById("transferCansel");
const comitTransfers = document.getElementById("comitTransfers");
const tableSentTransfers = document.getElementById("tableSentTransfers");
const sentTransfers = document.getElementById("sentTransfers");
const tableInboxTransfers = document.getElementById("tableInboxTransfers");
const valueToTransfer = document.getElementById("value");
const code = document.getElementById("code");
const whoTransact = document.getElementById("who");
const createNewUser = document.getElementById("createNewUsers");
const tableOffers = document.getElementById("tableOffersUp");

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
    createNewUser.style.display = "none";
    tableOffers.style.display = "none";
    CheckRole(users);
    valueToTransfer.value = "";
    code.value = "";
    document.getElementById("balance").textContent = "Баланс кошелька:" + " " + (await web3.eth.getBalance(whoTransact.value)) / 10 ** 18 + " " + "Eth";
}

export default GoToMenu