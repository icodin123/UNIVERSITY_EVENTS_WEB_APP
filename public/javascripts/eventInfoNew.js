const organizerId = document.querySelector('#organizer_id').value

// Get the name of the organizer organizing the event
// from their object-Id
const loadOrganizer = function () {
	// API call for the URL for the request
    const url = '/users/'+organizerId;
    // Since this is a GET request, simply call fetch on the URL
    fetch(url)
    .then((res) => { 
        if (res.status === 200) {
            // return a promise that resolves with the JSON body
           return res.json() 
       } else {
            alert('Could not get students')
       }                
    })
    .then((json) => {  // the resolved promise with the JSON body
    	// Found the currentUser
    	const eventOrganizers = document.querySelector('#eventOrganizers')
    	eventOrganizers.appendChild(document.createTextNode(json.firstname + " " + json.lastname))
    	return json
    }).catch((error) => {
        console.log(error)
    })
};

loadOrganizer()

