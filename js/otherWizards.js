'use strict';

{
  const MAX_COUNT_WIZARDS = 4;
  const similarListElement = document.querySelector(`.setup-similar-list`);
  const template = document.querySelector(`#similar-wizard-template`).content.querySelector(`.setup-similar-item`);

  window.randNum = (arr) => {
    return Math.floor(Math.random() * arr.length);
  };

  let coatColor = `rgb(101, 137, 164)`;
  let eyesColor = `black`;
  let wizards = [];

  const successHandler = (data) => {
    wizards = data;
    updateWizards();
  };

  const updateWizards = () => {

    const sameCoatWizards = wizards.filter((wizard) => {
      return wizard.colorCoat === coatColor;
    });

    createWizards(sameCoatWizards);
  };

  const renderWizard = (wizard) => {
    const wizardElement = template.cloneNode(true);

    wizardElement.querySelector(`.setup-similar-label`).textContent = wizard.name;
    wizardElement.querySelector(`.wizard-coat`).style.fill = wizard.colorCoat;
    wizardElement.querySelector(`.wizard-eyes`).style.fill = wizard.colorEyes;

    return wizardElement;
  };

  const createWizards = (wizardsArray) => {
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < MAX_COUNT_WIZARDS; i++) {
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
    updateWizards,
    coatColor,
    eyesColor
  };
  document.querySelector(`.setup-similar`).classList.remove(`hidden`);
}
