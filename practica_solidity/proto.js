// Импортируем abi контракта
import { abi } from "./abi.js";

// Адрес контракта и порт
const contractAddress = '0x532270B7618Fd5436311B1Ab34EE9225D1B1fD97';
const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));
const myContract = new web3.eth.Contract(abi, contractAddress);

// Переменные для использования
const sigIn = document.getElementById("SigIn");
let whoTransact = document.getElementById("who");
const siginPassword = document.getElementById("inputPasword");

const createPassword = document.getElementById("CreatePassword");
createPassword.style.display = "none"
const password = document.getElementById("createPasword")
const acceptPassword = document.getElementById("acceptCreatePassword")

const profile = document.getElementById("Profile")
profile.style.display = "none"
const profilename = document.getElementById("profiletext2")
const profilestatus = document.getElementById("roletext2")

let users = await myContract.methods.checkUsers().call();
let shops = await myContract.methods.checkShops().call();

// Функция отрисовки пользователей
async function getAccaunts() {
   const accounts = await web3.eth.getAccounts();
  let acaunts = accounts;

  // Создаем всех пользователей в виде выпадающих списков
  for (let i = 0; i < acaunts.length; i++) {
    let address = document.createElement("option");
    address.text = acaunts[i];
    whoTransact.add(address);
  }
}

getAccaunts();

// Функция перехода к окну регистрации пароля
document.getElementById("newPasword").addEventListener("click", async () => {
  async function goCreatePassword() {
    createPassword.style.display = "block"
    sigIn.style.display = "none"
  }
  goCreatePassword()
})

// Функция перехода к окну входа
document.getElementById("goToSigIn").addEventListener("click", async () => {
  async function goSigIn() {
    createPassword.style.display = "none"
    sigIn.style.display = "block"
    password.value = ""
    acceptPassword.value = ""
  }
  goSigIn()
})

// Функция регистрации пароля
document.getElementById("createNewPassword").addEventListener("click", async () => {
  async function createNewPassword() {
    const userAddress = whoTransact.value;
    const newPassword = password.value;

    if (password.value.trim() === "") {
      alert("Введите пароль")
    }
    if (acceptPassword.value !== password.value) {
    alert("Пароли не совпадают")
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
  createNewPassword()
});

document.getElementById("signIn").addEventListener("click", async () => {
  async function SignInProfile() {
    let users = JSON.parse(localStorage.getItem("users"));
    let currentUser = users.find(user => user.userAddress === whoTransact.value && user.userPassword === siginPassword.value);

    if (currentUser) {
      alert(`Здравствуйте, ${whoTransact.value}! Вход выполнен успешно.`);
      sigIn.style.display = "none"
      SpavnProfile()
    }
    else {
      alert("Неправильный логин или пароль");
    }
  }
  SignInProfile()
});

// Функция создания профиля входящего человека
async function SpavnProfile() {
  profile.style.display = "block"
  profilename.textContent = `${whoTransact.value}`
  CheckRole()
}

// Функция которая в зависимости от статуса отображает роль в профиле
async function CheckRole() {
  for (let i = 0; i < users.length; i++){
    if (whoTransact.value == users[i].user) {
      if (users[i].status_admin == true && users[i].status_buyer == true) {
        profilestatus.textContent = "Администратор, покупатель"
      }
      if (users[i].status_seller == true && users[i].status_buyer == true) {
        profilestatus.textContent = "Продавец, покупатель"
      }
      if (users[i].status_admin != true && users[i].status_seller != true) {
        profilestatus.textContent = "Покупатель"
      }
    }
  }
  for (let i = 0; i < shops.length; i++) {
    if (whoTransact.value == shops[i].shop) {
      profilestatus.textContent = "Магазин"
    }
  }
}