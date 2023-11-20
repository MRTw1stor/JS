// Импортируем abi контракта
import { abi } from "./abi.js";

// Имортируем другие функции
import CheckRole from "./functions/CheckRole.js";
import GoToLogin from "./functions/GoToLogin.js";
import HideItems from "./functions/HideItems.js";
import RoleItems from "./functions/RoleItems.js";
import CreateNewPassword from "./functions/CreateNewPassword.js";
import SignInProfile from "./functions/SignInProfile.js";
import GoToProfileReview from "./functions/GoToProfileReview.js";
import GoToProfileComment from "./functions/GoToProfileComment.js";
import GoToProfileNewShop from "./functions/GoToProfileNewShop.js";

// Адрес контракта и порт
const contractAddress = '0xC6a866dbCA555399C56afE49a6773D0a35Aa887c';
const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));
const myContract = new web3.eth.Contract(abi, contractAddress);

// Переменные для использования
const login = document.getElementById("Login");
let whoTransact = document.getElementById("who");

const createPassword = document.getElementById("CreatePassword");
const password = document.getElementById("createPasword")
const acceptPassword = document.getElementById("acceptCreatePassword")

const profile = document.getElementById("Profile")
const profilename = document.getElementById("profiletext2")

// Переменные функции контракта
let users = await myContract.methods.checkUsers().call();
let shops = await myContract.methods.checkShops().call();
let workers = await myContract.methods.checkWorkers().call();
let requestes = await myContract.methods.checkRequest().call();
let reviews = await myContract.methods.checkReviews().call();

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

  document.getElementById("balansetext2").textContent = (await web3.eth.getBalance(whoTransact.value)) / 10 ** 18 + " " + "Eth";
}

getAccaunts();

// Функция регистрации нового пользователя
document.getElementById("registration").addEventListener("click", async () => {
  async function Registration() {
    let fromAddress = whoTransact.value

    for (let i = 0; i < shops.length; i++) {
      if (whoTransact.value == shops[i].shop) {
        alert("Влыделец магазина не может стать покупателем")
        return;
      }
    }

    for (let i = 0; i < users.length; i++) {
      if (whoTransact.value == users[i].user) {
        alert("Вы уже зарегистрированы в системе")
      }
      else {
        await myContract.methods.NewUsers().send({
          from: fromAddress
        })
        alert("Вы успешно зарегистрированы в системе")
        return;
      }
    }
  }
  Registration()
})

// Функция перехода к окну регистрации пароля
document.getElementById("newPasword").addEventListener("click", async () => {
  async function goCreatePassword() {
    createPassword.style.display = "block"
    login.style.display = "none"
  }
  goCreatePassword()
})

// Функция регистрации пароля
document.getElementById("createNewPassword").addEventListener("click", async () => { await CreateNewPassword() })

// Функция перехода к окну входа
document.getElementById("gologin").addEventListener("click", async () => {
  async function GoLogin() {
    createPassword.style.display = "none"
    login.style.display = "block"
    password.value = ""
    acceptPassword.value = ""
  }
  GoLogin()
})

// Функция входа в аккаунт
document.getElementById("login").addEventListener("click", async () => { await SignInProfile(SpavnProfile) })

// Функция выхода из аккаунта
document.getElementById("gotologinbutton").addEventListener("click", GoToLogin);

// Функция создания профиля входящего человека
async function SpavnProfile() {
  profile.style.display = "block"
  profilename.textContent = `${whoTransact.value}`
  CheckRole(users, shops, workers)
  RoleItems(users, shops)
  console.log(users);
  console.log(shops);
  console.log(workers)
  console.log(reviews);
}

// Функция повышения покупателя до роли продавца
document.getElementById("improvebutton").addEventListener("click", async () => {
  async function UpBuyerToSeller() {
    const whoup = document.getElementById("whoimprove").value;
    const fromAddress = whoTransact.value;
    let foundWorker = 0;
    let isBuyer = 0;

    for (let i = 0; i < workers.length; i++) {
      if (whoup === workers[i].worker) {
        foundWorker++;
        break;
      }
    }

    if (foundWorker === 0) {
      alert("Этот человек еще не устроился на работу");
      return;
    }

    for (let i = 0; i < users.length; i++) {
      if (whoup === users[i].user && users[i].status_seller === false) {
        isBuyer++;
      }
    }

    if (isBuyer === 0) {
      alert("Этот человек уже продавец");
    } else {
      await myContract.methods.UpBuyer(whoup).send({
        from: fromAddress,
        gas: 3000000
      });
      alert("Вы повысили этого человека");
    }
  }
  UpBuyerToSeller()
})

// Функция устройства на работу в магазин
document.getElementById("workshopbutton").addEventListener("click", async () => {
  async function GoToWorkShop() {
    const fromAddress = whoTransact.value;
    const workshopinput = document.getElementById("workshopinput")

    for (let i = 0; i < workers.length; i++) {
      if (fromAddress === workers[i].worker) {
        alert("Вы уже работаете в магазине");
        return;
      }
    }

    let shopFound = 0;
    console.log(shops.length);
    for (let i = 0; i < shops.length; i++) {
      console.log(workshopinput.value);
      console.log(shops[i].id_shop);
      if (workshopinput.value === shops[i].id_shop) {
        console.log(999);
        shopFound++
        console.log(workshopinput.value, fromAddress);
        await myContract.methods.GoSettledToShop(workshopinput.value).send({
          from: fromAddress,
          gas: 3000000
        });
        alert("Поздравляем! Теперь вы работаете в магазине");
      }
    }

    if (shopFound == 0) {
      alert("Такого магазина не существует");
      return
    }
  }
  GoToWorkShop()
});

// Функция понижения продавца до роли покупатель
document.getElementById("lowerbutton").addEventListener("click", async () => {
  async function DownSellerToBuyer() {
    const whodown = document.getElementById("wholover").value;
    const fromAddress = whoTransact.value;
    let isSeller = 0;

    for (let i = 0; i < users.length; i++) {
      if (whodown === users[i].user && users[i].status_seller === true) {
        isSeller++;
      }
    }

    if (isSeller !== 0) {
      await myContract.methods.DownSeller(whodown).send({
        from: fromAddress,
        gas: 3000000
      });
      alert("Вы понизили этого человека");
    }
  }
  DownSellerToBuyer()
})

// Функция рассмотрения заявок


// Функция подачи заявки на понижение до покупателя
document.getElementById("createrequestbutton").addEventListener("click", async () => {
  async function CreateRequestToBuyer() {
    let fromAddress = whoTransact.value;

    if (requestes.length === 0) {
      await myContract.methods.RequestDownSeller().send({ from: fromAddress, gas: 3000000 });
      alert("Вы успешно подали заявку на понижение");
    }
    else {
      for (let i = 0; i < requestes.length; i++) {
        if (fromAddress != requestes[i].down_worker) {
          await myContract.methods.RequestDownSeller().send({ from: fromAddress, gas: 3000000 });
          alert("Вы успешно подали заявку на понижение");
        }
      }
    }
  }
  CreateRequestToBuyer()
});

// Функция создания нового администратора
document.getElementById("newadminiatratorsbutton").addEventListener("click", async () => {
  async function CreateNerAdmin() {
    const newadmin = document.getElementById("newadminiatratorinput").value;
    const fromAddress = whoTransact.value;
    let isUser = 0;

    for (let i = 0; i < users.length; i++) {
      if (newadmin !== users[i].user) {
        isUser++;
      }
    }

    if (isUser === 0) {
      alert("Этот адрес уже кем-то используеться");
    }
    else {
      await myContract.methods.NewAdministrators(newadmin).send({
        from: fromAddress,
        gas: 3000000
      });
      alert("Вы успешно создали нового администратора");
    }
  }
  CreateNerAdmin()
})

// посмотреть магазины

// Функция открытия окна создания нового магазина
document.getElementById("newshopbutton").addEventListener("click", async () => {
  async function GoToCreateNewShop() {
    const createnewshops = document.getElementById("NewShops")
    createnewshops.style.display = "block"
    profile.style.display = "none"
  }
  GoToCreateNewShop()
})

// Функция создания нового магазина
document.getElementById("createnewshopbutton").addEventListener("click", async () => {
  async function NewShop() {
    const newshopsaddress = document.getElementById("newshopsaddress")
    const newshopscity = document.getElementById("newshopscity")
    const fromAddress = whoTransact.value;

    if (newshopscity.value.trim() === "") {
      alert("Поле город не может быть пустым");
      return
    } else {
      await myContract.methods.NewShop(newshopsaddress.value, newshopscity.value).send({
        from: fromAddress,
        gas: 3000000
      });
      alert("Вы успешно удалили магазин");
    }
  }
  NewShop()
})

// Функция выхода в профиль из окна создания нового магазина
document.getElementById("goprofilenewshops").addEventListener("click", async () => { await GoToProfileNewShop() })

// Функция удаления магазина
document.getElementById("deleteshopbutton").addEventListener("click", async () => {
  async function DeleteShop() {
    const idshop = document.getElementById("deleteshopinput").value;
    const fromAddress = whoTransact.value;
    let isShop = 0;

    for (let i = 0; i < shops.length; i++) {
      if (idshop === shops[i].id_shop) {
        isShop++;
      }
    }

    if (isShop === 0) {
      alert("Такого магазина не существует");
    }
    else {
      await myContract.methods.DeleteShop(idshop).send({
        from: fromAddress,
        gas: 3000000
      });
      alert("Вы успешно удалили магазин");
    }
  }
  DeleteShop()
})

// Посмотреть все отзывы

// Функция открытия окна создания нового отзыва 
document.getElementById("createreviewbutton").addEventListener("click", async () => {
  async function GoToCreateReviews() {
    const createreviews = document.getElementById("CreateReviews")
    createreviews.style.display = "block"
    profile.style.display = "none"
  }
  GoToCreateReviews()
})

// Функция создания нового отзыва 
document.getElementById("createnewreviewbutton").addEventListener("click", async () => {
  async function CreateNewReviews() {
    const reviewinput = document.getElementById("reviewinput")
    const reviewshopinput = document.getElementById("reviewshopinput")
    const reviewstarsinput = document.getElementById("reviewstarsinput")
    const fromAddress = whoTransact.value;
    let isShop = 0;

    if (reviewinput.value.trim() === "") {
      alert("Вы не написали отзыв")
      return;
    }
    if (reviewstarsinput.value < 0 || reviewstarsinput.value > 10) {
      alert("Нельзя поставить отрицательное количество или количество звезд больше 10")
      return;
    }
    if (reviewstarsinput.value.trim() === "") {
      alert("Вы не указали количество звезд")
      return;
    }
    for (let i = 0; i < shops.length; i++) {
      if (reviewshopinput.value === shops[i].id_shop) {
        isShop++;
        await myContract.methods.NewReview(reviewshopinput.value, reviewinput.value, reviewstarsinput.value).send({
          from: fromAddress,
          gas: 3000000
        })
        alert("Вы успешно создали отзыв")
      }
    }
    if (isShop == 0) {
      alert("Такого магазина не существует")
    }
  }
  CreateNewReviews()
})

// Функция выхода в профиль из окна отзывов
document.getElementById("goprofilereview").addEventListener("click", async () => { await GoToProfileReview() })

// Функция открытия окна создания оценки отзыву
document.getElementById("leavecommentbutton").addEventListener("click", async () => {
  async function GoToCreateComment() {
    const createcomment = document.getElementById("CreateComment")
    createcomment.style.display = "block"
    profile.style.display = "none"
  }
  GoToCreateComment()
})

// Функция создания оценки отзыву
document.getElementById("createnewcomentbutton").addEventListener("click", async () => {
  async function CreateNewComment() {
    const commentreviewinput = document.getElementById("commentreviewinput")
    const commentmarksinput = document.getElementById("commentmarksinput")
    const fromAddress = whoTransact.value;
    let isReview = 0;

    if (commentmarksinput.value.trim() === "") {
      alert("Вы не выбрали оценку")
      return;
    }
    if (reviewstarsinput.value < 0 || reviewstarsinput.value > 1) {
      alert("Неправильная оценка")
      return;
    }

    for (let i = 0; i < reviews.length; i++) {
      if (commentreviewinput.value === reviews[i].id_review) {
        isReview++;
        await myContract.methods.RatingReview(commentreviewinput.value, commentmarksinput.value).send({
          from: fromAddress,
          gas: 3000000
        })
        alert("Вы успешно добавили оценку")
      }
    }
    if (isReview == 0) {
      alert("Такого отзыва не существует")
    }
  }
  CreateNewComment()
})

// Функция выхода в профиль из окна оценок к отзыву
document.getElementById("goprofilecoment").addEventListener("click", async () => { await GoToProfileComment() })