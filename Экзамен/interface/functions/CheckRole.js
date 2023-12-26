const role = document.getElementById("statustext2")
const changeStatements = document.getElementById("changeStatements")
const admin = '0x00d237588def293d7405C6A956207D0F3FA8B794';

async function CheckRole(userAccount) {
    if (userAccount.toLowerCase() === admin.toLowerCase()) {
        role.textContent = "Администратор";
        changeStatements.style.display = "block";
    } else {
        role.textContent = "Пользователь";
        changeStatements.style.display = "none";
    }
}

export default CheckRole