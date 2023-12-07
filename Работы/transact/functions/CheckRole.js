const whoTransact = document.getElementById("who");
const newUsers = document.getElementById("newUsers");
const roleUp = document.getElementById("roleUp");
const comliteUp = document.getElementById("comliteUp");

// Функция которая в зависимоти от роли отрисовывает элементы
async function CheckRole(users) {
    for (let i = 0; i < users.length; i++) {
        if (whoTransact.value == users[i].login_user) {
            if (users[i].status_user == true) {
                document.getElementById("role").textContent = `${"Ваша роль: Администратор"}`;
                newUsers.style.display = "block";
                roleUp.style.display = "none";
                comliteUp.style.display = "block";
            }
            else if (users[i].status_user == false) {
                document.getElementById("role").textContent = `${"Ваша роль: Пользователь"}`;
                newUsers.style.display = "none";
                comliteUp.style.display = "none";
                roleUp.style.display = "block";
            }
        }
    }
}

export default CheckRole
