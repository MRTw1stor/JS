import { abi } from "./abi.js"

// Адрес контракта
const contractAddress = "0xd60264891ADdfcd3116049b94A74A6D2B419C29F";
let myContract, web3, accounts, currentAccount;

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
    transfer.style.display = "block"
    user.style.display = "none"
    newtransfer.style.display = "none"
    compTrans.style.display = "none"
    canselTransfer.style.display = "none";
    comitTransfers.style.display = "none"
    sentTransfers.style.display = "none"
    roleUp.style.display = "none"
    comliteUp.style.display = "none"
    newUsers.style.display = "none";

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
        }
})
}

async function transferMoney() {
}

async function getAllTransfers() {
    const allTransfers = []

    allTransfers[allTransfers.length] = await myContract.methods.Check_Transfers().call({
        from: web3.eth.accounts[0],
        gas: 10000000
    })
    return allTransfers
}

async function getInboxTransaction(allTransfers){
    removeItem()
    tableInboxTransfers.style.display = "block";

    for(let i = 0; i < allTransfers[0].length ; i++){
        if(whoTransact.value == allTransfers[0][i].to && 
            allTransfers[0][i].status_execution == false && 
            allTransfers[0][i].status_reception == true){
                let body = document.createElement("tbody")
                let tdName = document.createElement("td")
                let tdMoney = document.createElement("td")

                tdName.textContent = allTransfers[0][i].who
                tdMoney.textContent = allTransfers[0][i].money/10 ** 18 + " " + "Eth";
                body.append(tdName,tdMoney)
                tableInboxTransfers.append(body)

        }
    }
}

async function getSentTransaction(allTransfers) {
    removeItem()
    tableSentTransfers.style.display = "block";

    for(let i = 0; i < allTransfers[0].length ; i++){
        if (whoTransact.value == allTransfers[0][i].who &&
          allTransfers[0][i].status_execution == false &&
          allTransfers[0][i].status_reception == true){
            let body = document.createElement("tbody");
            let tdName = document.createElement("td");
            let tdMoney = document.createElement("td");

            tdName.textContent = allTransfers[0][i].to;
            tdMoney.textContent = allTransfers[0][i].money / 10 ** 18 + " " + "Eth";
            body.append(tdName, tdMoney);
            tableInboxTransfers.append(body);
        }
    }

}

document.getElementById("newTrans").addEventListener("click", Transfer);
document.getElementById('quickButton').addEventListener('click', goToMenu)
document.getElementById("quick").addEventListener("click", goToMenu);
document.getElementById("quickBtn").addEventListener("click", goToMenu);
document.getElementById("gotransfer").addEventListener("click", transferMoney);
// document.getElementById("comitTrans").addEventListener("click", getInboxTransaction);
// document.getElementById("sentTrans").addEventListener("click", getSentTransaction);