'use strict';

{
  window.setup = document.querySelector(`.setup`);
  const setupOpen = document.querySelector(`.setup-open`);
  const setupClose = document.querySelector(`.setup-close`);
  const setupUserName = document.querySelector(`.setup-user-name`);
  const submitForm = document.querySelector(`.setup-wizard-form`);

  setupUserName.addEventListener(`focus`, () => {
    document.removeEventListener(`keydown`, onPopupEscPress);
  });

  setupUserName.addEventListener(`blur`, () => {
    document.addEventListener(`keydown`, onPopupEscPress);
  });

  const onPopupEscPress = (evt) => {
    if (evt.key === `Escape`) {
      evt.preventDefault();
      window.setup.classList.add(`hidden`);
    }
  };

  const openPopup = () => {
    window.setup.classList.remove(`hidden`);

    window.setup.style.top = `80px`;
    window.setup.style.left = `50%`;

    document.addEventListener(`keydown`, onPopupEscPress);
  };

  const closePopup = () => {
    window.setup.classList.add(`hidden`);

    document.removeEventListener(`keydown`, onPopupEscPress);
  };

  setupOpen.addEventListener(`click`, () => {
    openPopup();
  });

  setupOpen.addEventListener(`keydown`, (evt) => {
    if (evt.key === `Enter`) {
      openPopup();
    }
  });

  setupClose.addEventListener(`click`, () => {
    closePopup();
  });

  setupClose.addEventListener(`keydown`, (evt) => {
    if (evt.key === `Enter`) {
      closePopup();
    }
  });

  submitForm.addEventListener(`submit`, (evt) => {
    window.backend.save(
        new FormData(submitForm),
        () => {
          window.setup.classList.add(`hidden`);
        },
        window.otherWizards.errorCreateWizards
    );
    evt.preventDefault();
  });
}
