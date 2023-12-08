let whoTransact = document.getElementById("who");
const password = document.getElementById("createPasword")
const acceptPassword = document.getElementById("acceptCreatePassword")

// Функция регистрации пароля
async function CreateNewPassword() {
    const userAddress = whoTransact.value;
    const newPassword = password.value;

    if (password.value.trim() === "") {
        alert("Введите пароль")
        return;
    }
    if (password.value > 2 && password.value < 12) {
        alert("Пароль должен содержать не менее 4 и не более 12 символов")
        return;
    }
    if (acceptPassword.value !== password.value) {
        alert("Пароли не совпадают")
        return;
    }
    if (acceptPassword.value === password.value) {
        let users = JSON.parse(localStorage.getItem("users")) || [];
        let userAdress = users.findIndex(user => user.userAddress === userAddress);

        if (userAdress !== -1) {
            users[userAdress].userPassword = newPassword;
            alert("Вы успешно изменили пароль")
        }
        else {
            users.push({ userAddress, userPassword: newPassword });
            alert("Вы успешно создали пароль")
        }

        localStorage.setItem("users", JSON.stringify(users));
    }
}

export default CreateNewPassword