// button that is clicked for saving
const save = document.querySelector('#apply');
// button that is clicked for returning to previous page
const back = document.querySelector('#back');

// transition to final Waterloo page after save button has been clicked
save.addEventListener('click', e => window.location.href = '../HTML/waterlooFinal.html');
// transition to initial page for Waterloo if 'back' button has been clicked
back.addEventListener('click', e => window.location.href = '../HTML/waterlooInit.html');
