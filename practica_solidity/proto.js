// Импортируем abi контракта
import { abi } from "./abi.js";

// Имортируем другие функции
import CheckRole from "./functions/CheckRole.js";
import GoToLogin from "./functions/GoToLogin.js";
import HideItems from "./functions/HideItems.js";
import RoleItems from "./functions/RoleItems.js";

// Адрес контракта и порт
const contractAddress = '0x9A50988C3FAA48D2EB9254B727fEEf837164a1b0';
const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));
const myContract = new web3.eth.Contract(abi, contractAddress);

// Переменные для использования
const login = document.getElementById("Login");
let whoTransact = document.getElementById("who");
const loginPassword = document.getElementById("inputlogin");

const createPassword = document.getElementById("CreatePassword");
const password = document.getElementById("createPasword")
const acceptPassword = document.getElementById("acceptCreatePassword")

const profile = document.getElementById("Profile")
const profilename = document.getElementById("profiletext2")

// Переменные функции контракта
let users = await myContract.methods.checkUsers().call();
let shops = await myContract.methods.checkShops().call();
let workers = await myContract.methods.checkWorkers().call();
let requestes = await myContract.methods.checkRequest().call();

HideItems()

// Функция отрисовки пользователей
async function getAccaunts() {
  const accounts = await web3.eth.getAccounts();
  const acaunts = accounts;

  // Создаем всех пользователей в виде выпадающих списков
  for (let i = 0; i < acaunts.length; i++) {
    let address = document.createElement("option");
    address.text = acaunts[i];
    whoTransact.add(address);
  }

  document.getElementById("balansetext2").textContent = (await web3.eth.getBalance(whoTransact.value)) / 10 ** 18 + " " + "Eth";
}

getAccaunts();

// Функция регистрации нового пользователя
document.getElementById("registration").addEventListener("click", async () => {
  async function Registration() {
    let fromAddress = whoTransact.value

    for (let i = 0; i < shops.length; i++) {
      if (whoTransact.value == shops[i].shop) {
        alert("Влыделец магазина не может стать покупателем")
        return;
      }
    }

    for (let i = 0; i < users.length; i++){
      if (whoTransact.value == users[i].user) {
        alert("Вы уже зарегистрированы в системе")
        return;
      }
      else {
        // await myContract.methods.NewUsers().send({ 
        //   from: fromAddress
        // })
        alert("Вы успешно зарегистрированы в системе")
        return;
      }
    }
  }
  Registration()
})

// Функция перехода к окну регистрации пароля
document.getElementById("newPasword").addEventListener("click", async () => {
  async function goCreatePassword() {
    createPassword.style.display = "block"
    login.style.display = "none"
  }
  goCreatePassword()
})

// Функция регистрации пароля
document.getElementById("createNewPassword").addEventListener("click", async () => {
  async function createNewPassword() {
    const userAddress = whoTransact.value;
    const newPassword = password.value;

    if (password.value.trim() === "") {
      alert("Введите пароль")
      return;
    }
    if (password.value >= 2 && password.value <= 12){
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
  createNewPassword()
});

// Функция перехода к окну входа
document.getElementById("gologin").addEventListener("click", async () => {
  async function GoLogin() {
    createPassword.style.display = "none"
    login.style.display = "block"
    password.value = ""
    acceptPassword.value = ""
  }
  GoLogin()
})

// Функция входа в аккаунт
document.getElementById("login").addEventListener("click", async () => {
  async function SignInProfile() {
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
  SignInProfile()
});

// Функция выхода из аккаунта
document.getElementById("gotologinbutton").addEventListener("click", GoToLogin);

// Функция создания профиля входящего человека
async function SpavnProfile() {
  profile.style.display = "block"
  profilename.textContent = `${whoTransact.value}`
  CheckRole(users, shops, workers)
  RoleItems(users)
  console.log(shops);
  console.log(users);
  console.log(workers);
}

// Функция подачи заявки на понижение до покупателя
document.getElementById("createrequestbutton").addEventListener("click", async () => {
  async function CreateRequestToBuyer() {
    let fromAddress = whoTransact.value;

    if (requestes.length === 0){
      await myContract.methods.RequestDownSeller().send({ from: fromAddress, gas: 3000000 });
      alert("Вы успешно подали заявку на понижение");
    }
    else{
      for (let i = 0; i < requestes.length; i++){
        if (fromAddress != requestes[i].down_worker){
          await myContract.methods.RequestDownSeller().send({ from: fromAddress, gas: 3000000 });
          alert("Вы успешно подали заявку на понижение");
        }
        else{
          alert("Вы уже подали заявку на понижение");
        }
      }
    }
  }
  CreateRequestToBuyer()
});

// Функция устройства на работу в магазин
document.getElementById("workshopbutton").addEventListener("click", async () => {
  async function GoToWorkShop() {
    const fromAddress = whoTransact.value;
    const workshopinput = document.getElementById("workshopinput")

    for (let i = 0; i < workers.length; i++) {
      if (fromAddress === workers[i].worker) {
        alert("Вы уже работаете в магазине");
        return;
      }
    }

    let shopFound = 0;

    for (let i = 0; i < shops.length; i++) {
      if (workshopinput.value === shops[i].id_shop) {
        shopFound++
        await myContract.methods.GoSettledToShop(workshopinput.value).send({ 
          from: fromAddress,
          value: workshopinput.value,
          gas: 3000000
        });
        alert("Поздравляем! Теперь вы работаете в магазине");
      }
    }

    if(shopFound == 0){
      alert("Такого магазина не существует");
      return
    }
  }
  GoToWorkShop()
});

// Функция повышения покупателя до роли продавца
document.getElementById("improvebutton").addEventListener("click", async () => {
  async function UpBuyerToSeller(){
    const whoup = document.getElementById("whoimprove").value;
    const fromAddress = whoTransact.value;
    let foundWorker = 0;
    let isBuyer = 0;

    for (let i = 0; i < workers.length; i++){
      if (whoup === workers[i].worker) {
        foundWorker++;
        break;
      }
    }

    if (foundWorker === 0) {
      alert("Этот человек еще не устроился на работу");
      return;
    }

    for (let i = 0; i < users.length; i++){
      if (whoup === users[i].user && users[i].status_seller === false){
        isBuyer++;
      }
    }

    if (isBuyer === 0) {
      alert("Этот человек уже продавец");
    } else {
      await myContract.methods.UpBuyer(whoup).send({ 
        from: fromAddress,
        value: whoup,
        gas: 3000000
      });
      alert("Вы повысили этого человека");
    }
  }
  UpBuyerToSeller()
})

// Функция понижения продавца до роли покупатель
document.getElementById("lowerbutton").addEventListener("click", async () => {
  async function DownSellerToBuyer(){
    const whodown = document.getElementById("wholover").value;
    const fromAddress = whoTransact.value;
    let isSeller = 0;

    for (let i = 0; i < users.length; i++){
      if (whodown === users[i].user && users[i].status_seller === true){
        isSeller++;
      }
    }

    if (isSeller !== 0) {
      await myContract.methods.DownSeller(whodown).send({ 
        from: fromAddress,
        value: whodown,
        gas: 3000000
      });
      alert("Вы понизили этого человека");
    }
  }
  DownSellerToBuyer()
})

// Функция создания нового администратора
document.getElementById("newadminiatratorsbutton").addEventListener("click", async () => {
  async function CreateNerAdmin(){
    const newadmin = document.getElementById("newadminiatratorinput").value;
    const fromAddress = whoTransact.value;
    let isUser = 0;

    for (let i = 0; i < users.length; i++){
      if (newadmin !== users[i].user){
        isUser++;
      }
    }

    if (isUser === 0) {
      alert("Этот адрес уже кем-то используеться");
    }
    else{
      await myContract.methods.NewAdministrators(newadmin).send({ 
        from: fromAddress,
        value: newadmin,
        gas: 3000000
      });
      alert("Вы успешно создали нового администратора");
    }
  }
  CreateNerAdmin()
})

// Функция удаления магазина
document.getElementById("deleteshopbutton").addEventListener("click", async () => {
  async function DeleteShop(){
    const idshop = document.getElementById("deleteshopinput").value;
    console.log(idshop);
    const fromAddress = whoTransact.value;
    let isShop = 0;

    for (let i = 0; i < shops.length; i++){
      if (idshop === shops[i].id_shop){
        isShop++;
      }
    }

    if (isShop === 0) {
      alert("Такого магазина не существует");
    }
    else{
      await myContract.methods.DeleteShop(idshop).send({ 
        from: fromAddress,
        value: idshop,
        gas: 3000000
      });
      alert("Вы успешно удалили магазин");
    }
  }
  DeleteShop()
})