// API for managing accounts on admin adminPortal

// provides functionality for getting information from input form when
// log in or sign up buttons are clicked
function AccountManager(){

  this.addListeners = function(){

    let logInButton = document.querySelector('#login_button');
    let backButton = document.querySelector('#back_button');

    logInButton.addEventListener('click', this.logIn);
    backButton.addEventListener('click', this.logIn);

  }

  // process data from input fields after user clicked login button
  this.logIn = function(e){

    if(e.target.id == 'login_button'){

      let usernameField = document.querySelector('#username_input');
      let passwordField = document.querySelector('#password_input');

      // code below requires server call
      // we will need to load data from server to verify correctness of
      // username and password entered by admin

      if(usernameField.value === 'admin' &&
      passwordField.value === 'admin'){
        console.log('login successful');
        window.location.href = "adminPortalInit.html";
      }
      else{
        console.log('username: admin, password: admin');
      }
    }else if(e.target.id == 'back_button'){
      window.location.href = '../index.html';
    }

  }
}

let accountManager = new AccountManager();
// after window finished loading
window.onload = function () {

  accountManager.addListeners();

};
