const header = document.getElementById("header");
const checkStatements = document.getElementById("checkStatements");
const newStatements = document.getElementById("newStatements");
const changeStatements = document.getElementById("changeStatements");
const StatementsCheck = document.getElementById("StatementsCheck");
const StatementsNew = document.getElementById("StatementsNew");
const StatementsChange = document.getElementById("StatementsChange");

async function GoToMenu() {
    header.style.display = "block";
    checkStatements.style.display = "block";
    newStatements.style.display = "block";
    changeStatements.style.display = "block";
    StatementsCheck.style.display = "none";
    StatementsNew.style.display = "none";
    StatementsChange.style.display = "none";
}

export default GoToMenu