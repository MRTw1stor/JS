import { abi } from "./abi.js"

// Адрес контракта
const contractAddress = "0xb37D536F3CEcED944d4587D257882B4831A967e2";
let myContract, web3, accounts, currentAccount;

let transfer = document.querySelector(".transfer")
transfer.style.display = "none"

// Функция отрисовки пользователей 
async function getAccaunts(){
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
    accounts = await web3.eth.getAccounts();
    currentAccount = accounts[0];

    let whoTransact = document.getElementById("who");
    let acaunts = accounts

    // Создаем всех пользователей в виде выпадающих списков
    for (let i = 0; i < acaunts.length; i++) {
        let address = document.createElement("option");
        address.text = acaunts[i];
        whoTransact.add(address)
    }
    let users = await myContract.methods.Check_Users().call()
    for (let i = 0; i < users.length; i++) {
        console.log(whoTransact.value);
        if(whoTransact.value == users[i].login_user){
            if(users[i].status_user == true){
                document.querySelector(".role").textContent = "Администратор"
            }
            else if(users[i].status_user == false){
                document.querySelector(".role").textContent = "Пользователь"
            }
        }
    }

    // Показываем и обновляем баланс пользователям
    document.querySelector('.balance').textContent = 'Баланс кошелька:' + ' ' + await web3.eth.getBalance(whoTransact.value)/10**18 + ' ' + 'Eth'
    whoTransact.addEventListener("change", async () => {
        document.querySelector('.balance').textContent = 'Баланс кошелька:' + ' ' + await web3.eth.getBalance(whoTransact.value)/10**18 + ' ' + 'Eth'
        currentAccount = whoTransact.value})
    whoTransact.addEventListener("change", async () => {
        let users = await myContract.methods.Check_Users().call()
    for (let i = 0; i < users.length; i++) {
        console.log(whoTransact.value);
        if(whoTransact.value == users[i].login_user){
            if(users[i].status_user == true){
                document.querySelector(".role").textContent = "Администратор"
            }
            else if(users[i].status_user == false){
                document.querySelector(".role").textContent = "Пользователь"
            }
        }
    }
    })
}
getAccaunts()

myContract = new web3.eth.Contract(abi, contractAddress)

async function goToMenu(){
    let transfer = document.querySelector(".transfer")
    transfer.style.display = "none"
    let user = document.querySelector(".user")
    user.style.display = "block"
    let newtransfer = document.querySelector(".newtransfer")
    newtransfer.style.display = "block"
    let compTrans = document.querySelector(".compTrans")
    compTrans.style.display = "block"
    let comitTransfers = document.querySelector(".comitTransfers")
    comitTransfers.style.display = "block"
    let sentTransfers = document.querySelector(".sentTransfers")
    sentTransfers.style.display = "block"
    let roleUp = document.querySelector(".roleUp")
    roleUp.style.display = "block"
    let comliteUp = document.querySelector(".comliteUp")
    comliteUp.style.display = "block"
}


async function Transfer(){
    let transfer = document.querySelector(".transfer")
    transfer.style.display = "block"
    let user = document.querySelector(".user")
    user.style.display = "none"
    let newtransfer = document.querySelector(".newtransfer")
    newtransfer.style.display = "none"
    let compTrans = document.querySelector(".compTrans")
    compTrans.style.display = "none"
    let comitTransfers = document.querySelector(".comitTransfers")
    comitTransfers.style.display = "none"
    let sentTransfers = document.querySelector(".sentTransfers")
    sentTransfers.style.display = "none"
    let roleUp = document.querySelector(".roleUp")
    roleUp.style.display = "none"
    let comliteUp = document.querySelector(".comliteUp")
    comliteUp.style.display = "none"

    accounts = await web3.eth.getAccounts();
    currentAccount = accounts[0];

    let whoTransact = document.getElementById("who");
    let whomTransact = document.getElementById('whom')
    let acaunts = accounts

    for (let i = 0; i < acaunts.length; i++) {
        let address = document.createElement("option");
        address.text = acaunts[i];
        whomTransact.add(address);
    }

    // Берем данные перевода и проверяем их на валидность
    
    document.querySelector('.Balance').textContent = 'Баланс кошелька:' + ' ' + await web3.eth.getBalance(whoTransact.value)/10**18 + ' ' + 'Eth'
    document.querySelector('.gotransfer').addEventListener('click', async () => {
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
document.querySelector('.newtransfer').addEventListener('click',Transfer)
document.getElementById('quickButton').addEventListener('click',goToMenu)
// myContract = web3.eth.Contract(abi, contractAddress)