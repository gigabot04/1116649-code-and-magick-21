'use strict';

document.querySelector(`.setup`).classList.remove(`hidden`);
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
