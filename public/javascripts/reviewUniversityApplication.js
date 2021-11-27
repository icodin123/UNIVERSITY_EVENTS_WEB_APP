// API for managing university application review page

// HARCODED curApplication HERE TO LOAD MOCK DATA on PAGE.
// WILL UPDATE IN PHASE2 TO DEPEND ON UNIVERSITY WHOSE BUTTON IS CLICKED
let testMockApplication = mockUniverityApplications[0];
let curApplication = testMockApplication;


function UniversityReviewManager(){

  this.loadData = function(json){

    let universityName = document.querySelector('#universityName');
    let universityEmail = document.querySelector('#universityEmail');
    let universityContact = document.querySelector('#universityContact');
    let universityLetter = document.querySelector('#universityLetter');

    console.log(json)
    console.log(json.name)

    universityName.textContent = json.name;
    universityEmail.textContent = json.mailAddress;
    universityContact.textContent = json.contact;
    universityLetter.textContent = json.letter;

  }

  this.listenToSubmitButton = function(){

    let acceptButton = document.querySelector('#accept');
    acceptButton.addEventListener('click', accept);

    let denyButton = document.querySelector('#deny');
    denyButton.addEventListener('click', deny);

  }
}


function getUniversityApplication(id){
	// API call for the URL for the request
    const url = '/universityApplications/' + id;

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
      let uniManager = new UniversityReviewManager();
      uniManager.loadData(json);
      uniManager.listenToSubmitButton();
    }).catch((error) => {
        return null;
    })
}

// after window finished loading
window.onload = function () {
  const uniId = document.querySelector('#university_id').value;
  getUniversityApplication(uniId);
};
