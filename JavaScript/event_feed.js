// API for adding and removing events from event feed

function showEventInfo(e){
  window.location.href = "eventInfoDefault.html";
}

// provides functionality for creating UI for event suggestions for given user
function eventMakerUI(givenUser){

  this.eventCount = 0;
  this.currentUser = givenUser;
  this.eventInvitationsTotal = 0;

  // create UI instances for all events for current user
  this.createEventUIAll = function(){

    for(let i = 0; i < this.currentUser.interestingEvents.length; i++){
        this.createEventUI(this.currentUser.interestingEvents[i]);
    }
  }

  this.setEventsComingUp = function(){
    let eventCounter = document.querySelector("#eventsCount");
    eventCounter.textContent = this.eventCount;
  }

  this.setEventInvitationsNum = function(){
    let invitationCounter = document.querySelector("#eventInvitesCounter");
    invitationCounter.textContent = (this.eventInvitationsTotal +
    ' event invites');
  }

  // create UI for a specific given event
  this.createEventUI = function(givenEvent){
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
    let friendCount = 0;

    for(let n = 0; n < this.currentUser.friends.length; n++){
      if(this.currentUser.friends[n].events.includes(givenEvent)){
        if(attending != ''){
          attending += ', ';
        }
        attending += (this.currentUser.friends[n].firstName + ' ' +
        this.currentUser.friends[n].lastName);
        friendCount++;
      }
    }

    if(attending == ''){
      attending += 'no friends';
    }

    if(friendCount != 1){
      attending += ' are attending';
    }
    else{
      attending += ' is attending';
    }

    attendiesText.textContent = attending;
    eventAttendiesText.appendChild(attendiesText);
    eventAttendiesText.className = 'eventAttendiesText';

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
    eventImg.src = '../Images/UofThacks.png';

    eventPost.appendChild(eventImg);
    eventPost.appendChild(eventPostContent);

    timeline.appendChild(eventPost);

    this.eventCount++;

    this.setEventsComingUp();
  }

  // create UI for event invitations
  this.addEventInvitationsAll = function(){
     for(let i = 0; i < this.currentUser.eventInvites.length; i++){
       this.addEventInvitation(this.currentUser.eventInvites[i]);
     }
  }

  // operate on UI to reflect the change that happened to accepted event
  // invitation
  this.acceptInvitation = function(e){
    if(eventMaker.currentUser == null){
      console.log('curren user is null');
      return;
    }
    let evntUI = e.target.parentNode.parentNode;
    eventMaker.currentUser.acceptInvitation(
      Array.from(evntUI.parentNode.children
    ).indexOf(evntUI));
    evntUI.parentNode.removeChild(evntUI);
    eventMaker.eventInvitationsTotal--;
    eventMaker.setEventInvitationsNum();
  }

  // operate on UI to reflect the change that happened to denied event
  // invitation
  this.denyInvitation = function(e){
    if(eventMaker.currentUser == null){
      console.log('curren user is null');
      return;
    }
    let evntUI = e.target.parentNode.parentNode;
    eventMaker.currentUser.denyInvitation(Array.from(evntUI.parentNode.children
    ).indexOf(evntUI));
    evntUI.parentNode.removeChild(evntUI);
    eventMaker.eventInvitationsTotal--;
    eventMaker.setEventInvitationsNum();
  }

  this.getMoreEventInfo = function(){
     // empty
  }

  this.addEventInvitation = function(eventInvitation){
    const permissionRequests = document.querySelector('#permissionRequests');
    let sideEventPost = document.createElement('div');
    sideEventPost.className = 'sideEventPost';
    let nameText = document.createElement('strong');
    nameText.textContent = (eventInvitation.user.firstName + ' '
    + eventInvitation.user.lastName);
    let extraInfoText = document.createTextNode('');
    sideEventPost.appendChild(nameText);
    sideEventPost.appendChild(extraInfoText);
    sideEventPost.appendChild(document.createElement('br'));

    let contactPermissionButtons = document.createElement('div');
    contactPermissionButtons.className = 'contactPermissionButtons';
    let button1 = document.createElement('button');
    let button2 = document.createElement('button');
    button1.className = 'acceptButton';
    button2.className = 'denyButton';

    button1.textContent = 'Accept';
    button2.textContent = 'Deny';

    button1.addEventListener('click', this.acceptInvitation);
    button2.addEventListener('click', this.denyInvitation);

    contactPermissionButtons.appendChild(button1);
    contactPermissionButtons.appendChild(button2);

    sideEventPost.appendChild(contactPermissionButtons);
    sideEventPost.appendChild(document.createElement('br'));
    sideEventPost.appendChild(document.createElement('br'));

    let sideEventDescText = document.createElement('span');
    sideEventDescText.className = 'sideEventDescText';
    sideEventDescText.textContent = (eventInvitation.user.firstName +
      ' invited you to ' + eventInvitation.evnt.eventName);
    sideEventPost.appendChild(sideEventDescText);

    permissionRequests.appendChild(sideEventPost);

    this.eventInvitationsTotal++;
    this.setEventInvitationsNum();
  }

}

// instantiate object for managing events UI
//userStepOne IS PASSED AS HARDCODED USER. WILL CHANGE TO DEPEND ON WHAT USER IS LOGGED IN
// IN PHASE2 (WHEN BACKEND WILL BE USED TO RETRIEVE THIS INFORMATION)
let eventMaker = new eventMakerUI(userStepOne);
window.onload = function () {
  eventMaker.setEventInvitationsNum();
  eventMaker.setEventsComingUp();
  // HARDCODING THE mockEvents (in data_repository) FOR PHASE1
  // WILL USE DATABASE TO RETRIEVE EVENTS IN PHASE2
  eventMaker.createEventUIAll(mockEvents);
  eventMaker.addEventInvitationsAll();
};
