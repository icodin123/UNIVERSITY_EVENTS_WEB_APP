// API for managing university application page

// go to page that notifies user of sucess after submit button is clicked
function submit(){
  console.log('application successfully sent');
  window.location.href = "applicationSuccess.html";
}


// after window is loaded
window.onload = function () {
  let submitButton = document.querySelector('#apply');
  submitButton.addEventListener('click', submit);
};
