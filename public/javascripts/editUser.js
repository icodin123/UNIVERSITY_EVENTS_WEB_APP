// API for editing users through admin portal


// provides functionality for loading user info and adding listeners to buttons
function UserEditor(){

  // load all the info for current user
  this.loadUserInfo = function(json){

    let firstNameInputField = document.querySelector('#firstNameInputField');
    let lastNameInputField = document.querySelector('#lastNameInputField');
    let usernameInputField = document.querySelector('#usernameInputField');
    let universityNameInputField = document.querySelector(
      '#universityNameInputField');

    let isEventOrganizerInputField = document.querySelector(
      '#isEventOrganizerInputField');

    let emailInputField = document.querySelector('#emailInputField');

    firstNameInputField.placeholder = json.firstname;

    lastNameInputField.placeholder = json.lastname;

    usernameInputField.placeholder = json.username;

    universityNameInputField.placeholder = json.currentInstitution;

    emailInputField.placeholder = json.email;

  }

}

function getUserForEditing(id){
	// API call for the URL for the request
    const url = '/users/' + id;

    // Since this is a GET request, simply call fetch on the URL
    fetch(url)
    .then((res) => {
        if (res.status === 200) {
            // return a promise that resolves with the JSON body
           return res.json()
       } else {
            return null;
       }
    })
    .then((json) => {  // the resolved promise with the JSON body
      user_editor = new UserEditor();
      user_editor.loadUserInfo(json);
    }).catch((error) => {
        return null;
    })
}

window.onload = function () {
  const userId = document.querySelector('#user_id').value;
  getUserForEditing(userId);
};
