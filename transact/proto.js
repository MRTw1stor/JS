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
const contractAddress = "0x3Bb6F30385411a11AB316855Fdd397256A9cD032";
const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));
const myContract = new web3.eth.Contract(abi, contractAddress);

// Переменные для использования
const transfer = document.getElementById("transfer");
const transferComplite = document.getElementById("transferComplite");
const tableCanselTransfers = document.getElementById("transferCansel");
const createNewUser = document.getElementById("createNewUsers");
const tableOffers = document.getElementById("tableOffersUp");
const whoTransact = document.getElementById("who");
const whomTransact = document.getElementById("whom");
const valueToTransfer = document.getElementById("value");
const code = document.getElementById("code");

// Переменные функции контракта
let users = await myContract.methods.Check_Users().call();
let transfers = await myContract.methods.Check_Transfers().call();
let offers = await myContract.methods.Check_Role().call();

// Функция для обновления данных
async function UpdateData() {
  users = await myContract.methods.Check_Users().call();
  transfers = await myContract.methods.Check_Transfers().call();
  offers = await myContract.methods.Check_Role().call();
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
      return
    }
    else {
      alert("Вы успешно создали транзакцию")
      await transferMoney();
      valueToTransfer.value = "";
      code.value = "";
      return
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
    .Transfer(selectedAccount, convertMoney, passwordHash)
    .send({
      from: fromAddress,
      value: parseInt(convertMoney),
      gas: 1000000,
    });
  document.getElementById("Balance").textContent = "Баланс кошелька:" + " " + (await web3.eth.getBalance(whoTransact.value)) / 10 ** 18 + " " + "Eth";
  UpdateData()
}

// Функция которая отрисовывает и добавляет данные в таблицу подтвердить переводы
async function CompliteTransfer(transfers) {
  RemoveItem();
  transferComplite.style.display = "block";
  const tableComplite = document.getElementById("tableComplite");

  for (let i = 0; i < transfers.length; i++) {
    if (whoTransact.value == transfers[i].to &&
      transfers[i].status_execution == true &&
      transfers[i].status_reception == false) {

      let body = document.createElement("tbody");
      let tdName = document.createElement("td");
      let tdMoney = document.createElement("td");
      let tdPasword = document.createElement("td");
      let tdButtonComl = document.createElement("td");
      let tdButtonCans = document.createElement("td");

      let input = document.createElement("input");
      input.classList.add("input_list");
      input.id = `password_${transfers[i].id_transfer}`; // уникальный id для пароля
      input.type = "password";
      tdPasword.append(input);

      let Button = document.createElement("button");
      Button.classList.add("buttonAccept");
      Button.id = `accept_${transfers[i].id_transfer}`; // уникальный id для кнопки подтверждения
      Button.textContent = "Подтвердить";
      Button.addEventListener("click", async () => { await compliteMoneyTransfer(transfers[i].id_transfer, transfers) })
      tdButtonComl.append(Button);

      let button = document.createElement("button");
      button.classList.add("buttonCansel");
      button.id = `cancel_${transfers[i].id_transfer}`; // уникальный id для кнопки отмены
      button.textContent = "Отменить";
      button.addEventListener("click", async () => { await canselMoneyTransfer(transfers[i].id_transfer, transfers) })
      tdButtonCans.append(button);

      tdName.textContent = transfers[i].who;
      tdMoney.textContent = transfers[i].money / 100 ** 18 + " " + "Eth";
      body.append(tdName, tdMoney, tdPasword, tdButtonComl, tdButtonCans);
      tableComplite.append(body);

      document.querySelectorAll("#quickButton").forEach(button => {
        button.addEventListener("click", async () => {
          body.remove();
        });
      });
    }
  }
}

document.getElementById("compliteTransfer").addEventListener("click", async () => { await CompliteTransfer(transfers) });

// Функция подтверждения перевода
async function compliteMoneyTransfer(transferId, transfers) {
  const password = document.getElementById(`password_${transferId}`).value;
  const hashPass = web3.utils.sha3(password);

  for (let i = 0; i < transfers.length; i++) {
    if (transfers[i].id_transfer === transferId && transfers[i].status_execution === true && transfers[i].status_reception === false) {
      try {
        await myContract.methods.CompliteTransfer(parseInt(transferId), hashPass).send({
          from: whoTransact.value,
          gas: 30000000,
        });
        if (transfers[i].id_transfer === transferId && transfers[i].pasword === hashPass) {
          alert('Вы приняли этот перевод');
        }
        else {
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
async function canselMoneyTransfer(transferId, transfers) {
  for (let i = 0; i < transfers.length; i++) {
    if (transfers[i].id_transfer === transferId && transfers[i].status_execution === true && transfers[i].status_reception === false) {
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
async function CanselTransfer(transfers) {
  RemoveItem()
  tableCanselTransfers.style.display = "block";
  const tableCansel = document.getElementById("tableCansel")

  for (let i = 0; i < transfers.length; i++) {
    if (whoTransact.value == transfers[i].who &&
      transfers[i].status_execution == true &&
      transfers[i].status_reception == false) {

      let body = document.createElement("tbody");
      let tdName = document.createElement("td");
      let tdMoney = document.createElement("td");
      let tdButton = document.createElement("td");

      let Button = document.createElement("button");
      Button.classList.add("buttonCansel");
      Button.id = `cansel_${transfers[i].id_transfer}`; // уникальный id для кнопки отклонения
      Button.textContent = "Отменить";
      Button.addEventListener("click", async () => { await CanselMoney(transfers[i].id_transfer, transfers) })
      tdButton.append(Button);

      tdName.textContent = transfers[i].to;
      tdMoney.textContent = transfers[i].money / 100 ** 18 + " " + "Eth";
      body.append(tdName, tdMoney, tdButton);
      tableCansel.append(body);

      document.querySelectorAll("#quickButton").forEach(button => {
        button.addEventListener("click", async () => {
          body.remove();
        });
      });
    }
  }
}
document.getElementById("canselTransfer").addEventListener("click", async () => { await CanselTransfer(transfers) })

// Функция отмены перевода отправителем
async function CanselMoney(transferId, transfers) {
  for (let i = 0; i < transfers.length; i++) {
    if (transfers[i].id_transfer === transferId && transfers[i].status_execution === true && transfers[i].status_reception === false) {
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
document.getElementById("comitTrans").addEventListener("click", async () => { await InboxTransaction(transfers, RemoveItem) });

// функция которая показывает отправленые пользователем переводы
document.getElementById("sentTrans").addEventListener("click", async () => { await SentTransaction(transfers, RemoveItem) });

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
  else {
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

// Функция подачи заявки на повышение роли
async function RoleUp(offers) {

  if (offers.length === 0) {
    await myContract.methods.NewStatus().send({
      from: whoTransact.value,
      gas: 30000000,
    });
    UpdateData()
    alert("Вы успешно подали заявку на повышение роли")
  }

  for (let i = 0; i < offers.length; i++) {
    if (whoTransact.value === offers[i].promoted) {
      alert("Вы уже подали заявку на повышение")
      break
    }
    else {
      await myContract.methods.NewStatus().send({
        from: whoTransact.value,
        gas: 30000000,
      });
      UpdateData()
      alert("Вы успешно подали заявку на повышение роли")
    }
  }
}

document.getElementById("RoleUp").addEventListener("click", async () => { await RoleUp(offers) });

// Функция открытия окна голосования за повышение
async function Offers(offers) {
  RemoveItem()
  tableOffers.style.display = "block"
  const tableoffers = document.getElementById("tableOffers")

  for (let i = 0; i < offers.length; i++) {
    if (offers[i].statusUp == false &&
      offers[i].statusCansel == false) {

      let body = document.createElement("tbody");
      let tdName = document.createElement("td");
      let tdButtonComl = document.createElement("td");
      let tdButtonCans = document.createElement("td");

      let Button = document.createElement("button");
      Button.classList.add("buttonAccept");
      Button.id = `acept_${offers[i].id_up}`; // уникальный id для кнопки подтверждения
      Button.textContent = "Подтвердить";
      Button.addEventListener("click", async () => { await acceptOffer(offers[i].id_up, offers) })
      tdButtonComl.append(Button);

      let button = document.createElement("button");
      button.classList.add("buttonCansel");
      button.id = `kansel_${offers[i].id_up}`; // уникальный id для кнопки отклонения
      button.textContent = "Отклонить";
      button.addEventListener("click", async () => { await canselOffer(offers[i].id_up, offers) })
      tdButtonCans.append(button);

      tdName.textContent = offers[i].promoted;
      body.append(tdName, tdButtonComl, tdButtonCans);
      tableoffers.append(body);

      document.querySelectorAll("#quickButton").forEach(button => {
        button.addEventListener("click", async () => {
          body.remove();
        });
      });
    }
  }
}
document.getElementById("compUp").addEventListener("click", async () => { await Offers(offers) });

// Функция голоса за повышение
async function acceptOffer(offerId, offers) {
  const golos = 0

  for (let i = 0; i < offers.length; i++) {
    if (offers[i].id_up === offerId && offers[i].statusUp === false && offers[i].statusCansel === false) {
      try {
        await myContract.methods.ConfirmStatus(parseInt(offerId), parseInt(golos)).send({
          from: whoTransact.value,
          gas: 30000000,
        });
        alert('Вы успешно проголосовали за повышение этого пользователя');
        UpdateData();
        break;
      } catch (error) {
        alert('Вы уже проголосовали');
      }
    }
  }
}

// Функция голоса против повышения
async function canselOffer(offerId, offers) {
  const golos = 1

  for (let i = 0; i < offers.length; i++) {
    if (offers[i].id_up === offerId && offers[i].statusUp === false && offers[i].statusCansel === false) {
      try {
        await myContract.methods.ConfirmStatus(parseInt(offerId), parseInt(golos)).send({
          from: whoTransact.value,
          gas: 30000000,
        });
        alert('Вы проголосовали против повышения этого пользователя');
        UpdateData();
        break;
      } catch (error) {
        alert('Вы уже проголосовали');
      }
    }
  }
}

// Выход в меню для всех кнопок выйти
document.querySelectorAll("#quickButton").forEach(button => {
  button.addEventListener("click", async () => {
    await GoToMenu(CheckRole, web3, users);
  });
});