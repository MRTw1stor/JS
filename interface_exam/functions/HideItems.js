const header = document.getElementById("header");
const checkStatements = document.getElementById("checkStatements");
const newStatements = document.getElementById("newStatements");
const changeStatements = document.getElementById("changeStatements");

async function HideItems() {
    header.style.display = "none";
    checkStatements.style.display = "none";
    newStatements.style.display = "none";
    changeStatements.style.display = "none";
}

export default HideItems