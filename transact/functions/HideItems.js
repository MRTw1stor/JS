const transfer = document.querySelector(".transfer");
const transferComplite = document.querySelector(".transferComplite");
const tableCanselTransfers = document.querySelector(".transferCansel");
const tableInboxTransfers = document.querySelector(".tableInboxTransfers");
const tableSentTransfers = document.querySelector(".tableSentTransfers");

async function HideItems() {
    transfer.style.display = "none";
    transferComplite.style.display = "none";
    tableCanselTransfers.style.display = "none";
    tableInboxTransfers.style.display = "none";
    tableSentTransfers.style.display = "none";
}

export default HideItems