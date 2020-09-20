'use strict';

const fireballSize = 22;
const wizardSpeed = 3;
const wizardWidth = 70;
const getFireballSpeed = function (movingLeft) {
  return movingLeft ? 2 : 5;
};
const getWizardHeight = function () {
  return 1.337 * wizardWidth;
};
const getWizardX = function (width) {
  return (width - wizardWidth) / 2;
};
const getWizardY = function (height) {
  return height / 3;
};
