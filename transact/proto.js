// Импортируем api контракта
import { abi } from "./abi.js"

// Адрес контракта
const contractAddress = "0xf9ED6358e933048aE7dE15f2594B2468C296899E";
let myContract, web3, accounts, currentAccount;

// Создаем все кнопки сдесь потому что это тупо сократит код
let user = document.querySelector(".user")
let transfer = document.querySelector(".transfer")
transfer.style.display = "none"
let newtransfer = document.querySelector(".newtransfer")
let compTrans = document.querySelector(".compTrans")
let canselTransfer = document.querySelector(".canselTrans");
let comitTransfers = document.querySelector(".comitTransfers")
let sentTransfers = document.querySelector(".sentTransfers")
let newUsers = document.querySelector(".newUsers")
let roleUp = document.querySelector(".roleUp")
let comliteUp = document.querySelector(".comliteUp")
let tableInboxTransfers = document.querySelector(".tableInboxTransfers");
tableInboxTransfers.style.display = "none"
let tableSentTransfers = document.querySelector(".tableSentTransfers");
tableSentTransfers.style.display = "none";
let whoTransact = document.getElementById("who");
let whomTransact = document.getElementById("whom");

// Функция отрисовки пользователей
async function getAccaunts(){
    web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));
    accounts = await web3.eth.getAccounts();
    currentAccount = accounts[0];
    let acaunts = accounts

    // Создаем всех пользователей в виде выпадающих списков
    for (let i = 0; i < acaunts.length; i++) {
        let address = document.createElement("option");
        address.text = acaunts[i];
        whoTransact.add(address)
    }
    
    checkRole()

    // Показываем и обновляем баланс пользователям
    document.querySelector('.balance').textContent = 'Баланс кошелька:' + ' ' + await web3.eth.getBalance(whoTransact.value)/10**18 + ' ' + 'Eth'
    whoTransact.addEventListener("change", async () => {
        document.querySelector('.balance').textContent = 'Баланс кошелька:' + ' ' + await web3.eth.getBalance(whoTransact.value)/10**18 + ' ' + 'Eth'
        currentAccount = whoTransact.value})
    whoTransact.addEventListener("change", async () => {checkRole()})
}
getAccaunts()

myContract = new web3.eth.Contract(abi, contractAddress)

async function checkRole() {
    let users = await myContract.methods.Check_Users().call()

    // В зависимости от роли пользователя отрисовываем его функционал
    for (let i = 0; i < users.length; i++) {
        if (whoTransact.value == users[i].login_user) {
            if (users[i].status_user == true) {
                document.querySelector(".role").textContent = "Администратор"
                newUsers.style.display = "block"
                roleUp.style.display = "none"
                comliteUp.style.display = "block"
            }
            else if (users[i].status_user == false) {
                document.querySelector(".role").textContent = "Пользователь"
                newUsers.style.display = "none"
                roleUp.style.display = "block"
                comliteUp.style.display = "none"
            }
        }
    }
}

// Функция выхода в меню
async function goToMenu(){
    transfer.style.display = "none"
    user.style.display = "block"
    newtransfer.style.display = "block"
    compTrans.style.display = "block"
    canselTransfer.style.display = "block";
    comitTransfers.style.display = "block"
    sentTransfers.style.display = "block"
    tableSentTransfers.style.display = "none";
    tableInboxTransfers.style.display = "none";
    checkRole()
}

// функция удвлкеия всего лишнего
async function removeItem(){
    transfer.style.display = "none"
    user.style.display = "none"
    newtransfer.style.display = "none"
    compTrans.style.display = "none"
    canselTransfer.style.display = "none";
    comitTransfers.style.display = "none"
    sentTransfers.style.display = "none"
    roleUp.style.display = "none"
    comliteUp.style.display = "none"
    newUsers.style.display = "none";
}

async function Transfer(){
    removeItem();
    transfer.style.display = "block"

    accounts = await web3.eth.getAccounts();
    currentAccount = accounts[0];
    let acaunts = accounts

    for (let i = 0; i < acaunts.length; i++) {
        let address = document.createElement("option");
        address.text = acaunts[i];
        whomTransact.add(address);
    }

    // Берем данные перевода и проверяем их на валидность
    document.querySelector('.Balance').textContent = 'Баланс кошелька:' + ' ' + await web3.eth.getBalance(whoTransact.value)/10**18 + ' ' + 'Eth'
    document.getElementById('gotransfer').addEventListener('click', async () => {
        let accauntTo = document.getElementById('whom')
        let selectedAccaunt = accauntTo.options[accauntTo.selectedIndex]
        let valueToTransfer = document.querySelector('.value')
        let code = document.querySelector('.code') 

        // Если пользователь что то неправильно ввел выводим ему ошибку с указанием
        if (valueToTransfer.value <= 0 || valueToTransfer.value > await web3.eth.getBalance(whoTransact.value)/10**18) {
            alert("Неккоректное число")
        } else if (code.value.trim() === '') {
            alert("Введите кодовое слово")
        } else if (selectedAccaunt.value == currentAccount) {
            alert("Вы не можете переводить деньги самому себе")
        } else if (valueToTransfer.value.slice(-1) == "." || valueToTransfer.value.includes('..')) {
            alert('Неправильная расстановка точек в сумме для перевода.')
        } else {
            valueToTransfer.value = ''
            code.value = ''
            document.getElementById("gotransfer").addEventListener("click", transferMoney)
        }
})
}

// Функция перевода денег другому человеку
async function transferMoney() {
    const selectedAccount = document.getElementById("whom").value;
    const valueToTransfer = document.querySelector(".value").value;
    const code = document.querySelector(".code").value;
  
    // Получаем список аккаунтов
    const accounts = await web3.eth.getAccounts();
    const fromAddress = accounts[0];
  
    // Вызываем функцию Transfeeer из смарт-контракта
    await myContract.methods
      .Transfeeer(selectedAccount, valueToTransfer, web3.utils.fromAscii(code))
      .send({
        from: fromAddress,
        gas: 1000000000000,
        value: valueToTransfer * 10 ** 18
      });
}

// Функция получения всех переводов контракта
async function getAllTransfers() {
    const allTransfers = []

    allTransfers[allTransfers.length] = await myContract.methods.Check_Transfers().call({
        from: web3.eth.accounts[0],
        gas: 10000000
    })
    console.log(allTransfers);
    return allTransfers
}

// функция которая показывает входящие пользователю переводы
async function InboxTransaction(array) {
    removeItem()
    tableInboxTransfers.style.display = "block";
    const tableInbox = document.getElementById("tableInbox");

    for(let i = 0; i < array[0].length ; i++){
        console.log(array[0].length);
        if(whoTransact.value == array[0][i].to && 
            array[0][i].status_execution == false && 
            array[0][i].status_reception == true){
                let body = document.createElement("tbody")
                let tdName = document.createElement("td")
                let tdMoney = document.createElement("td")

                tdName.textContent = array[0][i].who
                tdMoney.textContent = array[0][i].money/10 ** 18 + " " + "Eth";
                body.append(tdName,tdMoney)
                tableInbox.append(body)
        }
    }
}

// функция которая показывает отправленые пользователем переводы
async function SentTransaction(array) {
    removeItem()
    tableSentTransfers.style.display = "block";
    const tableSent = document.getElementById("tableSent");

    for(let i = 0; i < array[0].length ; i++){
        console.log(array[0].length);
        if (whoTransact.value == array[0][i].who &&
            array[0][i].status_execution == false &&
            array[0][i].status_reception == true){
            let body = document.createElement("tbody");
            let tdName = document.createElement("td");
            let tdMoney = document.createElement("td");

            tdName.textContent = array[0][i].to;
            tdMoney.textContent = array[0][i].money / 10 ** 18 + " " + "Eth";
            body.append(tdName, tdMoney);
            tableSent.append(body);
        }
    }

}

async function getInboxTransaction(){
    InboxTransaction(await getAllTransfers())
}
async function getSentTransaction(){
    SentTransaction(await getAllTransfers())
}

document.getElementById("newTrans").addEventListener("click", Transfer);
document.getElementById('quickButton').addEventListener('click', goToMenu)
document.getElementById("quick").addEventListener("click", goToMenu);
document.getElementById("quickBtn").addEventListener("click", goToMenu);
document.getElementById("gotransfer").addEventListener("click", transferMoney);
document.getElementById("comitTrans").addEventListener("click", getInboxTransaction);
document.getElementById("sentTrans").addEventListener("click", getSentTransaction);