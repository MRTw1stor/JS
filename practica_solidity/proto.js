// Импортируем abi контракта
import { abi } from "./abi.js";

// Адрес контракта и порт
const contractAddress = '0xa8335Aa6841872F88a72C631F4202C4215ca4F5D';
const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));
const myContract = new web3.eth.Contract(abi, contractAddress);
let accounts, currentAccount;

let whoTransact = document.getElementById("who");

// Функция отрисовки пользователей
async function getAccaunts() {
  accounts = await web3.eth.getAccounts();
  currentAccount = whoTransact.value;
  let acaunts = accounts;

  // Создаем всех пользователей в виде выпадающих списков
  for (let i = 0; i < acaunts.length; i++) {
    let address = document.createElement("option");
    address.text = acaunts[i];
    whoTransact.add(address);
  }
}

getAccaunts();