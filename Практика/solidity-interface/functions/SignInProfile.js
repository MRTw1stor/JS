const login = document.getElementById("Login");
const loginPassword = document.getElementById("inputlogin");
let whoTransact = document.getElementById("who");

// Функция входа в аккаунт
async function SignInProfile(SpavnProfile) {
    let users = JSON.parse(localStorage.getItem("users"));
    let currentUser = users.find(user => user.userAddress === whoTransact.value && user.userPassword === loginPassword.value);

    if (currentUser) {
        alert(`Здравствуйте, ${whoTransact.value}! Вход выполнен успешно.`);
        login.style.display = "none"
        loginPassword.value = ""
        SpavnProfile()
    }
    else {
        alert("Неправильный логин или пароль");
    }
}

export default SignInProfile