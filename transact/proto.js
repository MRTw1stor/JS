// Импортируем api контракта
import { abi } from "./abi.js";

// Имортируем другие функции
import CheckRole from "./functions/CheckRole.js";
import RemoveItem from "./functions/RemoveItem.js";
import GoToMenu from "./functions/GoToMenu.js";
import CompliteTransfer from "./functions/CompliteTransfer.js";
import SentTransaction from "./functions/SentTransaction.js";
import InboxTransaction from "./functions/InboxTransaction.js";
import CanselTransfer from "./functions/CanselTransfer.js";
import HideItems from "./functions/HideItems.js";

// Адрес контракта и порт
const contractAddress = "0xeC0c561E7eBcE28dCf0E73Ea79d59cEe2Fc04BF0";
const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));
const myContract = new web3.eth.Contract(abi, contractAddress);

// Переменные для использования
const transfer = document.querySelector(".transfer");
const whoTransact = document.getElementById("who");
const whomTransact = document.getElementById("whom");
const valueToTransfer = document.querySelector(".value");
const code = document.querySelector(".code");

// Переменные функции контракта
let users = await myContract.methods.Check_Users().call();
let allTransfers = await myContract.methods.Check_Transfers().call();

// Функция для обновления данных
async function UpdateData() {
  users = await myContract.methods.checkUsers().call();
  allTransfers = await myContract.methods.Check_Transfers().call();
}

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
  CheckRole(users);

  // Показываем и обновляем баланс пользователям
  document.querySelector(".balance").textContent = "Баланс кошелька:" + " " + (await web3.eth.getBalance(whoTransact.value)) / 10 ** 18 + " " + "Eth";
  whoTransact.addEventListener("change", async () => {
    document.querySelector(".balance").textContent = "Баланс кошелька:" + " " + (await web3.eth.getBalance(whoTransact.value)) / 10 ** 18 + " " + "Eth";
  });
  whoTransact.addEventListener("change", async () => {
    CheckRole(users);
  });
}

getAccaunts();

// Функция введения данных в перевод
async function DateToTransfer() {
  RemoveItem();
  transfer.style.display = "block";

  const accounts = await web3.eth.getAccounts();
  const acaunts = accounts;

  for (let i = 0; i < acaunts.length; i++) {
    let address = document.createElement("option");
    address.text = acaunts[i];
    whomTransact.add(address);
  }

  // Берем данные перевода и проверяем их на валидность
  document.querySelector(".Balance").textContent = "Баланс кошелька:" + " " + (await web3.eth.getBalance(whoTransact.value)) / 10 ** 18 + " " + "Eth";
  document.getElementById("gotransfer").addEventListener("click", async () => {

    // Если пользователь что то неправильно ввел выводим ему ошибку с указанием
    if (valueToTransfer.value <= 0 || valueToTransfer.value > (await web3.eth.getBalance(whoTransact.value))) {
      alert("Неккоректное число")}
    if (code.value.trim() === "") {
      alert("Введите кодовое слово")}
    if (whoTransact.value == whomTransact.value) {
      alert("Вы не можете переводить деньги самому себе")}
    else {
      valueToTransfer.value = "";
      code.value = "";
      console.log(valueToTransfer.value);
      console.log(code.value);
      document.getElementById("gotransfer").addEventListener("click", async () => { await transferMoney() });
    }
  });
}

document.getElementById("newTrans").addEventListener("click", async () => { await DateToTransfer() });

// Функция перевода денег другому человеку
async function transferMoney() {
  const fromAddress = whoTransact.value;
  const selectedAccount = whomTransact.value;
  const valueToTransfers = valueToTransfer.value;
  const convertMoney = web3.utils.toWei(valueToTransfers, "ether");
  const codes = code.value;

  // Вызываем функцию Transfeeer из смарт-контракта
  await myContract.methods
    .Transfeeer(selectedAccount, convertMoney, ethers.utils.formatbytes32string(codes))
    .send({
      from: fromAddress,
      value: parseInt(convertMoney),
      gas: 1000000,
    });
    console.log(convertMoney);
    console.log(ethers.utils.formatbytes32string(codes));
  document.querySelector(".Balance").textContent = "Баланс кошелька:" + " " + (await web3.eth.getBalance(whoTransact.value)) / 10 ** 18 + " " + "Eth";
}

// Функция подтверждения перевода
document.getElementById("compliteTransfer").addEventListener("click", async () => { await CompliteTransfer(allTransfers, compliteMoneyTransfer, canselMoneyTransfer, RemoveItem) });

// функция которая передает деньги другому человеку
async function compliteMoneyTransfer() {
  const accept = document.querySelectorAll(".buttonAccept");
  const codeValue = document.querySelector(".input_list").value;

  for (const btn of accept) {
    btn.addEventListener("click", async (event) => {
      const transferId = event.target.id;
      await myContract.methods.CompliteTransfer(transferId, ethers.utils.formatbytes32string(codeValue)).
      send({ from: whoTransact.value });
    });
  }
}

// Функция которая отменяет перевод принимающим человеком
async function canselMoneyTransfer() {
  const cansel = document.querySelectorAll(".buttonCansel");
  
  for (const btn of cansel) {
    btn.addEventListener("click", async (event) => {
      const transferId = event.target.id;
      await myContract.methods.CanselTransfer(transferId, {
        from: whoTransact.value,
      });
    });
  }
}

document.getElementById("canselTransfer").addEventListener("click", async () => { await CanselTransfer(allTransfers, RemoveItem, CanselMoney) })

async function CanselMoney(){
  const cansel = document.querySelectorAll(".buttonRevert")

  for(const btn of cansel){
    btn.addEventListener("click", async () => {
      const transferId = document.querySelectorAll(".buttonRevert")
      transferId.forEach(async (item) => {
        await myContract.methods.RevertTransfer(item.id).send({
          from: whoTransact.value,
        })
      })
    })
  }
}

// функция которая показывает входящие пользователю переводы
document.getElementById("comitTrans").addEventListener("click", async () => { await InboxTransaction(allTransfers, RemoveItem) });

// функция которая показывает отправленые пользователем переводы
document.getElementById("sentTrans").addEventListener("click", async () => { await SentTransaction(allTransfers, RemoveItem) });

document.getElementById("quickButton").addEventListener("click", async () => { await GoToMenu(CheckRole, web3, users) });
document.getElementById("quick").addEventListener("click", async () => { await GoToMenu(CheckRole, web3, users) });
document.getElementById("quickBtn").addEventListener("click", async () => { await GoToMenu(CheckRole, web3, users) });
document.getElementById("quicBtn").addEventListener("click", async () => { await GoToMenu(CheckRole, web3, users) });
document.getElementById("quicBtnn").addEventListener("click", async () => { await GoToMenu(CheckRole, web3, users) });