const swiper = new Swiper(".swiper-container", {
  // If we need pagination
  slidesPerView: 1,
  pagination: {
    el: ".swiper-pagination",
  },
  // Navigation arrows
  navigation: {
    nextEl: ".arrow-right",
    prevEl: ".arrow-left",
  },
  observer: true,
});

swiper.on("transitionEnd", function (e) {
  document.querySelector(".count").textContent = `${swiper.realIndex + 1} / 11`;
  document
    .querySelectorAll(".btn-left-right")
    .forEach((btn) => btn.classList.add("disabled-btn"));
  swiper.allowTouchMove = false;
});

window.onload = () => {
    document.querySelector('.loader-mask').classList.add("hide")
  swiper.allowTouchMove = false;
  document
    .querySelectorAll(".btn-left-right")
    .forEach((btn) => btn.classList.add("disabled-btn"));
};

import cardsArray from "./data.mjs";
const randomly = () => Math.random() - 0.5;
const traitInfo = Array(cardsArray.length).fill({});
const dynamicCards = [].concat(cardsArray).sort(randomly);

traitInfo.forEach((t, i) => {
  document.querySelector(".swiper-wrapper").innerHTML += `
<div class="swiper-slide">
    <div class="card">
        <div class="card__side card__side--back" style="background-image: url(${dynamicCards[i].image1});background-size: cover;background-repeat: no-repeat;background-position: center;transform: rotateY(180deg);">
            <h2 class="answer">${dynamicCards[i].answer}</h2>
            <div class="watermarks">
                <img src="../assets/cards/watermark.png" alt="" class="left-top-side" draggable="false">
                <img src="../assets/cards/watermark.png" alt="" class="right-bottom-side" draggable="false">
            </div>
        </div>
  
        <div class="card__side card__side--front" style="background-image: url(${dynamicCards[i].bgImage});background-size: 100%;background-repeat: no-repeat;background-position: center;">
            <div class="watermarks">
                <img src="../assets/cards/watermark.png" alt="" class="left-top-side" draggable="false">
                <img src="../assets/cards/watermark.png" alt="" class="right-bottom-side" draggable="false">
            </div>

            <div class="content_card">
                <h2>
                    что это?
                </h2>
                <p>
                    по вашему мнению, что изображено, основываясь на цвете¿
                </p>
                <div class="images-clue">
                    <div class="img-clue" style="background: url(${dynamicCards[i].image1});background-size: cover;background-repeat: no-repeat;background-position: center left;">
                    </div>
                    <div class="img-clue" style="background: url(${dynamicCards[i].image2});background-size: cover;background-repeat: no-repeat;background-position: center right;">
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
    `;
});

const cards = document.querySelectorAll(".card");
cards.forEach((card) =>
  card.addEventListener("click", () => {
    card.classList.toggle("fliped");
    swiper.allowTouchMove = true;
    document
      .querySelectorAll(".btn-left-right")
      .forEach((btn) => btn.classList.remove("disabled-btn"));

    if (swiper.realIndex + 1 === cardsArray.length) {
      setTimeout(() => {
        document.querySelector(".end-screen").classList.add("show");
        // confeti

        var duration = 15 * 1000;
        var animationEnd = Date.now() + duration;
        var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 95 };

        function randomInRange(min, max) {
          return Math.random() * (max - min) + min;
        }

        var interval = setInterval(function () {
          var timeLeft = animationEnd - Date.now();

          if (timeLeft <= 0) {
            return clearInterval(interval);
          }

          var particleCount = 50 * (timeLeft / duration);
          // since particles fall down, start a bit higher than random
          confetti({
            ...defaults,
            particleCount,
            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
          });
          confetti({
            ...defaults,
            particleCount,
            origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
          });
        }, 250);
      }, 1500);
    }
  })
);
