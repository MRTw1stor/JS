const transfer = document.getElementById("transfer");
const transferComplite = document.getElementById("transferComplite");
const tableCanselTransfers = document.getElementById("transferCansel");
const tableInboxTransfers = document.getElementById("tableInboxTransfers");
const tableSentTransfers = document.getElementById("tableSentTransfers");
const createNewUser = document.getElementById("createNewUsers");

// Функция скрывающая элементы
async function HideItems() {
    transfer.style.display = "none";
    transferComplite.style.display = "none";
    tableCanselTransfers.style.display = "none";
    tableInboxTransfers.style.display = "none";
    tableSentTransfers.style.display = "none";
    createNewUser.style.display = "none";
}

export default HideItems
