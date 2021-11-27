


/**
	JS file to load data after deleting account of Jason Bourne ("user2")
*/
// create instance of object for managing UI on admin portal
let adminPortal = new AdminPortal();

// after window finished loading
window.onload = function () {

  /**
	Loading hardcoded array of updated users and array of university applications.
	In phase2, data will be loaded from a database
  */
  adminPortal.addUsersAll(users);
  adminPortal.addUniversitiesAll(mockUniverityApplications);

  logoutButton = document.querySelector('#logout');
  logoutButton.addEventListener('click', logOut);
};
