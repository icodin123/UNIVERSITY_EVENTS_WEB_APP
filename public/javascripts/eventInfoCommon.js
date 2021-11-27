

function loadBy(event){

  const url = '/users/' + event.by;
  // Since this is a GET request, simply call fetch on the URL
  fetch(url)
  .then((res) => {
      if (res.status === 200) {
          // return a promise that resolves with the JSON body
         return res.json()
     } else {
          alert('Could not retrieve name of the organizer')
     }
  })
  .then((json) => {  // the resolved promise with the JSON body
    // Found the currentUser
    let eventDataManager = new EventDataManager();
    eventDataManager.setup();
    eventDataManager.loadEventData(event, json);

  }).catch((error) => {
      console.log(error)
  })

}

function loadEvent(eventId){
    const url = '/events/' + eventId;
    console.log(url);
    // Since this is a GET request, simply call fetch on the URL
    fetch(url)
    .then((res) => {
        if (res.status === 200) {
            // return a promise that resolves with the JSON body
           return res.json()
       } else {
            alert('Could not get event with id')
       }
    })
    .then((json) => {  // the resolved promise with the JSON body
      // Found the currentUser
      loadBy(json);

    }).catch((error) => {
        console.log(error)
    })
}

// transition to event registration page
function getTickets(){
  window.location.href = "/events/getTickets/";
}


// provides functionality for generating UI for events based on data
function EventDataManager(){

  this.setup = function(){
    let ticketsButton = document.querySelector('#ticketsButton');
    ticketsButton.addEventListener('click', getTickets);
  }

  this.loadEventData = function(neededEvent, by){

    /**-------------------------- HARDCODED DATA ---------------------------
      Information about the event here is hardcoded. In Phase 2, this is will be
      retrived from the BACKEND using database. Here, data retrived from the hardcoded mock events
    */
    let eventNameText = document.querySelector('#eventTitle');
    eventNameText.textContent = 'Event name: ' + neededEvent.eventName;

    let descText = document.querySelector('#description');
    descText.textContent = neededEvent.description;

    let dateText = document.querySelector('#eventDate');
    dateText.textContent = 'Date: ' + neededEvent.date;

    let locationText = document.querySelector('#eventLocation');
    locationText.textContent = 'Location: ' + neededEvent.location;

    let eventTimeText = document.querySelector('#eventTime');
    eventTimeText.textContent = 'Time: ' + neededEvent.time + ' - ' + neededEvent.endTime;

    let seatingInfoText = document.querySelector('#seatingInfoText');
    console.log(neededEvent.reserved)
    seatingInfoText.innerText = neededEvent.reserved + ' / ' + neededEvent.capacity;

    let eventByText = document.querySelector('#eventBy');
    if(!by){
      by = "could not retrieve"
    }
    eventByText.textContent = 'By: ' + by.username;

  }
}



window.onload = function () {
  const event_id = document.querySelector('#event_id').value;
  if(!event_id){
    console.log("not logged in");
    return;
  }
  loadEvent(event_id);




};
