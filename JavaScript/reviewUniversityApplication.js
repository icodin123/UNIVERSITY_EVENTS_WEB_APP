// API for managing university application review page

// HARCODED curApplication HERE TO LOAD MOCK DATA on PAGE.
// WILL UPDATE IN PHASE2 TO DEPEND ON UNIVERSITY WHOSE BUTTON IS CLICKED
let testMockApplication = mockUniverityApplications[0];
let curApplication = testMockApplication;

function accept(){
  console.log('application accepted');
  window.location.href = "adminPortalAfterUniversityAcceptance.html";
}

function deny(){
  console.log('application denied');
  window.location.href = "adminPortalInit.html";
}

function UniversityReviewManager(){

  this.loadData = function(){

    let universityName = document.querySelector('#universityName');
    let universityEmail = document.querySelector('#universityEmail');
    let universityContact = document.querySelector('#universityContact');
    let universityLetter = document.querySelector('#universityLetter');

    universityName.textContent = curApplication.name;
    universityEmail.textContent = curApplication.mailAddress;
    universityContact.textContent = curApplication.contact;
    universityLetter.textContent = curApplication.letter;

  }

  this.listenToSubmitButton = function(){

    let acceptButton = document.querySelector('#accept');
    acceptButton.addEventListener('click', accept);

    let denyButton = document.querySelector('#deny');
    denyButton.addEventListener('click', deny);

  }

}

let uniManager = new UniversityReviewManager();
window.onload = function () {
  uniManager.loadData();
  uniManager.listenToSubmitButton();
};
