// API for editing users through admin portal

// user that is used for tests
// THIS USER IS HARDCODED HERE. IN PHASE2, IT WILL DEPEND ON WHICH USER'S "PENCIL"
// ICON IS CLICKED ON THE DASHBOARD
let testUser = users[1];

function saveUser(){
  console.log('saving user');
}

function deleteUser(){
  alert('User deleted');
  window.location.href = '../HTML/adminPortalDeleted.html'
}

// provides functionality for loading user info and adding listeners to buttons
function UserEditor(){

  // load all the info for current user
  this.loadUserInfo = function(){

    let firstNameInputField = document.querySelector('#firstNameInputField');
    let lastNameInputField = document.querySelector('#lastNameInputField');
    let usernameInputField = document.querySelector('#usernameInputField');
    let universityNameInputField = document.querySelector(
      '#universityNameInputField');
    let isEventOrganizerInputField = document.querySelector(
      '#isEventOrganizerInputField');
    let emailInputField = document.querySelector('#emailInputField');

    firstNameInputField.placeholder = testUser.firstName;
    lastNameInputField.placeholder = testUser.lastName;
    usernameInputField.placeholder = testUser.username;
    universityNameInputField.placeholder = testUser.university.name;
    isEventOrganizerInputField.placeholder = testUser.isEventOrganizer;
    emailInputField.placeholder = testUser.mailAddress;

  }

  // add listeners to buttons
  this.startListening = function(){

    let saveButton = document.querySelector('#apply');
    let deleteButton = document.querySelector('#delete');

    saveButton.addEventListener('click', saveUser);
    deleteButton.addEventListener('click', deleteUser);

  }

}

// create instance for saving managing UI for edit user page
let userEditor = new UserEditor();
window.onload = function () {
  userEditor.loadUserInfo();
  userEditor.startListening();
};
