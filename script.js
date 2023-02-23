"use Strict";

const nextBtn = document.querySelector(".next-btn");
const prevBtn = document.querySelector(".prev-btn");
const submitBtn = document.querySelector(".submit-btn");
const questionBoxes = document.querySelectorAll(".box");
const progressStatus = document.querySelector(".progress-status");
// console.log(questionBoxes);

const solutions = {
  1: "1a",
  2: "2a",
  3: "3b",
  4: "4b",
  5: "5c",
};

//adding functionlity to next and prev buttons

let currentBox = 0;
const moveBoxes = function (currentBox) {
  questionBoxes.forEach((box, i) => {
    box.style.transform = `translateX(${(i - currentBox) * 100}%)`;
  });
  progressStatus.style.width = `${(currentBox + 1) * 20}%`;
};
moveBoxes(currentBox);

if (currentBox < 4) {
  submitBtn.style.display = "none";
}

if (currentBox <= 0) {
  prevBtn.style.display = "none";
}

nextBtn.addEventListener("click", function () {
  if (currentBox >= questionBoxes.length - 1) {
    return;
  }
  currentBox++;

  if (currentBox > 0) {
    prevBtn.style.display = "inline-block";
  }
  if (currentBox >= 4) {
    submitBtn.style.display = "inline-block";
    nextBtn.style.display = "none";
  }
  moveBoxes(currentBox);
});

prevBtn.addEventListener("click", function () {
  if (currentBox <= 0) {
    return;
  }
  currentBox--;
  if (currentBox < 4) {
    nextBtn.style.display = "inline-block";
    submitBtn.style.display = "none";
  }
  if (currentBox <= 0) {
    prevBtn.style.display = "none";
  }

  moveBoxes(currentBox);
});

//adding event handler to each answer

const section = document.querySelector(".section");
section.addEventListener("click", function (e) {
  const optionChoose = e.target;
  if (!optionChoose.classList.contains("option")) return;
  const optionGroup = optionChoose.closest(".options");
  const group = +optionGroup.dataset.group;
  const options = optionGroup.querySelectorAll("div");
  options.forEach((item) => item.classList.remove("selectedOption"));
  optionChoose.classList.add("selectedOption");
  const answer = optionChoose.dataset.option;

  console.log(group, answer, solutions[group] === answer);
});
