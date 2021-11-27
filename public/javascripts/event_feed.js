// API for adding and removing events from event feed




// operate on UI to reflect the change that happened to accepted event
// invitation
function acceptInvitation(e){
  let evntUI = e.target.parentNode.parentNode;
  evntUI.parentNode.removeChild(evntUI);
  let invitationsText = document.querySelector('#eventInvitesCounter');
  let newCount = parseInt(invitationsText.textContent) + 1;
  invitationsText.textContent = newCount.toString();
}

// operate on UI to reflect the change that happened to denied event
// invitation
function denyInvitation(e){
  let evntUI = e.target.parentNode.parentNode;
  evntUI.parentNode.removeChild(evntUI);
  let invitationsText = document.querySelector('#eventInvitesCounter');
  let newCount = parseInt(invitationsText.textContent) - 1;
  invitationsText.textContent = newCount.toString();
}

this.getMoreEventInfo = function(){
   // empty
}

// function addEventInvitation(eventInvitation){
//   const permissionRequests = document.querySelector('#permissionRequests');
//   let sideEventPost = document.createElement('div');
//   sideEventPost.className = 'sideEventPost';
//   let nameText = document.createElement('strong');
//   nameText.textContent = (eventInvitation.user.firstName + ' '
//   + eventInvitation.user.lastName);
//   let extraInfoText = document.createTextNode('');
//   sideEventPost.appendChild(nameText);
//   sideEventPost.appendChild(extraInfoText);
//   sideEventPost.appendChild(document.createElement('br'));
//
//   let contactPermissionButtons = document.createElement('div');
//   contactPermissionButtons.className = 'contactPermissionButtons';
//   let button1 = document.createElement('button');
//   let button2 = document.createElement('button');
//   button1.className = 'acceptButton';
//   button2.className = 'denyButton';
//
//   button1.textContent = 'Accept';
//   button2.textContent = 'Deny';
//
//   button1.addEventListener('click', this.acceptInvitation);
//   button2.addEventListener('click', this.denyInvitation);
//
//   contactPermissionButtons.appendChild(button1);
//   contactPermissionButtons.appendChild(button2);
//
//   sideEventPost.appendChild(contactPermissionButtons);
//   sideEventPost.appendChild(document.createElement('br'));
//   sideEventPost.appendChild(document.createElement('br'));
//
//   let sideEventDescText = document.createElement('span');
//   sideEventDescText.className = 'sideEventDescText';
//   sideEventDescText.textContent = (eventInvitation.user.firstName +
//     ' invited you to ' + eventInvitation.evnt.eventName);
//   sideEventPost.appendChild(sideEventDescText);
//
//   permissionRequests.appendChild(sideEventPost);
//
//   this.eventInvitationsTotal++;
//   this.setEventInvitationsNum();
// }


function setEventsComingUp(eventsAttentingNum){
  let eventCounter = document.querySelector("#eventsCount");
  eventCounter.textContent = eventsAttentingNum;
}

function setEventInvitationsNum(invitationsNum){
  let invitationCounter = document.querySelector("#eventInvitesCounter");
  invitationCounter.textContent = (invitationsNum +
  ' event invites');
}


// // create UI for event invitations
// function addEventInvitationsAll(invitations){
//   console.log("event invitations called")
//   console.log(invitations)
//
//   invitations = [{to: "0", from: "0", event: ""},
//   {to: "0", from: "0", event: ""}]
//
//   let invitationsCount = 0;
//    for(num in invitations){
//      invitationsCount++;
//      console.log(invitations[num])
//      addEventInvitation(invitations[num])
//    }
//    setEventInvitationsNum(invitationsCount);
//    setEventsComingUp(user.eventsAttending.length);
// }


function showEventInfo(e){
  //window.location.href = "eventInfoDefault.html";
  window.location.href = "/event/" + e.target.id;
}


function createEventUI(givenEvent){

  let timeline = document.querySelector("#timeline");
  let eventPost = document.createElement('div');

  let eventImg = document.createElement('img');
  let eventPostContent = document.createElement('div');
  let eventPostTitle = document.createElement('div');

  let eventPostingInfoBar = document.createElement('div');
  let moreInfoButtonDiv = document.createElement('div');
  let moreInfoButton = document.createElement('button');

  let eventAttendiesText = document.createElement('div');
  let attendiesText = document.createElement('strong');

  moreInfoButton.addEventListener('click', showEventInfo);

  eventPost.className = 'eventPost';

  let attending = '';

  attendiesText.textContent = attending;
  eventAttendiesText.appendChild(attendiesText);
  eventAttendiesText.className = 'eventAttendiesText';

  moreInfoButton.id = givenEvent._id;

  moreInfoButton.textContent = 'more info';
  moreInfoButtonDiv.className = 'moreInfoButton';
  moreInfoButtonDiv.appendChild(moreInfoButton);

  eventPostingInfoBar.className = 'eventPostingInfoBar';
  eventPostingInfoBar.appendChild(moreInfoButtonDiv);
  eventPostingInfoBar.appendChild(eventAttendiesText);

  eventPostContent.className = 'eventPostContent';

  eventPostTitle.className = 'eventPostTitle';
  let eventName = document.createElement('strong');

  eventName.textContent = 'Event name: ' + givenEvent.eventName;

  eventPostTitle.appendChild(eventName);
  eventPostContent.appendChild(eventPostTitle);

  let eventDescText = document.createTextNode(givenEvent.description);

  eventPostContent.appendChild(eventDescText);
  eventPostContent.appendChild(document.createElement('br'));
  eventPostContent.appendChild(document.createElement('br'));
  eventPostContent.appendChild(eventPostingInfoBar);

  eventImg.className = 'eventPostImg';

  // var b64encoded = btoa(String.fromCharCode.apply(null, givenEvent.pic.data.data));

  // if(givenEvent.pic){
  //     eventImg.src = 'data:' + 'img/jpg' + ';base64,' + givenEvent.pic.data.data.toString('base64');
  // }
  // else{
  //   eventImg.src = '../images/UofThacks.png'
  // }

  eventPost.appendChild(eventImg);
  eventPost.appendChild(eventPostContent);
  console.log("done create Event");
  timeline.appendChild(eventPost);
  return ;

  //this.eventCount++;

  //this.setEventsComingUp();
}


// create UI instances for all events for current user
function createEventUIAll(json){
  for(num in json){
    console.log("in loop");
    createEventUI(json[num]);
  }

}


function getEventsForCurrentUser(user, university){
	// API call for the URL for the request


  const url = '/events/university';

  //console.log(url)

    // The data we are going to send in our request
    let data = {
        name: university.name
    }
    // Create our request constructor with all the parameters we need
    const request = new Request(url, {
        method: 'post',
        body: JSON.stringify(data),
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
    });

    // Send the request with fetch()
    fetch(request)
    .then(function(res) {

        if (res.status === 200) {
            // If student was added successfully, tell the user.
            return res.json()

        } else {
            // If server couldn't add the student, tell the user.
            // Here we are adding a generic message, but you could be more specific in your app.
            console.log("FAIL Response was: ")
            console.log(res)
        }
    }).then((json) => {  // the resolved promise with the JSON body
      console.log(json);
      createEventUIAll(json);

    }).catch((error) => {
      return null;
    })
}


function getUniversityForCurrentUser(user){

  const url = '/universities/one';

    // The data we are going to send in our request
    let data = {
        name: user.currentInstitution
    }
    // Create our request constructor with all the parameters we need
    const request = new Request(url, {
        method: 'post',
        body: JSON.stringify(data),
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
    });

    // Send the request with fetch()
    fetch(request)
    .then(function(res) {
        if (res.status === 200) {
            // If student was added successfully, tell the user.
            return res.json()

        } else {
            // If server couldn't add the student, tell the user.
            // Here we are adding a generic message, but you could be more specific in your app.
            console.log("FAIL Response was: ")
            console.log(res)
        }
    }).then((json) => {  // the resolved promise with the JSON body
      getEventsForCurrentUser(user, json)

    }).catch((error) => {
      return null;
    })
}


function getCurrentUser(id){
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
        getUniversityForCurrentUser(json)
        //addEventInvitationsAll(json.eventInvites);

    }).catch((error) => {
        return null;
    })
}


window.onload = function () {

  let acceptButtons = document.querySelectorAll('.acceptButton');
  let denyButtons = document.querySelectorAll('.denyButton');

  for(let i = 0; i < acceptButtons.length; i++){
    acceptButtons[i].addEventListener('click', acceptInvitation);
  }

  for(let i = 0; i < denyButtons.length; i++){
    denyButtons[i].addEventListener('click', denyInvitation);
  }

  const user_id = document.querySelector('#user_id').value;
  if(!user_id){
    console.log("not logged in");
    return;
  }
  getCurrentUser(user_id);
};
