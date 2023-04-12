function game() {
  document.addEventListener("DOMContentLoaded", () => {
    let toastEl = document.querySelector(".toast");
    let form = document.querySelector(".settings");
    let header = document.querySelector(".header");
    let board = document.querySelector(".board");
    let playAgain = document.querySelector(".play-again");
    let cardsQuantity = 0;
    let couplesQuantity = 0;
    let timerOn = false;
    let timerValue = 60;
    let timerGo = null;
    let numsArray = [];
    let numsArrayCount = 0;
    let compareMode = false;
    let firstCard = null;
    let secondCard = null;
    let foundCouples = 0;

    function gameStart() {
      form.classList.remove("active");
      form.classList.add("hidden");
      board.classList.remove("hidden");
      board.classList.add("active");
      header.textContent = `Найдите пары карточек.`;
    }
    function shuffle(arr) {
      let j = 0;
      for (let i = arr.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
    }
    function couplesArray() {
      couplesQuantity = cardsQuantity / 2;
      for (let i = 0; i < couplesQuantity; i++) {
        numsArray.push(i);
        numsArray.push(i);
      }
    }
    function cardOpen() {
      if (this != firstCard) compare(this);
    }
    function cardsCreate() {
      numsArray = shuffle(numsArray);
      for (let i = cardsQuantity; i > 0; i--) {
        let cardWrapper = document.createElement("div");
        cardWrapper.classList.add("card-wrapper");
        let cardFront = document.createElement("div");
        cardFront.classList.add("card-front");
        cardWrapper.append(cardFront);
        let cardBack = document.createElement("div");
        cardBack.classList.add("card-back");
        cardBack.textContent = numsArray[numsArrayCount];
        cardWrapper.append(cardBack);
        cardWrapper.setAttribute("data-num", numsArray[numsArrayCount]);
        numsArrayCount++;
        board.append(cardWrapper);
        cardWrapper.addEventListener("click", cardOpen);
      }
      numsArrayCount = 0;
    }
    function timerStart() {
      timerValue--;
      if (timerValue < 0) {
        clearInterval(timerGo);
        gameFinish("loss");
      } else {
        header.textContent = `Найдите пары карточек.
        Времени осталось: ${timerValue}`;
      }
    }
    function timerCreate() {
      header.textContent = `Найдите пары карточек.
      Времени осталось: ${timerValue}`;
      timerGo = setInterval(timerStart, 1000);
    }
    function gameCreate() {
      couplesArray();
      cardsCreate();
      gameStart();
      if (timerOn) timerCreate();
    }
    function gameRestart() {
      document.location.reload();
    }
    function gameFinish(result) {
      if (result === "win") {
        if (timerOn) clearInterval(timerGo);
        setTimeout(() => (header.textContent = "Ура! Вы нашли все пары!"), 750);
      }
      if (result === "loss") {
        header.textContent = "Время вышло";
        document.querySelectorAll(".card-wrapper").forEach((currentCard) => {
          currentCard.removeEventListener("click", cardOpen);
          currentCard.classList.add("opened");
        });
      }
      setTimeout(() => {
        playAgain.classList.remove("hidden");
        playAgain.classList.add("active");
        playAgain.addEventListener("click", gameRestart);
      }, 750);
    }
    function compare(elem) {
      elem.classList.add("opened");
      if (!compareMode) {
        firstCard = elem;
        compareMode = true;
      } else {
        secondCard = elem;
        if (firstCard.dataset.num === secondCard.dataset.num) {
          firstCard.removeEventListener("click", cardOpen);
          secondCard.removeEventListener("click", cardOpen);
          firstCard = null;
          secondCard = null;
          foundCouples < couplesQuantity - 1
            ? foundCouples++
            : gameFinish("win");
        } else {
          let tempFirst = firstCard
          let tempSecond = secondCard;
          firstCard = null;
          secondCard = null;
          setTimeout(() => {
            tempFirst.classList.remove("opened");
            tempSecond.classList.remove("opened");
          }, 750);
        }
        compareMode = false;
      }
    }
    form.addEventListener("submit", (form) => {
      form.preventDefault();
      cardsQuantity = document.querySelector('.form-control').value;
      timerOn = document.querySelector('input[name="timer"]').checked;
      if (
        cardsQuantity >= 2 &&
        cardsQuantity <= 20 &&
        cardsQuantity % 2 === 0
      ) {
        gameCreate();
      } else {
        const toast = new bootstrap.Toast(toastEl);
        toast.show();
      }
    });
  });
};
game()