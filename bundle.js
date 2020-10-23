/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
(() => {
/*!*****************************!*\
  !*** ./js/helpersModule.js ***!
  \*****************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


let lastTimeout;
const debounce = (cb, timeout = 500) => {
  if (lastTimeout) {
    window.clearTimeout(lastTimeout);
  }
  lastTimeout = window.setTimeout(cb, timeout);
};
window.helpersModule = {
  debounce
};

})();

(() => {
/*!***********************!*\
  !*** ./js/backend.js ***!
  \***********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


const load = (onLoad, onError) => {
  const URL = `https://21.javascript.pages.academy/code-and-magick/data`;
  const TIMEOUT = 10000;
  const xhr = new XMLHttpRequest();

  xhr.responseType = `json`;

  xhr.open(`GET`, URL);

  xhr.addEventListener(`load`, () => {
    const error = ``;
    switch (xhr.status) {
      case 200:
        onLoad(xhr.response);
        break;
      case 400:
        error = `Неверный запрос`;
        break;
      case 401:
        error = `Пользователь не авторизован`;
        break;
      case 404:
        error = `Ничего не найдено`;
        break;
      default:
        error = `Cтатус ответа: : ${xhr.status} ${xhr.statusText}`;
    }
    if (error) {
      onError(error);
    }
  });

  xhr.addEventListener(`error`, () => {
    onError(`Произошла ошибка соединения`);
  });

  xhr.addEventListener(`timeout`, () => {
    onError(`Запрос не успел выполниться за ${xhr.timeout} мс`);
  });

  xhr.timeout = TIMEOUT;
  xhr.send();
};

const save = (data, onLoad, onError) => {
  const URL = `https://21.javascript.pages.academy/code-and-magick`;
  const TIMEOUT = 10000;
  const xhr = new XMLHttpRequest();
  xhr.responseType = `json`;

  xhr.addEventListener(`load`, () => {
    onLoad(xhr.response);
  });
  xhr.addEventListener(`error`, () => {
    onError(`Произошла ошибка соединения`);
  });
  xhr.addEventListener(`timeout`, () => {
    onError(`Запрос не успел выполниться за ${xhr.timeout} мс`);
  });
  xhr.timeout = TIMEOUT;
  xhr.open(`POST`, URL);
  xhr.send(data);
};

window.backend = {
  load,
  save
};

})();

(() => {
/*!****************************!*\
  !*** ./js/otherWizards.js ***!
  \****************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


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

const updateWizards = () => {

  createWizards(wizards.sort((left, right) => {
    let rankDiff = getRank(right) - getRank(left);

    if (rankDiff === 0) {
      rankDiff = left.name.localeCompare(right.name);
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

})();

(() => {
/*!*************************!*\
  !*** ./js/openClose.js ***!
  \*************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


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

})();

(() => {
/*!*********************!*\
  !*** ./js/color.js ***!
  \*********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


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
  window.coatColor = randNum;
  window.helpersModule.debounce(window.otherWizards.updateWizards);
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
  window.eyesColor = randNum;
  window.helpersModule.debounce(window.otherWizards.updateWizards);
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

(() => {
/*!*************************!*\
  !*** ./js/movePopup.js ***!
  \*************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


const dialogMove = document.querySelector(`.upload`);

dialogMove.addEventListener(`mousedown`, (evt) => {
  evt.preventDefault();

  let startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  let dragged = false;

  const onMouseMove = (moveEvt) => {
    moveEvt.preventDefault();

    let shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    dragged = true;

    window.setup.style.top = `${window.setup.offsetTop - shift.y}px`;
    window.setup.style.left = `${window.setup.offsetLeft - shift.x}px`;
  };

  const onMouseUp = (upEvt) => {
    upEvt.preventDefault();

    document.removeEventListener(`mousemove`, onMouseMove);
    document.removeEventListener(`mouseup`, onMouseUp);

    if (dragged) {
      const onClickPreventDefault = (clickEvt) => {
        clickEvt.preventDefault();
        dialogMove.removeEventListener(`click`, onClickPreventDefault);
      };
      dialogMove.addEventListener(`click`, onClickPreventDefault);
    }
  };

  document.addEventListener(`mousemove`, onMouseMove);
  document.addEventListener(`mouseup`, onMouseUp);
});

})();

(() => {
/*!********************!*\
  !*** ./js/stat.js ***!
  \********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


const CLOUD_WIDTH = 420;
const CLOUD_HEIGHT = 270;
const CLOUD_X = 100;
const CLOUD_Y = 10;
const COLUMN_DIST = 50;
const COLUMN_WIDTH = 40;
const COLUMN_HEIGHT_STAT = 150;
const GAP = 10;
const TEXT_HEIGHT = 15;
const Saturate = [`hsl(240, 20%, 50%)`, `hsl(240, 50%, 50%)`, `hsl(240, 70%, 50%)`, `hsl(240, 100%, 50%)`];

const renderCloud = (ctx, x, y, color) => {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

const getMaxElement = (arr) => {
  let maxElement = arr[0];

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

window.renderStatistics = (ctx, players, times) => {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, `rgba(0, 0, 0, 0.7)`);
  renderCloud(ctx, CLOUD_X, CLOUD_Y, `#fff`);

  ctx.fillStyle = `#000`;
  ctx.font = `16px PT Mono`;
  ctx.textBaseline = `hanging`;
  ctx.fillText(`Ура вы победили!`, CLOUD_X + (GAP * 2), CLOUD_Y + (GAP * 2));
  ctx.fillText(`Список результатов:`, CLOUD_X + (GAP * 2), CLOUD_Y + (GAP * 2) + TEXT_HEIGHT);

  const maxTime = getMaxElement(times);

  for (let i = 0; i < players.length; i++) {
    ctx.fillStyle = `#000`;
    ctx.fillText(
        players[i],
        CLOUD_X + COLUMN_DIST + (COLUMN_WIDTH + COLUMN_DIST) * i,
        CLOUD_HEIGHT - GAP
    );

    if (players[i] === `Вы`) {
      ctx.fillStyle = `rgba(255, 0, 0, 1)`;
    } else {
      ctx.fillStyle = Saturate[i];
    }

    const ColumnHeight = (COLUMN_HEIGHT_STAT * times[i]) / maxTime;

    ctx.fillRect(
        CLOUD_X + COLUMN_DIST + (COLUMN_WIDTH + COLUMN_DIST) * i,
        CLOUD_HEIGHT - ColumnHeight - GAP - TEXT_HEIGHT,
        COLUMN_WIDTH,
        ColumnHeight
    );

    ctx.fillStyle = `#000`;

    ctx.fillText(
        times[i].toFixed(),
        CLOUD_X + COLUMN_DIST + (COLUMN_WIDTH + COLUMN_DIST) * i,
        CLOUD_HEIGHT - ColumnHeight - ((GAP + TEXT_HEIGHT) * 2)
    );
  }
};

})();

(() => {
/*!************************!*\
  !*** ./js/settings.js ***!
  \************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


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

})();

(() => {
/*!********************!*\
  !*** ./js/game.js ***!
  \********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


window.GameConstants = {
  Fireball: {
    size: fireballSize || 24,
    speed: getFireballSpeed || function (movingLeft) {
      return movingLeft ? 2 : 5;
    }
  },
  Wizard: {
    speed: wizardSpeed || 2,
    width: wizardWidth || 61,
    getHeight: getWizardHeight || function (width) {
      return 1.377 * width;
    },
    getX: getWizardX || function (width) {
      return width / 3;
    },
    getY: getWizardY || function (height) {
      return height - 100;
    }
  }
};

window.Game = (function () {
  /**
   * @const
   * @type {number}
   */
  var HEIGHT = 300;

  /**
   * @const
   * @type {number}
   */
  var WIDTH = 700;

  /**
   * ID уровней.
   * @enum {number}
   */
  var Level = {
    INTRO: 0,
    MOVE_LEFT: 1,
    MOVE_RIGHT: 2,
    LEVITATE: 3,
    HIT_THE_MARK: 4
  };

  var NAMES = ['Кекс', 'Катя', 'Игорь'];

  /**
   * Порядок прохождения уровней.
   * @type {Array.<Level>}
   */
  var LevelSequence = [
    Level.INTRO
  ];

  /**
   * Начальный уровень.
   * @type {Level}
   */
  var INITIAL_LEVEL = LevelSequence[0];

  /**
   * Допустимые виды объектов на карте.
   * @enum {number}
   */
  var ObjectType = {
    ME: 0,
    FIREBALL: 1
  };

  /**
   * Допустимые состояния объектов.
   * @enum {number}
   */
  var ObjectState = {
    OK: 0,
    DISPOSED: 1
  };

  /**
   * Коды направлений.
   * @enum {number}
   */
  var Direction = {
    NULL: 0,
    LEFT: 1,
    RIGHT: 2,
    UP: 4,
    DOWN: 8
  };

  /**
   * Карта спрайтов игры.
   * @type {Object.<ObjectType, Object>}
   */
  var SpriteMap = {};
  var REVERSED = '-reversed';

  SpriteMap[ObjectType.ME] = {
    width: 61,
    height: 84,
    url: 'img/wizard.gif'
  };

  // TODO: Find a clever way
  SpriteMap[ObjectType.ME + REVERSED] = {
    width: 61,
    height: 84,
    url: 'img/wizard-reversed.gif'
  };

  SpriteMap[ObjectType.FIREBALL] = {
    width: 24,
    height: 24,
    url: 'img/fireball.gif'
  };

  /**
   * Правила перерисовки объектов в зависимости от состояния игры.
   * @type {Object.<ObjectType, function(Object, Object, number): Object>}
   */
  var ObjectsBehaviour = {};

  /**
   * Обновление движения мага. Движение мага зависит от нажатых в данный момент
   * стрелок. Маг может двигаться одновременно по горизонтали и по вертикали.
   * На движение мага влияет его пересечение с препятствиями.
   * @param {Object} object
   * @param {Object} state
   * @param {number} timeframe
   */
  ObjectsBehaviour[ObjectType.ME] = function (object, state, timeframe) {
    // Пока зажата стрелка вверх, маг сначала поднимается, а потом левитирует
    // в воздухе на определенной высоте.
    // NB! Сложность заключается в том, что поведение описано в координатах
    // канваса, а не координатах, относительно нижней границы игры.
    if (state.keysPressed.UP && object.y > 0) {
      object.direction = object.direction & ~Direction.DOWN;
      object.direction = object.direction | Direction.UP;
      object.y -= object.speed * timeframe * 2;
    }

    // Если стрелка вверх не зажата, а маг находится в воздухе, он плавно
    // опускается на землю.
    if (!state.keysPressed.UP) {
      if (object.y < HEIGHT - object.height) {
        object.direction = object.direction & ~Direction.UP;
        object.direction = object.direction | Direction.DOWN;
        object.y += object.speed * timeframe / 3;
      }
    }

    // Если зажата стрелка влево, маг перемещается влево.
    if (state.keysPressed.LEFT) {
      object.direction = object.direction & ~Direction.RIGHT;
      object.direction = object.direction | Direction.LEFT;
      object.x -= object.speed * timeframe;
    }

    // Если зажата стрелка вправо, маг перемещается вправо.
    if (state.keysPressed.RIGHT) {
      object.direction = object.direction & ~Direction.LEFT;
      object.direction = object.direction | Direction.RIGHT;
      object.x += object.speed * timeframe;
    }

    // Ограничения по перемещению по полю. Маг не может выйти за пределы поля.
    if (object.y < 0) {
      object.y = 0;
    }

    if (object.y > HEIGHT - object.height) {
      object.y = HEIGHT - object.height;
    }

    if (object.x < 0) {
      object.x = 0;
    }

    if (object.x > WIDTH - object.width) {
      object.x = WIDTH - object.width;
    }
  };

  /**
   * Обновление движения файрбола. Файрбол выпускается в определенном направлении
   * и после этого неуправляемо движется по прямой в заданном направлении. Если
   * он пролетает весь экран насквозь, он исчезает.
   * @param {Object} object
   * @param {Object} _state
   * @param {number} timeframe
   */
  ObjectsBehaviour[ObjectType.FIREBALL] = function (object, _state, timeframe) {
    if (object.direction & Direction.LEFT) {
      object.x -= object.speed * timeframe;
    }

    if (object.direction & Direction.RIGHT) {
      object.x += object.speed * timeframe;
    }

    if (object.x < 0 || object.x > WIDTH) {
      object.state = ObjectState.DISPOSED;
    }
  };

  /**
   * ID возможных ответов функций, проверяющих успех прохождения уровня.
   * CONTINUE говорит о том, что раунд не закончен и игру нужно продолжать,
   * WIN о том, что раунд выигран, FAIL — о поражении. PAUSE о том, что игру
   * нужно прервать.
   * @enum {number}
   */
  var Verdict = {
    CONTINUE: 0,
    WIN: 1,
    FAIL: 2,
    PAUSE: 3,
    INTRO: 4
  };

  /**
   * Правила завершения уровня. Ключами служат ID уровней, значениями функции
   * принимающие на вход состояние уровня и возвращающие true, если раунд
   * можно завершать или false если нет.
   * @type {Object.<Level, function(Object):boolean>}
   */
  var LevelsRules = {};

  /**
   * Уровень считается пройденным, если был выпущен файлболл и он улетел
   * за экран.
   * @param {Object} state
   * @return {Verdict}
   */
  LevelsRules[Level.INTRO] = function (state) {
    var deletedFireballs = state.garbage.filter(function (object) {
      return object.type === ObjectType.FIREBALL;
    });

    var fenceHit = deletedFireballs.filter(function (fireball) {
      // Did we hit the fence?
      return fireball.x < 10 && fireball.y > 240;
    })[0];

    return fenceHit ? Verdict.WIN : Verdict.CONTINUE;
  };

  /**
   * Начальные условия для уровней.
   * @enum {Object.<Level, function>}
   */
  var LevelsInitialize = {};

  /**
   * Первый уровень.
   * @param {Object} state
   * @return {Object}
   */
  LevelsInitialize[Level.INTRO] = function (state) {
    state.objects.push(
        // Установка персонажа в начальное положение. Он стоит в крайнем левом
        // углу экрана, глядя вправо. Скорость перемещения персонажа на этом
        // уровне равна 2px за кадр.
        {
          direction: Direction.RIGHT,
          height: window.GameConstants.Wizard.getHeight(window.GameConstants.Wizard.width),
          speed: window.GameConstants.Wizard.speed,
          sprite: SpriteMap[ObjectType.ME],
          state: ObjectState.OK,
          type: ObjectType.ME,
          width: window.GameConstants.Wizard.width,
          x: window.GameConstants.Wizard.getX(WIDTH),
          y: window.GameConstants.Wizard.getY(HEIGHT)
        }
    );

    return state;
  };

  /**
   * Конструктор объекта Game. Создает canvas, добавляет обработчики событий
   * и показывает приветственный экран.
   * @param {Element} container
   * @constructor
   */
  var Game = function (container) {
    this.container = container;
    this.canvas = document.createElement('canvas');
    this.canvas.width = container.clientWidth;
    this.canvas.height = container.clientHeight;
    this.container.appendChild(this.canvas);

    this.ctx = this.canvas.getContext('2d');

    this._onKeyDown = this._onKeyDown.bind(this);
    this._onKeyUp = this._onKeyUp.bind(this);
    this._pauseListener = this._pauseListener.bind(this);

    this.setDeactivated(false);
  };

  Game.prototype = {
    /**
     * Текущий уровень игры.
     * @type {Level}
     */
    level: INITIAL_LEVEL,

    /** @param {boolean} deactivated */
    setDeactivated: function (deactivated) {
      if (this._deactivated === deactivated) {
        return;
      }

      this._deactivated = deactivated;

      if (deactivated) {
        this._removeGameListeners();
      } else {
        this._initializeGameListeners();
      }
    },

    /**
     * Состояние игры. Описывает местоположение всех объектов на игровой карте
     * и время проведенное на уровне и в игре.
     * @return {Object}
     */
    getInitialState: function () {
      return {
        // Статус игры. Если CONTINUE, то игра продолжается.
        currentStatus: Verdict.CONTINUE,

        // Объекты, удаленные на последнем кадре.
        garbage: [],

        // Время с момента отрисовки предыдущего кадра.
        lastUpdated: null,

        // Состояние нажатых клавиш.
        keysPressed: {
          ESC: false,
          LEFT: false,
          RIGHT: false,
          SPACE: false,
          UP: false
        },

        // Время начала прохождения уровня.
        levelStartTime: null,

        // Все объекты на карте.
        objects: [],

        // Время начала прохождения игры.
        startTime: null
      };
    },

    /**
     * Начальные проверки и запуск текущего уровня.
     * @param {boolean=} restart
     */
    initializeLevelAndStart: function (restart) {
      restart = typeof restart === 'undefined' ? true : restart;

      if (restart || !this.state) {
        // сбросить кэш при перезагрузке уровня
        this._imagesArePreloaded = void 0;

        // При перезапуске уровня, происходит полная перезапись состояния
        // игры из изначального состояния.
        this.state = this.getInitialState();
        this.state = LevelsInitialize[this.level](this.state);
      } else {
        // При продолжении уровня состояние сохраняется, кроме записи о том,
        // что состояние уровня изменилось с паузы на продолжение игры.
        this.state.currentStatus = Verdict.CONTINUE;
      }

      // Запись времени начала игры и времени начала уровня.
      this.state.levelStartTime = Date.now();
      if (!this.state.startTime) {
        this.state.startTime = this.state.levelStartTime;
      }

      this._preloadImagesForLevel(function () {
        // Предварительная отрисовка игрового экрана.
        this.render();

        // Установка обработчиков событий.
        this._initializeGameListeners();

        // Запуск игрового цикла.
        this.update();
      }.bind(this));
    },

    /**
     * Временная остановка игры.
     * @param {Verdict=} verdict
     */
    pauseLevel: function (verdict) {
      if (verdict) {
        this.state.currentStatus = verdict;
      }

      this.state.keysPressed.ESC = false;
      this.state.lastUpdated = null;

      this._removeGameListeners();
      window.addEventListener('keydown', this._pauseListener);

      this._drawPauseScreen();
    },

    /**
     * Обработчик событий клавиатуры во время паузы.
     * @param {KeyboardsEvent} evt
     * @private
     * @private
     */
    _pauseListener: function (evt) {
      if (evt.keyCode === 32 && !this._deactivated) {
        evt.preventDefault();
        var needToRestartTheGame = this.state.currentStatus === Verdict.WIN ||
          this.state.currentStatus === Verdict.FAIL;
        this.initializeLevelAndStart(needToRestartTheGame);

        window.removeEventListener('keydown', this._pauseListener);
      }
    },

    /**
     * Отрисовка экрана паузы.
     */
    _drawPauseScreen: function () {
      var message;
      switch (this.state.currentStatus) {
        case Verdict.WIN:
          if (window.renderStatistics) {
            var statistics = this._generateStatistics(new Date() - this.state.startTime);
            var keys = this._shuffleArray(Object.keys(statistics));
            window.renderStatistics(this.ctx, keys, keys.map(function (it) {
              return statistics[it];
            }));
            return;
          }
          message = 'Вы победили Газебо!\nУра!';
          break;
        case Verdict.FAIL:
          message = 'Вы проиграли!';
          break;
        case Verdict.PAUSE:
          message = 'Игра на паузе!\nНажмите Пробел, чтобы продолжить';
          break;
        case Verdict.INTRO:
          message = 'Добро пожаловать!\nНажмите Пробел для начала игры';
          break;
      }

      this._drawMessage(message);
    },

    _generateStatistics: function (time) {
      var generationIntervalSec = 3000;
      var minTimeInSec = 1000;

      var statistic = {
        'Вы': time
      };

      for (var i = 0; i < NAMES.length; i++) {
        var diffTime = Math.random() * generationIntervalSec;
        var userTime = time + (diffTime - generationIntervalSec / 2);
        if (userTime < minTimeInSec) {
          userTime = minTimeInSec;
        }
        statistic[NAMES[i]] = userTime;
      }

      return statistic;
    },

    _shuffleArray: function (array) {
      for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
      return array;
    },

    _drawMessage: function (message) {
      var ctx = this.ctx;

      var drawCloud = function (x, y, width, heigth) {
        var offset = 10;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + offset, y + heigth / 2);
        ctx.lineTo(x, y + heigth);
        ctx.lineTo(x + width / 2, y + heigth - offset);
        ctx.lineTo(x + width, y + heigth);
        ctx.lineTo(x + width - offset, y + heigth / 2);
        ctx.lineTo(x + width, y);
        ctx.lineTo(x + width / 2, y + offset);
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.closePath();
        ctx.fill();
      };

      ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
      drawCloud(190, 40, 320, 100);

      ctx.fillStyle = 'rgba(256, 256, 256, 1.0)';
      drawCloud(180, 30, 320, 100);

      ctx.fillStyle = '#000';
      ctx.font = '16px PT Mono';
      message.split('\n').forEach(function (line, i) {
        ctx.fillText(line, 200, 80 + 20 * i);
      });
    },

    /**
     * Предзагрузка необходимых изображений для уровня.
     * @param {function} callback
     * @private
     */
    _preloadImagesForLevel: function (callback) {
      if (typeof this._imagesArePreloaded === 'undefined') {
        this._imagesArePreloaded = [];
      }

      if (this._imagesArePreloaded[this.level]) {
        callback();
        return;
      }

      var keys = Object.keys(SpriteMap);
      var imagesToGo = keys.length;

      var self = this;

      var loadSprite = function (sprite) {
        var image = new Image(sprite.width, sprite.height);
        image.onload = function () {
          sprite.image = image;
          if (--imagesToGo === 0) {
            self._imagesArePreloaded[self.level] = true;
            callback();
          }
        };
        image.src = sprite.url;
      };

      for (var i = 0; i < keys.length; i++) {
        loadSprite(SpriteMap[keys[i]]);
      }
    },

    /**
     * Обновление статуса объектов на экране. Добавляет объекты, которые должны
     * появиться, выполняет проверку поведения всех объектов и удаляет те, которые
     * должны исчезнуть.
     * @param {number} delta Время, прошеднее с отрисовки прошлого кадра.
     */
    updateObjects: function (delta) {
      // Персонаж.
      var me = this.state.objects.filter(function (object) {
        return object.type === ObjectType.ME;
      })[0];

      // Добавляет на карту файрбол по нажатию на Shift.
      if (this.state.keysPressed.SHIFT) {
        this.state.objects.push({
          direction: me.direction,
          height: window.GameConstants.Fireball.size,
          speed: window.GameConstants.Fireball.speed(!!(me.direction & Direction.LEFT)),
          sprite: SpriteMap[ObjectType.FIREBALL],
          type: ObjectType.FIREBALL,
          width: window.GameConstants.Fireball.size,
          x: me.direction & Direction.RIGHT ? me.x + me.width : me.x - window.GameConstants.Fireball.size,
          y: me.y + me.height / 2
        });

        this.state.keysPressed.SHIFT = false;
      }

      this.state.garbage = [];

      // Убирает в garbage не используемые на карте объекты.
      var remainingObjects = this.state.objects.filter(function (object) {
        ObjectsBehaviour[object.type](object, this.state, delta);

        if (object.state === ObjectState.DISPOSED) {
          this.state.garbage.push(object);
          return false;
        }

        return true;
      }, this);

      this.state.objects = remainingObjects;
    },

    /**
     * Проверка статуса текущего уровня.
     */
    checkStatus: function () {
      // Нет нужны запускать проверку, нужно ли останавливать уровень, если
      // заранее известно, что да.
      if (this.state.currentStatus !== Verdict.CONTINUE) {
        return;
      }

      if (!this.commonRules) {
        // Проверки, не зависящие от уровня, но влияющие на его состояние.
        this.commonRules = [

          /**
           * Если персонаж мертв, игра прекращается.
           * @param {Object} state
           * @return {Verdict}
           */
          function (state) {
            var me = state.objects.filter(function (object) {
              return object.type === ObjectType.ME;
            })[0];

            return me.state === ObjectState.DISPOSED ?
              Verdict.FAIL :
              Verdict.CONTINUE;
          },

          /**
           * Если нажата клавиша Esc игра ставится на паузу.
           * @param {Object} state
           * @return {Verdict}
           */
          function (state) {
            return state.keysPressed.ESC ? Verdict.PAUSE : Verdict.CONTINUE;
          },

          /**
           * Игра прекращается если игрок продолжает играть в нее два часа подряд.
           * @param {Object} state
           * @return {Verdict}
           */
          function (state) {
            return Date.now() - state.startTime > 3 * 60 * 1000 ?
              Verdict.FAIL :
              Verdict.CONTINUE;
          }
        ];
      }

      // Проверка всех правил влияющих на уровень. Запускаем цикл проверок
      // по всем универсальным проверкам и проверкам конкретного уровня.
      // Цикл продолжается до тех пор, пока какая-либо из проверок не вернет
      // любое другое состояние кроме CONTINUE или пока не пройдут все
      // проверки. После этого состояние сохраняется.
      var allChecks = this.commonRules.concat(LevelsRules[this.level]);
      var currentCheck = Verdict.CONTINUE;
      var currentRule;

      while (currentCheck === Verdict.CONTINUE && allChecks.length) {
        currentRule = allChecks.shift();
        currentCheck = currentRule(this.state);
      }

      this.state.currentStatus = currentCheck;
    },

    /**
     * Принудительная установка состояния игры. Используется для изменения
     * состояния игры от внешних условий, например, когда необходимо остановить
     * игру, если она находится вне области видимости и установить вводный
     * экран.
     * @param {Verdict} status
     */
    setGameStatus: function (status) {
      if (this.state.currentStatus !== status) {
        this.state.currentStatus = status;
      }
    },

    /**
     * Отрисовка всех объектов на экране.
     */
    render: function () {
      // Удаление всех отрисованных на странице элементов.
      this.ctx.clearRect(0, 0, WIDTH, HEIGHT);

      // Выставление всех элементов, оставшихся в this.state.objects согласно
      // их координатам и направлению.
      this.state.objects.forEach(function (object) {
        if (object.sprite) {
          var reversed = object.direction & Direction.LEFT;
          var sprite = SpriteMap[object.type + (reversed ? REVERSED : '')] || SpriteMap[object.type];
          this.ctx.drawImage(sprite.image, object.x, object.y, object.width, object.height);
        }
      }, this);
    },

    /**
     * Основной игровой цикл. Сначала проверяет состояние всех объектов игры
     * и обновляет их согласно правилам их поведения, а затем запускает
     * проверку текущего раунда. Рекурсивно продолжается до тех пор, пока
     * проверка не вернет состояние FAIL, WIN или PAUSE.
     */
    update: function () {
      if (!this.state.lastUpdated) {
        this.state.lastUpdated = Date.now();
      }

      var delta = (Date.now() - this.state.lastUpdated) / 10;
      this.updateObjects(delta);
      this.checkStatus();

      switch (this.state.currentStatus) {
        case Verdict.CONTINUE:
          this.state.lastUpdated = Date.now();
          this.render();
          requestAnimationFrame(function () {
            this.update();
          }.bind(this));
          break;

        case Verdict.WIN:
        case Verdict.FAIL:
        case Verdict.PAUSE:
        case Verdict.INTRO:
          this.pauseLevel();
          break;
      }
    },

    /**
     * @param {KeyboardEvent} evt [description]
     * @private
     */
    _onKeyDown: function (evt) {
      switch (evt.keyCode) {
        case 37:
          this.state.keysPressed.LEFT = true;
          break;
        case 39:
          this.state.keysPressed.RIGHT = true;
          break;
        case 38:
          this.state.keysPressed.UP = true;
          break;
        case 27:
          this.state.keysPressed.ESC = true;
          break;
      }

      if (evt.shiftKey) {
        this.state.keysPressed.SHIFT = true;
      }
    },

    /**
     * @param {KeyboardEvent} evt [description]
     * @private
     */
    _onKeyUp: function (evt) {
      switch (evt.keyCode) {
        case 37:
          this.state.keysPressed.LEFT = false;
          break;
        case 39:
          this.state.keysPressed.RIGHT = false;
          break;
        case 38:
          this.state.keysPressed.UP = false;
          break;
        case 27:
          this.state.keysPressed.ESC = false;
          break;
      }

      if (evt.shiftKey) {
        this.state.keysPressed.SHIFT = false;
      }
    },

    /** @private */
    _initializeGameListeners: function () {
      window.addEventListener('keydown', this._onKeyDown);
      window.addEventListener('keyup', this._onKeyUp);
    },

    /** @private */
    _removeGameListeners: function () {
      window.removeEventListener('keydown', this._onKeyDown);
      window.removeEventListener('keyup', this._onKeyUp);
    }
  };

  Game.Verdict = Verdict;

  var game = new Game(document.querySelector('.demo'));

  window.restartGame = function (wizardRightImage, wizardLeftImage) {
    SpriteMap[ObjectType.ME].url = wizardRightImage;
    SpriteMap[ObjectType.ME + REVERSED].url = wizardLeftImage;

    game.initializeLevelAndStart();
    game.setGameStatus(Verdict.INTRO);
  };

  window.restartGame('img/wizard.gif', 'img/wizard-reversed.gif');

  return game;
})();

})();

/******/ })()
;