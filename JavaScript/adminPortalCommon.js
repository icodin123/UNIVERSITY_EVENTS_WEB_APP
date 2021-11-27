// API managing admin portal UI

// switch to a different page after user clicked log out button
function logOut(){
  console.log('log out');
  window.location.href = "../HTML/adminPortalLogin.html";
}

let logoutButton = null;


// transition to a page for editing users after user was clicked
function editUser(e){
  let evntUI = e.target.parentNode;
  let index = Array.from(evntUI.parentNode.children
  ).indexOf(evntUI) / 2 - 1;
  console.log('editing user at index: ' + index);
  window.location.href = "editUserPage.html";
}


// transition to page for reviewing university application information after
// university was clicked
function reviewUniversity(e){
  let evntUI = e.target.parentNode;
  let index = Array.from(evntUI.parentNode.children
  ).indexOf(evntUI) / 2 - 1;
  console.log('reviewing university application at index: '  + index);
  window.location.href = "reviewUniversityApplicationPage.html";
}

// code below requires server call
// users and university applications need to be loaded from database before
// array of user data can be passed to addUsersAll and before array of
// university application data can be passed to addUniversitiesAll

// provides functionality for generating UI for admin portal based on data
function AdminPortal(){

  this.userCount = 0;
  this.universityCount = 0;


  // add new UI to admin portal based on data in the provided array arr that
  // contains data for users
  this.addUsersAll = function(arr){
    for(let i = 0; i < arr.length; i++){
      this.addUser(arr[i]);
    }
  }


  // add new user to UI of admin portal based on data for given user
  this.addUser = function(user){

    let userPanel = document.querySelector('#userPanel');

    let adminTabEntry = document.createElement('div');
    adminTabEntry.className = 'adminTabEntry';

    let usernameText = document.createElement('span');
    let atText = document.createElement('span');
    let icon = document.createElement('img');

    usernameText.textContent = user.firstName + ' ' + user.lastName;

    if(user.isEventOrganizer){
      atText.textContent = 'event organizer';
    }
    else{
      atText.textContent = 'attendee';
    }

    usernameText.className = 'adminTabEntryTitle';
    atText.className = 'adminTabEntryStatus'

    icon.className = 'editUserButton';
    icon.src = '../Images/th.jpeg';
    icon.addEventListener('click', editUser);

    adminTabEntry.appendChild(usernameText);
    adminTabEntry.appendChild(atText);
    adminTabEntry.appendChild(icon);

    userPanel.appendChild(document.createElement('br'));

    userPanel.appendChild(adminTabEntry);

    this.userCount++;

  }


  // add new UI to admin portal based on data in the provided array arr that
  // contains data for university applications
  this.addUniversitiesAll = function(arr){
    for(let i = 0; i < arr.length; i++){
      let uni = new University(arr[i].name, "abc", "abc", "abc", "abc");
      this.addUniversity(uni);
    }
  }


  // add new university application to UI of admin portal based on data for
  // given university
  this.addUniversity = function(university){

    let universityPanel = document.querySelector('#universityPanel');

    let adminTabEntry = document.createElement('div');
    adminTabEntry.className = 'adminTabEntry';

    let usernameText = document.createElement('span');

    let icon = document.createElement('img');

    usernameText.textContent = university.name;

    usernameText.className = 'adminTabEntryTitle';

    icon.className = 'editButton';
    icon.src = '../Images/search.jpg';
    icon.addEventListener('click', reviewUniversity);

    adminTabEntry.appendChild(usernameText);
    adminTabEntry.appendChild(icon);

    universityPanel.appendChild(document.createElement('br'));

    universityPanel.appendChild(adminTabEntry);

    this.universityCount++;

  }

}
