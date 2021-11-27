// API managing admin portal UI


// switch to a different page after user clicked log out button
function logOut(){
  console.log('log out');
  window.location.href = "../HTML/adminPortalLogin.html";
}

let logoutButton = null;

// transition to a page for editing users after user was clicked
function editUser(e){
  window.location.href = "/admin/editUser/" + e.target.id;
}

// transition to page for reviewing university application information after
// university was clicked
function reviewUniversity(e){
  let evntUI = e.target.parentNode;
  let index = Array.from(evntUI.parentNode.children
  ).indexOf(evntUI) / 2 - 1;
  console.log('reviewing university application at index: '  + index);
  window.location.href = "/admin/reviewUniversity/" + e.target.id;
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
    for(num in arr){
      this.addUser(arr[num]);
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
    usernameText.textContent = user.firstname + ' ' + user.lastname;
    if(user.isEventOrganizer){
      atText.textContent = 'event organizer';
    }
    else{
      atText.textContent = 'attendee';
    }

    icon.id = user._id

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
    for(num in arr){
      this.addUniversity(arr[num]);
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

    icon.id = university._id

    icon.addEventListener('click', reviewUniversity);
    adminTabEntry.appendChild(usernameText);
    adminTabEntry.appendChild(icon);
    universityPanel.appendChild(document.createElement('br'));
    universityPanel.appendChild(adminTabEntry);
    this.universityCount++;
  }
}


function getUsers(){
	// API call for the URL for the request
    const url = '/users/';

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
    	// Found the currentUser
        adminPortal = new AdminPortal()
        adminPortal.addUsersAll(json)
    }).catch((error) => {
        return null;
    })
}


function getUniversityApplications(){
	// API call for the URL for the request
    const url = '/universityApplications/';

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
    	// Found the currentUser
      adminPortal = new AdminPortal()
      adminPortal.addUniversitiesAll(json);
    }).catch((error) => {
        return null;
    })
}


// after window finished loading
window.onload = function () {

  getUsers();
  getUniversityApplications();

  logoutButton = document.querySelector('#logout');
  logoutButton.addEventListener('click', logOut);
};
