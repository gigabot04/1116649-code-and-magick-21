'use strict';

document.querySelector(`.setup`).classList.remove(`hidden`);
const firstName = [`Иван`, `Хуан Себастьян`, `Мария`, `Кристоф`, `Виктор`, `Юлия`, `Люпита`, `Вашингтон`];
const secondName = [`да Марья`, `Верон`, `Мирабелла`, `Вальц`, `Онопко`, `Топольницкая`, `Нионго`, `Ирвинг`];
const coatColorWizard = [`rgb(101, 137, 164)`, `rgb(241, 43, 107)`, `rgb(146, 100, 161)`, `rgb(56, 159, 117)`, `rgb(215, 210, 55)`, `rgb(0, 0, 0)`];
const eyesColorWizard = [`black`, `red`, `blue`, `yellow`, `green`];
const similarListElement = document.querySelector(`.setup-similar-list`);
let wizards = [];
const template = document.querySelector(`#similar-wizard-template`)
  .content
  .querySelector(`.setup-similar-item`);

const randNum = (arr) => {
  return Math.floor(Math.random() * arr.length);
};

for (let i = 0; i < 4; i++) {
  const wizardTest =
    {
      name: firstName[randNum(firstName)] + ` ` + secondName[randNum(secondName)],
      coatColor: coatColorWizard[randNum(coatColorWizard)],
      eyesColor: eyesColorWizard[randNum(eyesColorWizard)]
    };
  wizards.push(wizardTest);
}

const renderWizard = (wizard) => {
  const wizardElement = template.cloneNode(true);

  wizardElement.querySelector(`.setup-similar-label`).textContent = wizard.name;
  wizardElement.querySelector(`.wizard-coat`).style.fill = wizard.coatColor;
  wizardElement.querySelector(`.wizard-eyes`).style.fill = wizard.eyesColor;

  return wizardElement;
};

let fragment = document.createDocumentFragment();
for (let i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}
similarListElement.appendChild(fragment);

document.querySelector(`.setup-similar`).classList.remove(`hidden`);
