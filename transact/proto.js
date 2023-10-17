import { abi } from "./abi.js"

// Адрес контракта
const contractAddress = "0xc1c1c855864DB69Bc8e50537FBB073CDCFC2F23D";
let myContract, web3, accounts, currentAccount;

let transfer = document.querySelector(".")

// Функция отрисовки пользователей 
async function getAccaunts(){
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
  accounts = await web3.eth.getAccounts();
  currentAccount = accounts[0];

  let whoTransact = document.getElementById("who");
  let whomTransact = document.getElementById('whom')
  let acaunts = accounts

  // Создаем всех пользователей в виде выпадающих списков
  for (let i = 0; i < acaunts.length; i++) {
    let address = document.createElement("option");
    address.text = acaunts[i];
    whomTransact.add(address)
  }

  for (let i = 0; i < acaunts.length; i++) {
      let address = document.createElement("option");
      address.text = acaunts[i];
      whoTransact.add(address);
  }

  // Показываем и обновляем баланс пользователям
  document.querySelector('.balance').textContent = 'Баланс кошелька:' + ' ' + await web3.eth.getBalance(whoTransact.value)/10**18 + ' ' + 'Eth'
  whoTransact.addEventListener("change", async () => {
    document.querySelector('.balance').textContent = 'Баланс кошелька:' + ' ' + await web3.eth.getBalance(whoTransact.value)/10**18 + ' ' + 'Eth'
    currentAccount = whoTransact.value})
}
getAccaunts()

async function Transfer(){

    accounts = await web3.eth.getAccounts();
    currentAccount = accounts[0];

    let whomTransact = document.getElementById('whom')
    let acaunts = accounts

    for (let i = 0; i < acaunts.length; i++) {
        let address = document.createElement("option");
        address.text = acaunts[i];
        whomTransact.add(address);
    }

    // Берем данные перевода и проверяем их на валидность
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

myContract = web3.eth.Contract(abi, contractAddress)