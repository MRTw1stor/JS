// Импортируем api контракта
import { abi } from "./abi.js";

// Имортируем другие функции
import CheckRole from "./functions/CheckRole.js";
import RemoveItem from "./functions/RemoveItem.js";
import GoToMenu from "./functions/GoToMenu.js";
import SentTransaction from "./functions/SentTransaction.js";
import InboxTransaction from "./functions/InboxTransaction.js";
import HideItems from "./functions/HideItems.js";

// Адрес контракта и порт
const contractAddress = "0xfA4D8f28cECc8853752d6eA2e99e8d02Ec20f778";
const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));
const myContract = new web3.eth.Contract(abi, contractAddress);

console.log(myContract)

// Переменные для использования
const transfer = document.querySelector(".transfer");
const transferComplite = document.querySelector(".transferComplite");
const tableCanselTransfers = document.querySelector(".transferCansel");
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
      alert("Неккоректное число")
    }
    if (code.value.trim() === "") {
      alert("Введите кодовое слово")
    }
    if (whoTransact.value == whomTransact.value) {
      alert("Вы не можете переводить деньги самому себе")
    }
    else {
      await transferMoney();
      valueToTransfer.value = "";
      code.value = "";
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

  const passwordHash = web3.utils.sha3(codes);

  // Вызываем функцию Transfeeer из смарт-контракта
  await myContract.methods
    .Transfeeer(selectedAccount, convertMoney, passwordHash)
    .send({
      from: fromAddress,
      value: parseInt(convertMoney),
      gas: 1000000,
    });
  document.querySelector(".Balance").textContent = "Баланс кошелька:" + " " + (await web3.eth.getBalance(whoTransact.value)) / 10 ** 18 + " " + "Eth";
}

// Функция подтверждения перевода
async function CompliteTransfer(allTransfers) {
  RemoveItem();
  transferComplite.style.display = "block";
  const tableComplite = document.getElementById("tableComplite");

  for (let i = 0; i < allTransfers.length; i++) {
    if (whoTransact.value == allTransfers[i].to) {
      let body = document.createElement("tbody");
      let tdName = document.createElement("td");
      let tdMoney = document.createElement("td");
      let tdPasword = document.createElement("td");

      let input = document.createElement("input");
      input.classList.add("input_list");
      input.id = `${allTransfers[i].id_transfer}`;
      input.type = "password";
      tdPasword.append(input);

      let tdButtonComl = document.createElement("td");
      let Button = document.createElement("button");
      Button.classList.add("buttonAccept");
      Button.id = `${allTransfers[i].id_transfer}`;
      Button.textContent = "Подтвердить";
      Button.addEventListener("click", async () => { await compliteMoneyTransfer() })
      tdButtonComl.append(Button);

      let tdButtonCans = document.createElement("td");
      let button = document.createElement("button");
      button.classList.add("buttonCansel");
      button.id = `${allTransfers[i].id_transfer}` + `${allTransfers[i].id_transfer}`;
      button.textContent = "Отменить";
      tdButtonCans.append(button);

      tdName.textContent = allTransfers[i].who;
      tdMoney.textContent = allTransfers[i].money / 100 ** 18 + " " + "Eth";
      body.append(tdName, tdMoney, tdPasword, tdButtonComl, tdButtonCans);
      tableComplite.append(body);

      document.getElementById("quicBtn").addEventListener("click", () => {
        body.remove();
      });
    }
  }
}
document.getElementById("compliteTransfer").addEventListener("click", async () => { await CompliteTransfer(allTransfers) });

// функция которая передает деньги другому человеку
async function compliteMoneyTransfer() {
  const AcceptButtons = document.querySelectorAll(".buttonAccept")
  const password = document.querySelectorAll(".input_list");

  for (const btn of AcceptButtons) {
    console.log("12");
    for (const pass of password) {
      console.log("34");
      if (btn.id === pass.id) {
        console.log("56");
        const hashPass = web3.utils.sha3(pass.value);
        await myContract.methods.CompliteTransfer(parseInt(pass.id), hashPass).send({
          from: whoTransact.value,
          gas: 30000000,
          value: 0
        });
      };
    }
  }
};


// Функция которая отменяет перевод принимающим человеком
async function canselMoneyTransfer() {

}

async function CanselTransfer(allTransfers) {
  RemoveItem()
  tableCanselTransfers.style.display = "block";
  const tableCansel = document.getElementById("tableCansel")

  for (let i = 0; i < allTransfers.length; i++) {
    if (whoTransact.value == allTransfers[i].who &&
      allTransfers[i].status_execution == true &&
      allTransfers[i].status_reception == false) {

      let body = document.createElement("tbody");
      let tdName = document.createElement("td");
      let tdMoney = document.createElement("td");
      let tdButton = document.createElement("td");

      const Button = document.createElement("button");
      Button.classList.add("buttonRevert");
      Button.id = `${allTransfers[i].id_transfer}`;
      Button.textContent = "Отменить";
      tdButton.append(Button);

      tdName.textContent = allTransfers[i].to;
      tdMoney.textContent = allTransfers[i].money / 100 ** 18 + " " + "Eth";
      body.append(tdName, tdMoney, tdButton);
      tableCansel.append(body);
      document.getElementById("quicBtnn").addEventListener("click", () => {
        body.remove();
      });
      CanselMoney()
    }
  }
}
document.getElementById("canselTransfer").addEventListener("click", async () => { await CanselTransfer(allTransfers) })



async function CanselMoney() {

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