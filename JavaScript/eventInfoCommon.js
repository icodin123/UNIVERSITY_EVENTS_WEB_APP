// API for displaying event information

// transition to event registration page
function getTickets(){
  window.location.href = "eventRegistration.html";
}


// provides functionality for generating UI for events based on data
function eventDataManager(){

  this.setup = function(){
    let ticketsButton = document.querySelector('#ticketsButton');
    ticketsButton.addEventListener('click', getTickets);
  }

  this.loadEventData = function(neededEvent){

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

    let eventByText = document.querySelector('#eventBy');
    eventByText.textContent = 'By: ' + neededEvent.by;

    let eventOrganizersText = document.querySelector('#eventOrganizers');
    eventOrganizersText.textContent = 'Organizer: ' + neededEvent.organizerName;

  }

}
