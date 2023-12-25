const role = document.getElementById("statustext2")
const changeStatements = document.getElementById("changeStatements")
const admin = '0xb8840F78e62F4e87092BEd970F16abdD2f53731E';

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