'use strict';

const firstNames = [`Иван`, `Хуан Себастьян`, `Мария`, `Кристоф`, `Виктор`, `Юлия`, `Люпита`, `Вашингтон`];
const secondNames = [`да Марья`, `Верон`, `Мирабелла`, `Вальц`, `Онопко`, `Топольницкая`, `Нионго`, `Ирвинг`];
const coatColorWizard = [`rgb(101, 137, 164)`, `rgb(241, 43, 107)`, `rgb(146, 100, 161)`, `rgb(56, 159, 117)`, `rgb(215, 210, 55)`, `rgb(0, 0, 0)`];
const eyesColorWizard = [`black`, `red`, `blue`, `yellow`, `green`];
const similarListElement = document.querySelector(`.setup-similar-list`);
const wizards = [];
const template = document.querySelector(`#similar-wizard-template`).content.querySelector(`.setup-similar-item`);

const randNum = (arr) => {
  return Math.floor(Math.random() * arr.length);
};

const createWizard = () => {
  const firstName = firstNames.splice(randNum(firstNames), 1).pop();
  const secondName = secondNames.splice(randNum(secondNames), 1).pop();
  const coatColor = coatColorWizard.splice(randNum(coatColorWizard), 1).pop();
  const eyesColor = eyesColorWizard.splice(randNum(eyesColorWizard), 1).pop();

  return {
    name: `${firstName} ${secondName}`,
    coatColor,
    eyesColor
  };
};

const renderWizard = (wizard) => {
  const wizardElement = template.cloneNode(true);

  wizardElement.querySelector(`.setup-similar-label`).textContent = wizard.name;
  wizardElement.querySelector(`.wizard-coat`).style.fill = wizard.coatColor;
  wizardElement.querySelector(`.wizard-eyes`).style.fill = wizard.eyesColor;

  return wizardElement;
};

for (let i = 0; i < 4; i++) {
  wizards.push(createWizard());
}

const fragment = document.createDocumentFragment();
for (let i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}
similarListElement.appendChild(fragment);

document.querySelector(`.setup-similar`).classList.remove(`hidden`);


// Открытие и закрытие формы

const setup = document.querySelector(`.setup`);
const setupOpen = document.querySelector(`.setup-open`);
const setupClose = document.querySelector(`.setup-close`);

const onPopupEscPress = (evt) => {
  if (evt.key === `Escape`) {
    evt.preventDefault();
    setup.classList.add(`hidden`);
  }
};

const openPopup = () => {
  setup.classList.remove(`hidden`);

  document.addEventListener(`keydown`, onPopupEscPress);
};

const closePopup = () => {
  setup.classList.add(`hidden`);

  document.removeEventListener(`keydown`, onPopupEscPress);
};

setupOpen.addEventListener(`click`, () => {
  openPopup();
});

setupOpen.addEventListener(`keydown`, function (evt) {
  if (evt.key === `Enter`) {
    openPopup();
  }
});

setupClose.addEventListener(`click`, () => {
  closePopup();
});

setupClose.addEventListener(`keydown`, function (evt) {
  if (evt.key === `Enter`) {
    closePopup();
  }
});

// Изменение цвета мантии


const onCoatColorClick = document.querySelector(`.wizard-coat`);
let setupCoatColors = [`rgb(101, 137, 164)`, `rgb(241, 43, 107)`, `rgb(146, 100, 161)`, `rgb(56, 159, 117)`, `rgb(215, 210, 55)`, `rgb(0, 0, 0)`];

onCoatColorClick.addEventListener(`click`, () => {
  let inputCoatColor = document.querySelector(`input[name="coat-color"]`);
  if (setupCoatColors[0] && !setupCoatColors[1]) {
    setupCoatColors = [`rgb(101, 137, 164)`, `rgb(241, 43, 107)`, `rgb(146, 100, 161)`, `rgb(56, 159, 117)`, `rgb(215, 210, 55)`, `rgb(0, 0, 0)`];
  }
  const setupCoatColorDel = setupCoatColors.splice(randNum(setupCoatColors), 1).pop();
  onCoatColorClick.style.fill = setupCoatColorDel;
  inputCoatColor.value = setupCoatColorDel;
});

// Изменение цвета глаз

const onCoatEyeClick = document.querySelector(`.wizard-eyes`);
let setupEyeColors = [`black`, `red`, `blue`, `yellow`, `green`];

onCoatEyeClick.addEventListener(`click`, () => {
  let inputEyeColor = document.querySelector(`input[name="eyes-color"]`);
  if (setupEyeColors[0] && !setupEyeColors[1]) {
    setupEyeColors = [`black`, `red`, `blue`, `yellow`, `green`];
  }
  const setupEyeColorDel = setupEyeColors.splice(randNum(setupEyeColors), 1).pop();
  onCoatEyeClick.style.fill = setupEyeColorDel;
  inputEyeColor.value = setupEyeColorDel;
});

// Изменение цвета фаербола

const onCoatFireballClick = document.querySelector(`.setup-fireball-wrap`);
let setupFireballColors = [`#ee4830`, `#30a8ee`, `#5ce6c0`, `#e848d5`, `#e6e848`];

onCoatFireballClick.addEventListener(`click`, () => {
  let inputFireballColor = onCoatFireballClick.querySelector(`input[name="fireball-color"]`);
  if (setupFireballColors[0] && !setupFireballColors[1]) {
    setupFireballColors = [`#ee4830`, `#30a8ee`, `#5ce6c0`, `#e848d5`, `#e6e848`];
  }
  const setupFireballColorDel = setupFireballColors.splice(randNum(setupFireballColors), 1).pop();
  onCoatFireballClick.style.backgroundColor = setupFireballColorDel;
  inputFireballColor.value = setupFireballColorDel;
});
