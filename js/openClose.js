'use strict';

(function () {
  const setup = document.querySelector(`.setup`);
  const setupOpen = document.querySelector(`.setup-open`);
  const setupClose = document.querySelector(`.setup-close`);
  const setupUserName = document.querySelector(`.setup-user-name`);

  setupUserName.addEventListener(`focus`, () => {
    document.removeEventListener(`keydown`, onPopupEscPress);
  });

  setupUserName.addEventListener(`blur`, () => {
    document.addEventListener(`keydown`, onPopupEscPress);
  });

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
})();
