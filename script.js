"use Strict";

const nextBtn = document.querySelector(".next-btn");
const prevBtn = document.querySelector(".prev-btn");
const questionBoxes = document.querySelectorAll(".box");
// console.log(questionBoxes);

//adding functionlity to next and prev buttons

let currentBox = 0;
const moveBoxes = function (currentBox) {
  questionBoxes.forEach((box, i) => {
    box.style.transform = `translateX(${(i - currentBox) * 100}%)`;
  });
};

moveBoxes(currentBox);

nextBtn.addEventListener("click", function () {
  if (currentBox >= questionBoxes.length - 1) {
    return;
  }
  currentBox++;
  moveBoxes(currentBox);
});

prevBtn.addEventListener("click", function () {
  if (currentBox <= 0) {
    return;
  }
  currentBox--;
  moveBoxes(currentBox);
});
