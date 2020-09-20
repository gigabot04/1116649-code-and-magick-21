'use strict';

const CLOUD_WIDTH = 420;
const CLOUD_HEIGHT = 270;
const CLOUD_X = 100;
const CLOUD_Y = 10;
const COLUMN_DIST = 50;
const COLUMN_WIDTH = 40;
const COLUMN_HEIGHT_STAT = 150;
const GAP = 10;
const TEXT_HEIGHT = 15;
const Saturate = ['hsl(240, 20%, 50%)', 'hsl(240, 50%, 50%)', 'hsl(240, 70%, 50%)', 'hsl(240, 100%, 50%)'];

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
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура вы победили!', CLOUD_X + (GAP * 2), CLOUD_Y + (GAP * 2));
  ctx.fillText('Список результатов:', CLOUD_X + (GAP * 2), CLOUD_Y + (GAP * 2) + TEXT_HEIGHT);

  const maxTime = getMaxElement(times);

  for (let i = 0; i < players.length; i++) {
    ctx.fillStyle = '#000';
    ctx.fillText(
      players[i],
      CLOUD_X + COLUMN_DIST + (COLUMN_WIDTH + COLUMN_DIST) * i,
      CLOUD_HEIGHT - GAP
    );

    if (players[i] === 'Вы' ) {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = Saturate[i];
    };

    const ColumnHeight = (COLUMN_HEIGHT_STAT * times[i]) / maxTime;

    ctx.fillRect(
      CLOUD_X + COLUMN_DIST + (COLUMN_WIDTH + COLUMN_DIST) * i,
      CLOUD_HEIGHT - ColumnHeight - GAP - TEXT_HEIGHT,
      COLUMN_WIDTH,
      ColumnHeight
    );

    ctx.fillStyle = '#000';

    ctx.fillText(
      times[i].toFixed(),
      CLOUD_X + COLUMN_DIST + (COLUMN_WIDTH + COLUMN_DIST) * i,
      CLOUD_HEIGHT - ColumnHeight - ((GAP + TEXT_HEIGHT) * 2)
    );
  }
};
