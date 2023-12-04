const user = document.querySelector(".user");
const transfer = document.querySelector(".transfer");
const newtransfer = document.querySelector(".newtransfer");
const compTrans = document.querySelector(".compTrans");
const canselTransfer = document.querySelector(".canselTrans");
const comitTransfers = document.querySelector(".comitTransfers");
const sentTransfers = document.querySelector(".sentTransfers");
const newUsers = document.querySelector(".newUsers");
const roleUp = document.querySelector(".roleUp");
const comliteUp = document.querySelector(".comliteUp");

// функция удаления всего лишнего
async function RemoveItem() {
    user.style.display = "none";
    transfer.style.display = "none";
    newtransfer.style.display = "none";
    compTrans.style.display = "none";
    canselTransfer.style.display = "none";
    comitTransfers.style.display = "none";
    sentTransfers.style.display = "none";
    roleUp.style.display = "none";
    comliteUp.style.display = "none";
    newUsers.style.display = "none";
}

export default RemoveItem