'use strict';

{
  const MAX_COUNT_WIZARDS = 4;
  const similarListElement = document.querySelector(`.setup-similar-list`);
  const template = document.querySelector(`#similar-wizard-template`).content.querySelector(`.setup-similar-item`);

  window.randNum = (arr) => {
    return Math.floor(Math.random() * arr.length);
  };

  window.coatColor = `rgb(101, 137, 164)`;
  window.eyesColor = `black`;
  let wizards = [];

  const successHandler = (data) => {
    wizards = data;
    updateWizards();
  };

  const getRank = (wizard) => {
    let rank = 0;

    if (wizard.colorCoat === window.coatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === window.eyesColor) {
      rank += 1;
    }

    return rank;
  };

  const namesComparator = (left, right) => {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  };

  const updateWizards = () => {

    createWizards(wizards.sort((left, right) => {
      let rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = namesComparator(left.name, right.name);
      }
      return rankDiff;
    }));

  };

  const renderWizard = (wizard) => {
    const wizardElement = template.cloneNode(true);

    wizardElement.querySelector(`.setup-similar-label`).textContent = wizard.name;
    wizardElement.querySelector(`.wizard-coat`).style.fill = wizard.colorCoat;
    wizardElement.querySelector(`.wizard-eyes`).style.fill = wizard.colorEyes;

    return wizardElement;
  };
  const similarList = document.querySelector(`.setup-similar-list`);
  const createWizards = (wizardsArray) => {
    const fragment = document.createDocumentFragment();

    const takeNumber = wizardsArray.length > MAX_COUNT_WIZARDS
      ? MAX_COUNT_WIZARDS
      : wizardsArray.length;

    similarList.innerHTML = ``;

    for (let i = 0; i < takeNumber; i++) {
      fragment.appendChild(renderWizard(wizardsArray[i]));
    }
    similarListElement.appendChild(fragment);

    window.setup.querySelector(`.setup-similar`).classList.remove(`hidden`);
  };

  const errorCreateWizards = (errMessage) => {
    const node = document.createElement(`div`);
    node.style = `z-index: 100; margin: 0 auto; text-align: center; background-color: red;`;
    node.style.position = `absolute`;
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = `30px`;

    node.textContent = errMessage;
    document.body.insertAdjacentElement(`afterbegin`, node);
  };

  window.backend.load(successHandler, errorCreateWizards);

  window.otherWizards = {
    errorCreateWizards,
    updateWizards
  };
  document.querySelector(`.setup-similar`).classList.remove(`hidden`);
}
