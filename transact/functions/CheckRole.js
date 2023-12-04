const whoTransact = document.getElementById("who");
const newUsers = document.querySelector(".newUsers");
const roleUp = document.querySelector(".roleUp");
const comliteUp = document.querySelector(".comliteUp");

async function CheckRole(users) {
    for (let i = 0; i < users.length; i++) {
        if (whoTransact.value == users[i].login_user) {
            if (users[i].status_user == true) {
                document.querySelector(".role").textContent = `${"Ваша роль: Администратор"}`;
                newUsers.style.display = "block";
                roleUp.style.display = "none";
                comliteUp.style.display = "block";} 
            else if (users[i].status_user == false) {
                document.querySelector(".role").textContent = `${"Ваша роль: Пользователь"}`;
                newUsers.style.display = "none";
                comliteUp.style.display = "none";
                roleUp.style.display = "block";
            }
        }
    }
}

export default CheckRole