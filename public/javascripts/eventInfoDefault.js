let eventManager = new eventDataManager();
window.onload = function () {
  eventManager.setup();
  // currentEvent HARDCODED FOR PHASE1. WILL USE DATABASE IN PHASE2
  eventManager.loadEventData(currentEvent);
};
