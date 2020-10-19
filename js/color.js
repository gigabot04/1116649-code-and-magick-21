'use strict';

(function () {
  const сoatFireballClick = document.querySelector(`.setup-fireball-wrap`);
  const inputCoatColor = document.querySelector(`input[name="coat-color"]`);
  const inputEyeColor = document.querySelector(`input[name="eyes-color"]`);
  const inputFireballColor = сoatFireballClick.querySelector(`input[name="fireball-color"]`);

  // Изменение цвета мантии

  const сoatColorClick = document.querySelector(`.wizard-coat`);
  let setupCoatColors = [`rgb(101, 137, 164)`, `rgb(241, 43, 107)`, `rgb(146, 100, 161)`, `rgb(56, 159, 117)`, `rgb(215, 210, 55)`, `rgb(0, 0, 0)`];

  const setupColorDel = (arr) => {
    return arr.splice(window.randNum(arr), 1).pop();
  };

  сoatColorClick.addEventListener(`click`, () => {
    if (setupCoatColors[0] && !setupCoatColors[1]) {
      setupCoatColors = [`rgb(101, 137, 164)`, `rgb(241, 43, 107)`, `rgb(146, 100, 161)`, `rgb(56, 159, 117)`, `rgb(215, 210, 55)`, `rgb(0, 0, 0)`];
    }
    const randNum = setupColorDel(setupCoatColors);
    сoatColorClick.style.fill = randNum;
    inputCoatColor.value = randNum;
    window.otherWizards.coatColor = randNum;
    window.otherWizards.updateWizards();
  });

  // Изменение цвета глаз

  const сoatEyeClick = document.querySelector(`.wizard-eyes`);
  let setupEyeColors = [`black`, `red`, `blue`, `yellow`, `green`];

  сoatEyeClick.addEventListener(`click`, () => {
    if (setupEyeColors[0] && !setupEyeColors[1]) {
      setupEyeColors = [`black`, `red`, `blue`, `yellow`, `green`];
    }
    const randNum = setupColorDel(setupEyeColors);
    сoatEyeClick.style.fill = randNum;
    inputEyeColor.value = randNum;
    window.otherWizards.eyesColor = randNum;
    window.otherWizards.updateWizards();
  });

  // Изменение цвета фаербола

  let setupFireballColors = [`#ee4830`, `#30a8ee`, `#5ce6c0`, `#e848d5`, `#e6e848`];

  сoatFireballClick.addEventListener(`click`, () => {
    if (setupFireballColors[0] && !setupFireballColors[1]) {
      setupFireballColors = [`#ee4830`, `#30a8ee`, `#5ce6c0`, `#e848d5`, `#e6e848`];
    }
    const randNum = setupColorDel(setupFireballColors);
    сoatFireballClick.style.backgroundColor = randNum;
    inputFireballColor.value = randNum;
  });

})();
