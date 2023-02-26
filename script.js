"use Strict";

const nextBtn = document.querySelector(".next-btn");
const prevBtn = document.querySelector(".prev-btn");
const submitBtn = document.querySelector(".submit-btn");
const questionBoxes = document.querySelectorAll(".box");
const progressStatus = document.querySelector(".progress-status");
const section_questionnaires = document.querySelector(".questionnaires");

const total = document.querySelector(".total");
const correct = document.querySelector(".correct");
const inCorrect = document.querySelector(".inCorrect");

const results = document.querySelector(".results");

const navList = document.querySelector(".nav-list");

const navItems = document.querySelectorAll(".nav-items");

const solutions = {
  1: "1a",
  2: "2a",
  3: "3b",
  4: "4c",
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

const activeQuestion = function (currentBox) {
  const link = document.querySelector(`.q-${currentBox + 1}`);
  navItems.forEach((item) => item.classList.remove("active"));
  link.classList.add("active");
};

activeQuestion(currentBox);

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

  activeQuestion(currentBox);
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
  activeQuestion(currentBox);
  moveBoxes(currentBox);
});

//adding event handler to each answer

const answers = {};

document.querySelector(".container").addEventListener("click", function (e) {
  const optionChoose = e.target;
  if (!optionChoose.classList.contains("option")) return;
  const optionGroup = optionChoose.closest(".options");
  const group = +optionGroup.dataset.group;
  const options = optionGroup.querySelectorAll("div");
  options.forEach((item) => item.classList.remove("selectedOption"));
  optionChoose.classList.add("selectedOption");
  const answer = optionChoose.dataset.option;
  answers[group] = answer === solutions[group];
  console.log(answers);
});

//submitting the result

submitBtn.addEventListener("click", function () {
  const entries = Object.entries(answers);
  const inCorrectAnswers = entries.filter((answer) => answer[1] === false);
  section_questionnaires.classList.add("hide");
  results.classList.remove("hide");
  total.textContent = entries.length;
  correct.textContent = entries.length - inCorrectAnswers.length;
  inCorrect.textContent = inCorrectAnswers.length;
  document.querySelector(".q-5").classList.remove("active");

  // console.log(inCorrectAnswers);
  inCorrectAnswers.forEach((item) =>
    document.querySelector(`.q-${item[0]}`).classList.add("incorrect")
  );
});

// console.log(section_questionnaires, results);
navList.addEventListener("click", function (e) {
  const item = e.target.closest(".nav-items");
  navItems.forEach((item) => item.classList.remove("active"));
  item.classList.add("active");

  const currentItem = +item.dataset.link - 1;
  moveBoxes(currentItem);
  currentBox = currentItem;
});
