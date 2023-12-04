// Импортируем api контракта
import { abi } from "./abi.js";

// Имортируем другие функции
import CheckRole from "./functions/CheckRole.js";
import RemoveItem from "./functions/RemoveItem.js";
import GoToMenu from "./functions/GoToMenu.js";
import SentTransaction from "./functions/SentTransaction.js";
import InboxTransaction from "./functions/InboxTransaction.js";
import CanselTransfer from "./functions/CanselTransfer.js";
import HideItems from "./functions/HideItems.js";

// Адрес контракта и порт
const contractAddress = "0xFd6ae78e12f1Fd52aC667d54F5AaE122B86cCCcb";
const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));
const myContract = new web3.eth.Contract(abi, contractAddress);

// Переменные для использования
const transfer = document.querySelector(".transfer");
const transferComplite = document.querySelector(".transferComplite");
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
  console.log(convertMoney);
  console.log(passwordHash);
  document.querySelector(".Balance").textContent = "Баланс кошелька:" + " " + (await web3.eth.getBalance(whoTransact.value)) / 10 ** 18 + " " + "Eth";
}

// Функция подтверждения перевода
document.getElementById("compliteTransfer").addEventListener("click", async () => {
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
        button.addEventListener("click", canselMoneyTransfer())
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
  CompliteTransfer(allTransfers)
});

// функция которая передает деньги другому человеку
async function compliteMoneyTransfer() {
  const accept = document.querySelectorAll(".buttonAccept");

  for (const btn of accept) {
    btn.addEventListener("click", async (event) => {
      const transferId = event.target.id;
      const inputs = document.querySelectorAll(".input_list")
      let code;

      inputs.forEach(item => {
        if (item.id == transferId) {
          code = item.value
        }
      })

      const passwordHash = await web3.utils.sha3(code);
      console.log(passwordHash);
      await myContract.methods.CompliteTransfer(transferId, passwordHash).
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

async function CanselMoney() {
  const cansel = document.querySelectorAll(".buttonRevert")

  for (const btn of cansel) {
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