const user = document.getElementById("user");
const transfer = document.getElementById("transfer");
const newtransfer = document.getElementById("newtransfer");
const compTrans = document.getElementById("compTrans");
const canselTransfer = document.getElementById("canselTrans");
const comitTransfer = document.getElementById("comitTransfers");
const sentTransfers = document.getElementById("sentTransfers");
const newUsers = document.getElementById("newUsers");
const roleUp = document.getElementById("roleUp");
const comliteUp = document.getElementById("comliteUp");

// Функция удаления всего лишнего
async function RemoveItem() {
    user.style.display = "none";
    transfer.style.display = "none";
    newtransfer.style.display = "none";
    compTrans.style.display = "none";
    canselTransfer.style.display = "none";
    comitTransfer.style.display = "none";
    sentTransfers.style.display = "none";
    roleUp.style.display = "none";
    comliteUp.style.display = "none";
    newUsers.style.display = "none";
}

export default RemoveItem
