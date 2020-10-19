'use strict';

{
  const DEBOUNCE_INTERVAL = 500; // ms

  let lastTimeout;
  const timeout = (cb) => {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(cb, DEBOUNCE_INTERVAL);
  };
  window.debounce = {
    timeout
  };
}