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
const contractAddress = "0xC385EE20fDFbec88b2D132E59d657aEFB01e1f74";
const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));
const myContract = new web3.eth.Contract(abi, contractAddress);

// Переменные для использования
const transfer = document.getElementById("transfer");
const transferComplite = document.getElementById("transferComplite");
const tableCanselTransfers = document.getElementById("transferCansel");
const createNewUser = document.getElementById("createNewUsers");
const whoTransact = document.getElementById("who");
const whomTransact = document.getElementById("whom");
const valueToTransfer = document.getElementById("value");
const code = document.getElementById("code");

// Переменные функции контракта
let users = await myContract.methods.Check_Users().call();
let allTransfers = await myContract.methods.Check_Transfers().call();

// Функция для обновления данных
async function UpdateData() {
  users = await myContract.methods.Check_Users().call();
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
  document.getElementById("balance").textContent = "Баланс кошелька:" + " " + (await web3.eth.getBalance(whoTransact.value)) / 10 ** 18 + " " + "Eth";
  whoTransact.addEventListener("change", async () => {
    document.getElementById("balance").textContent = "Баланс кошелька:" + " " + (await web3.eth.getBalance(whoTransact.value)) / 10 ** 18 + " " + "Eth";
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

  document.getElementById("Balance").textContent = "Баланс кошелька:" + " " + (await web3.eth.getBalance(whoTransact.value)) / 10 ** 18 + " " + "Eth";
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
      alert("Вы успешно создали транзакцию")
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

  await myContract.methods
    .Transfeeer(selectedAccount, convertMoney, passwordHash)
    .send({
      from: fromAddress,
      value: parseInt(convertMoney),
      gas: 1000000,
    });
  document.querySelector(".Balance").textContent = "Баланс кошелька:" + " " + (await web3.eth.getBalance(whoTransact.value)) / 10 ** 18 + " " + "Eth";
  UpdateData()
}

// Функция которая отрисовывает и добавляет данные в таблицу подтвердить переводы
async function CompliteTransfer(allTransfers) {
  RemoveItem();
  transferComplite.style.display = "block";
  const tableComplite = document.getElementById("tableComplite");

  for (let i = 0; i < allTransfers.length; i++) {
    if (whoTransact.value == allTransfers[i].to &&
      allTransfers[i].status_execution == true &&
      allTransfers[i].status_reception == false) {

      let body = document.createElement("tbody");
      let tdName = document.createElement("td");
      let tdMoney = document.createElement("td");
      let tdPasword = document.createElement("td");
      let tdButtonComl = document.createElement("td");
      let tdButtonCans = document.createElement("td");

      let input = document.createElement("input");
      input.classList.add("input_list");
      input.id = `password_${allTransfers[i].id_transfer}`; // уникальный id для пароля
      input.type = "password";
      tdPasword.append(input);

      let Button = document.createElement("button");
      Button.classList.add("buttonAccept");
      Button.id = `accept_${allTransfers[i].id_transfer}`; // уникальный id для кнопки подтверждения
      Button.textContent = "Подтвердить";
      Button.addEventListener("click", async () => { await compliteMoneyTransfer(allTransfers[i].id_transfer, allTransfers) })
      tdButtonComl.append(Button);

      let button = document.createElement("button");
      button.classList.add("buttonCansel");
      button.id = `cancel_${allTransfers[i].id_transfer}`; // уникальный id для кнопки отмены
      button.textContent = "Отменить";
      button.addEventListener("click", async () => { await canselMoneyTransfer(allTransfers[i].id_transfer, allTransfers) })
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

// Функция подтверждения перевода
async function compliteMoneyTransfer(transferId, allTransfers) {
  const password = document.getElementById(`password_${transferId}`).value;
  const hashPass = web3.utils.sha3(password);

  for(let i = 0; i < allTransfers.length; i++){
    if (allTransfers[i].id_transfer === transferId && allTransfers[i].status_execution === true && allTransfers[i].status_reception === false){
      try {
        await myContract.methods.CompliteTransfer(parseInt(transferId), hashPass).send({
          from: whoTransact.value,
          gas: 30000000,
        });
        if(allTransfers[i].id_transfer === transferId && allTransfers[i].pasword === hashPass){
          alert('Вы приняли этот перевод');
        }
        else{
          alert('Перевод отменен. Вы ввели неправильный пароль.');
        }
        UpdateData();
        break;
      } catch (error) {
        alert('Этот перевод уже выполнен или отменен');
      }
    }
  }
}

// Функция отмены перевода получателем
async function canselMoneyTransfer(transferId, allTransfers) {
  for(let i = 0; i < allTransfers.length; i++){
    if (allTransfers[i].id_transfer === transferId && allTransfers[i].status_execution === true && allTransfers[i].status_reception === false){
      try {
        await myContract.methods.CanselTransfer(parseInt(transferId)).send({
          from: whoTransact.value,
          gas: 30000000,
        });
        alert('Вы отменили этот перевод');
        UpdateData();
        break;
      } catch (error) {
        alert('Этот перевод уже выполнен или отменен');
      }
    }
  }
}

// Функция которая отрисовывает и добавляет данные в таблицу отменить переводы
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

      let Button = document.createElement("button");
      Button.classList.add("buttonAccept");
      Button.id = `cansel_${allTransfers[i].id_transfer}`; // уникальный id для кнопки отклонения
      Button.textContent = "Отменить";
      Button.addEventListener("click", async () => { await CanselMoney(allTransfers[i].id_transfer, allTransfers) })
      tdButton.append(Button);

      tdName.textContent = allTransfers[i].to;
      tdMoney.textContent = allTransfers[i].money / 100 ** 18 + " " + "Eth";
      body.append(tdName, tdMoney, tdButton);
      tableCansel.append(body);
      document.getElementById("quicBtnn").addEventListener("click", () => {
        body.remove();
      });
    }
  }
}
document.getElementById("canselTransfer").addEventListener("click", async () => { await CanselTransfer(allTransfers) })


// Функция отмены перевода отправителем
async function CanselMoney(transferId, allTransfers) {
  for(let i = 0; i < allTransfers.length; i++){
    if (allTransfers[i].id_transfer === transferId && allTransfers[i].status_execution === true && allTransfers[i].status_reception === false){
      try {
        await myContract.methods.CanselTransferSender(parseInt(transferId)).send({
          from: whoTransact.value,
          gas: 30000000,
        });
        alert('Вы отменили этот перевод');
        UpdateData();
        break;
      } catch (error) {
        alert('Этот перевод уже выполнен или отменен');
      }
    }
  }
}

// функция которая показывает входящие пользователю переводы
document.getElementById("comitTrans").addEventListener("click", async () => { await InboxTransaction(allTransfers, RemoveItem) });

// функция которая показывает отправленые пользователем переводы
document.getElementById("sentTrans").addEventListener("click", async () => { await SentTransaction(allTransfers, RemoveItem) });

// Функция открытия окна создания нового пользоателя
document.getElementById("newUser").addEventListener("click", async () => {
  RemoveItem();
  createNewUser.style.display = "block"
});

// Функция создания нового пользователя
document.getElementById("createuser").addEventListener("click", async () => {
  const username = document.getElementById("createnewusername").value.trim();
  const useradress = document.getElementById("createnewuseradress").value.trim();

  if (username === "" || useradress === "") {
    alert("Пожалуйста, заполните все поля");
    return;
  }
  else{
    await myContract.methods.NewUsers(username, useradress).send({
      from: whoTransact.value,
      gas: 30000000,
    });
    alert('Вы упешно создали нового пользователя');
    UpdateData();
    username.value = ""
    useradress.value = ""
  }
});

// Выход в меню для всех кнопок выйти
document.querySelectorAll("#quickButton").forEach(button => {
  button.addEventListener("click", async () => {
    await GoToMenu(CheckRole, web3, users);
  });
});
