// Импортируем api контракта
import { abi } from "./abi.js";

// Адрес контракта
const contractAddress = "0xAD510C78ce1F85fa6f889C892D40Fb63131B1B0D";
let myContract, web3, accounts, currentAccount;

// Создаем все кнопки сдесь потому что это тупо сократит код
let user = document.querySelector(".user");
let transfer = document.querySelector(".transfer");
transfer.style.display = "none";
let newtransfer = document.querySelector(".newtransfer");
let compTrans = document.querySelector(".compTrans");
let transferComplite = document.querySelector(".transferComplite");
transferComplite.style.display = "none";
let canselTransfer = document.querySelector(".canselTrans");
let tableCanselTransfers = document.querySelector(".transferCansel");
tableCanselTransfers.style.display = "none";
let comitTransfers = document.querySelector(".comitTransfers");
let tableInboxTransfers = document.querySelector(".tableInboxTransfers");
tableInboxTransfers.style.display = "none";
let sentTransfers = document.querySelector(".sentTransfers");
let tableSentTransfers = document.querySelector(".tableSentTransfers");
tableSentTransfers.style.display = "none";
let newUsers = document.querySelector(".newUsers");
let roleUp = document.querySelector(".roleUp");
let comliteUp = document.querySelector(".comliteUp");
let whoTransact = document.getElementById("who");
let whomTransact = document.getElementById("whom");
let valueToTransfer = document.querySelector(".value");
let code = document.querySelector(".code");

// Функция отрисовки пользователей
async function getAccaunts() {
  web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));
  accounts = await web3.eth.getAccounts();
  currentAccount = whoTransact.value;
  let acaunts = accounts;

  // Создаем всех пользователей в виде выпадающих списков
  for (let i = 0; i < acaunts.length; i++) {
    let address = document.createElement("option");
    address.text = acaunts[i];
    whoTransact.add(address);
  }
  checkRole();

  // Показываем и обновляем баланс пользователям
  document.querySelector(".balance").textContent = "Баланс кошелька:" + " " + (await web3.eth.getBalance(whoTransact.value)) / 10 ** 18 + " " + "Eth";
  whoTransact.addEventListener("change", async () => {
    document.querySelector(".balance").textContent = "Баланс кошелька:" + " " + (await web3.eth.getBalance(whoTransact.value)) / 10 ** 18 + " " + "Eth";
  });
  whoTransact.addEventListener("change", async () => {
    checkRole();
  });
}

getAccaunts();

myContract = new web3.eth.Contract(abi, contractAddress);

async function checkRole() {
  let users = await myContract.methods.Check_Users().call();

  // В зависимости от роли пользователя отрисовываем его функционал
  for (let i = 0; i < users.length; i++) {
    if (whoTransact.value == users[i].login_user) {
      if (users[i].status_user == true) {
        document.querySelector(".role").textContent = "Администратор";
        newUsers.style.display = "block";
        roleUp.style.display = "none";
        comliteUp.style.display = "block";
      } else if (users[i].status_user == false) {
        document.querySelector(".role").textContent = "Пользователь";
        newUsers.style.display = "none";
        comliteUp.style.display = "none";
        roleUp.style.display = "block";
      }
    }
  }
}

// Функция получения всех переводов контракта
async function getAllTransfers() {
  const allTransfers = await myContract.methods.Check_Transfers().call({
    from: web3.eth.whoTransact,
    gas: 10000000,
  });
  return allTransfers;
}

// Функция введения данных в перевод
async function dateToTransfer() {
  removeItem();
  transfer.style.display = "block";

  accounts = await web3.eth.getAccounts();
  let acaunts = accounts;

  for (let i = 0; i < acaunts.length; i++) {
    let address = document.createElement("option");
    address.text = acaunts[i];
    whomTransact.add(address);
  }

  // Берем данные перевода и проверяем их на валидность
  document.querySelector(".Balance").textContent = "Баланс кошелька:" + " " + (await web3.eth.getBalance(whoTransact.value)) / 10 ** 18 + " " + "Eth";
  document.getElementById("gotransfer").addEventListener("click", async () => {

    // Если пользователь что то неправильно ввел выводим ему ошибку с указанием
    if (valueToTransfer.value <= 0 ||valueToTransfer.value > (await web3.eth.getBalance(whoTransact.value))) {
      alert("Неккоректное число")}
    if (code.value.trim() === "") {
      alert("Введите кодовое слово")}
    if (whoTransact.value == whomTransact.value) {
      alert("Вы не можете переводить деньги самому себе")}
    if (valueToTransfer.value.slice(-1) == "." || valueToTransfer.value.includes("..")) {
      alert("Неправильная расстановка точек в сумме для перевода.")} 
    else {
      valueToTransfer.value = "";
      code.value = "";
      document.getElementById("gotransfer").addEventListener("click", transferMoney);
    }
  });
}

document.getElementById("newTrans").addEventListener("click", dateToTransfer);

// Функция перевода денег другому человеку
async function transferMoney() {
  const fromAddress = whoTransact.value;
  const selectedAccount = whomTransact.value;
  const valueToTransfers = valueToTransfer.value;
  const convertMoney = web3.utils.toWei(valueToTransfers, "ether");
  const codes = code.value;

  // Вызываем функцию Transfeeer из смарт-контракта
  await myContract.methods
    .Transfeeer(selectedAccount, convertMoney, web3.utils.fromAscii(codes))
    .send({
      from: fromAddress,
      value: parseInt(convertMoney),
      gas: 1000000,
    });
  document.querySelector(".Balance").textContent = "Баланс кошелька:" + " " + (await web3.eth.getBalance(whoTransact.value)) / 10 ** 18 + " " + "Eth";
}

// Функция подтверждения перевода
document.getElementById("compliteTransfer").addEventListener("click", async () => {
  async function compliteTransfer(array) {
    removeItem();
    transferComplite.style.display = "block";
    const tableComplite = document.getElementById("tableComplite");
  
    for(let i = 0; i < array.length; i++) {
      if (array[i].status_execution === false) {
        continue;
      }
      if (whoTransact.value == array[i].to) {
        let body = document.createElement("tbody");
        let tdName = document.createElement("td");
        let tdMoney = document.createElement("td");
        let tdPasword = document.createElement("td");
        const input = document.createElement("input");
        input.classList.add("input_list");
        input.id = `${array[i].id_transfer}`;
        input.type = "password";
        tdPasword.append(input);
        let tdButtonComl = document.createElement("td");
        const Button = document.createElement("button");
        Button.classList.add("buttonAccept");
        Button.id = `${array[i].id_transfer}`;
        Button.textContent = "Подтвердить";
        tdButtonComl.append(Button);
        let tdButtonCans = document.createElement("td");
        const button = document.createElement("button");
        button.classList.add("buttonCansel");
        button.id = `${array[i].id_transfer}` + `${array[i].id_transfer}`;
        button.textContent = "Отменить";
        tdButtonCans.append(button);
        tdName.textContent = array[i].who;
        tdMoney.textContent = array[i].money / 100 ** 18 + " " + "Eth";
        body.append(tdName, tdMoney, tdPasword, tdButtonComl, tdButtonCans);
        tableComplite.append(body);
        document.getElementById("quicBtn").addEventListener("click", () => {
          body.remove();
        });
        compliteMoneyTransfer();
        canselMoneyTransfer()
      }
    }
  }
  compliteTransfer(await getAllTransfers());
});

// функция которая передает деньги другому человеку
async function compliteMoneyTransfer() {
  const accept = document.querySelectorAll(".buttonAccept");

  for (const btn of accept) {
    btn.addEventListener("click", async () => {
      const codeValue = document.querySelector(".input_list").value;
      const transferId = document.querySelectorAll(".input_list");
      transferId.forEach(async (item) => {
        await myContract.methods.CompliteTransfer(item.id, web3.utils.fromAscii(codeValue))
          .send({
            from: whoTransact.value,
          });
      });
    });
  }
}

// Функция которая отменяет перевод принимающим человеком
async function canselMoneyTransfer(){
  const cansel = document.querySelectorAll(".buttonCansel")

  for(const btn of cansel){
    btn.addEventListener("click", async () => {
      const transferId = document.querySelectorAll(".input_list")
      transferId.forEach(async (item) => {
        await myContract.methods.CanselTransfer(item.id).send({
          from: whoTransact.value,
        })
      })
    })
  }
}

document.getElementById("canselTransfer").addEventListener("click", async () => {
  async function CanselTransfer(array){
    removeItem()
    tableCanselTransfers.style.display = "block";
    const tableCansel = document.getElementById("tableCansel")

    for(let i = 0; i < array.length; i++){
      if(whoTransact.value == array[i].who && 
        array[i].status_execution == true && 
        array[i].status_reception == false){
          let body = document.createElement("tbody");
          let tdName = document.createElement("td");
          let tdMoney = document.createElement("td");
          let tdButton = document.createElement("td");
          const Button = document.createElement("button");
          Button.classList.add("buttonRevert");
          Button.id = `${array[i].id_transfer}`;
          Button.textContent = "Отменить";
          tdButton.append(Button);
    
          tdName.textContent = array[i].to;
          tdMoney.textContent = array[i].money / 100 ** 18 + " " + "Eth";
          body.append(tdName, tdMoney, tdButton);
          tableCansel.append(body);
          document.getElementById("quicBtnn").addEventListener("click", () => {
            body.remove();
          });
          canselMoney()
        }
    }
  }
  CanselTransfer(await getAllTransfers())
})

async function canselMoney(){
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
document.getElementById("comitTrans").addEventListener("click", async () => {
  async function InboxTransaction(array) {
    removeItem();
    tableInboxTransfers.style.display = "block";
    const tableInbox = document.getElementById("tableInbox");
  
    for (let i = 0; i < array.length; i++) {
      if (whoTransact.value == array[i].to && 
        array[i].status_execution == false && 
        array[i].status_reception == true) {
        let body = document.createElement("tbody");
        let tdName = document.createElement("td");
        let tdMoney = document.createElement("td");
  
        tdName.textContent = array[i].who;
        tdMoney.textContent = array[i].money / 100 ** 18 + " " + "Eth";
        body.append(tdName, tdMoney);
        tableInbox.append(body);
        document.getElementById("quickBtn").addEventListener("click", () => {
          body.remove();
        });
      }
    }
  }
  InboxTransaction(await getAllTransfers());
});

// функция которая показывает отправленые пользователем переводы
document.getElementById("sentTrans").addEventListener("click", async () => {
  async function SentTransaction(array) {
    removeItem();
    tableSentTransfers.style.display = "block";
    const tableSent = document.getElementById("tableSent");
  
    for (let i = 0; i < array.length; i++) {
      if (whoTransact.value == array[i].who && 
        array[i].status_execution == false && 
        array[i].status_reception == true) {
        let body = document.createElement("tbody");
        let tdName = document.createElement("td");
        let tdMoney = document.createElement("td");
  
        tdName.textContent = array[i].to;
        tdMoney.textContent = array[i].money / 100 ** 18 + " " + "Eth";
        body.append(tdName, tdMoney);
        tableSent.append(body);
        document.getElementById("quick").addEventListener("click", () => {
          body.remove();
        });
      }
    }
  }
  SentTransaction(await getAllTransfers());
});

// функция удаления всего лишнего
async function removeItem() {
  user.style.display = "none";
  transfer.style.display = "none";
  newtransfer.style.display = "none";
  compTrans.style.display = "none";
  canselTransfer.style.display = "none";
  comitTransfers.style.display = "none";
  sentTransfers.style.display = "none";
  roleUp.style.display = "none";
  comliteUp.style.display = "none";
  newUsers.style.display = "none";
}

// Функция выхода в меню
async function goToMenu() {
  transfer.style.display = "none";
  user.style.display = "block";
  newtransfer.style.display = "block";
  compTrans.style.display = "block";
  transferComplite.style.display = "none";
  canselTransfer.style.display = "block";
  tableCanselTransfers.style.display = "none";
  comitTransfers.style.display = "block";
  tableSentTransfers.style.display = "none";
  sentTransfers.style.display = "block";
  tableInboxTransfers.style.display = "none";
  checkRole()
  valueToTransfer.value = "";
  code.value = "";
  document.querySelector(".balance").textContent = "Баланс кошелька:" + " " + (await web3.eth.getBalance(whoTransact.value)) / 10 ** 18 + " " + "Eth";
}

document.getElementById("quickButton").addEventListener("click", goToMenu);
document.getElementById("quick").addEventListener("click", goToMenu);
document.getElementById("quickBtn").addEventListener("click", goToMenu);
document.getElementById("quicBtn").addEventListener("click", goToMenu);
document.getElementById("quicBtnn").addEventListener("click", goToMenu);