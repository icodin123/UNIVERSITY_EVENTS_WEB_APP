const accepts = document.querySelectorAll('.acceptButton')
const declines = document.querySelectorAll('.declineButton')
console.log(accepts)
console.log(declines)

for(let i = 0 ; i < accepts.length ; i++){
    accepts[i].addEventListener('click', addFriend)       
}

for(let i = 0 ; i < declines.length ; i++){
    declines[i].addEventListener('click', removeRequest)   
}






// const decline = document.querySelector('#declineUser2')
// const accept = document.querySelector('#acceptUser2')
const currUserId = document.querySelector('#user_id').value
console.log(currUserId)
// const sameUser = document.querySelector('#same_user').value

// let currUser;

// // Hardcoded. Will get from DataBase in Phase 2


// function getUser(objectId){
// 	// API call for the URL for the request
//     const url = '/users/'+objectId;
//     console.log("In User Page")
//     // Since this is a GET request, simply call fetch on the URL
//     fetch(url)
//     .then((res) => { 
//         if (res.status === 200) {
//             // return a promise that resolves with the JSON body
//       	   console.log("GOT A USER")
//            return res.json() 
//        } else {
//             alert('Could not get students')
//        }                
//     })
//     .then((json) => {  // the resolved promise with the JSON body
//     	// Found the currentUser
//     	console.log(json)
//     	currUser = json
//     	renderUserInfo()
//     	return json
//     }).catch((error) => {
//         console.log(error)
//     })
// }

// getUser(currUserId)

// // Converts a list of objectIds into a list of actual users
// function getNormalList(objectList){
// 	const normalList = objectList.map(friend => {
// 		// friend is actually ObjectID, so pass as is
// 		const url = '/users/'+friend

// 		fetch(url)
// 	    .then((res) => { 
// 	        if (res.status === 200) {
// 	            // return a promise that resolves with the JSON body
// 	           return res.json() 
// 	       } else {
// 	            alert('Could not get users')
// 	       }                
// 	    })
// 	    .then((json) => {  // the resolved promise with the JSON body
// 	    	// Found the currentUser
// 	    	return json
// 	    }).catch((error) => {
// 	        log(error)
// 	    })

// 	})

// 	return normalList
// }

// function renderUserInfo(){
// 	// Rendering the profile picture
// 	document.title = currUser.firstname + " " + currUser.lastname


// 	// Adding the Name of the persojn
// 	const userName = document.querySelector('#userName')
// 	const userNameHOne = document.createElement('h1')
// 	const name = currUser.firstname + " " + currUser.lastname
// 	userNameHOne.appendChild(document.createTextNode(name))
// 	userName.appendChild(userNameHOne)

// 	// Adding number of friend
// 	const friendNum = document.querySelector('#friendNum')
// 	friendNum.appendChild(document.createTextNode(currUser.friends.length))

// 	// Adding name of university
// 	const uniName = document.querySelector('#uniName')
// 	uniName.appendChild(document.createTextNode(currUser.currentInstitution))

// 	// Adding User Bio
// 	const bioText = document.querySelector('#bioText')
// 	bioText.appendChild(document.createTextNode(currUser.bio));

// 	// Adding list of friends for this user
// 	// getFriendList implemented
// 	const friendList = getNormalList(currUser.friends);
// 	const list = document.querySelector('#listOfFriends')

// 	friendList.forEach(friend => {
// 		const element = document.createElement('li')
// 		const link = document.createElement('a')
// 		link.setAttribute('href', '/users/dashboard/' + friend._id)
// 		const img = document.createElement('img')
// 		img.setAttribute('src', "data:image/png;base64," + 
// 			btoa(String.fromCharCode.apply(null, friend.profilePic.data.data)));
// 		img.setAttribute('class', 'userPic')
// 		link.appendChild(img)
// 		element.appendChild(link)

// 		list.appendChild(element);
// 	});

// 	// Render list of events that user is attending
// 	const userAttending = document.querySelector('#userAttending')

// 	currUser.events.forEach(event => {
// 		const element = document.createElement('div');
// 		element.setAttribute('class', 'card');

// 		const img = document.createElement('img');
// 		img.setAttribute('class', 'eventPic');
// 		// MIGHT NEED TO CHANGE THIS TO WORK WITH JPG IMAGES
// 		img.setAttribute('src', "data:image/png;base64," + 
// 			btoa(String.fromCharCode.apply(null, event.pic.data.data)));

// 		const dateVenue = document.createElement('h3');
// 		dateVenue.setAttribute('class', 'emphasis heading');
// 		dateVenue.appendChild(document.createTextNode(event.date + "--" + event.location));

// 		const eventName = document.createElement('h4');
// 		eventName.setAttribute('heading');
// 		eventName.appendChild(document.createTextNode(event.eventName));

// 		const miniDesc = document.createElement('p');
// 		miniDesc.appendChild(document.createTextNode(event.miniDesc));

// 		element.appendChild(img);
// 		element.appendChild(dateVenue);
// 		element.appendChild(eventName);
// 		element.appendChild(miniDesc);

// 		userAttending.appendChild(element);

// 	});

// 	// Render Friend Requests for the user -- only if the user is same as one logged in
// 	if(sameUser === 'true'){
// 		const friendRequests = document.querySelector('#friendRequests');
// 		const requestList = getNormalList(currUser.friendRequests);

// 		requestList.forEach(user => {

// 			const element = document.createElement('div');
// 			element.setAttribute('class', 'card');

// 			const img = document.createElement('img');
// 			img.setAttribute('class', 'eventPic');
// 			// MIGHT NEED TO CHANGE THIS TO WORK WITH JPG IMAGES
// 			img.setAttribute('src', "data:image/png;base64," + 
// 				btoa(String.fromCharCode.apply(null, user.profilePic.data.data)));

// 			const name = document.createElement('h3');
// 			name.setAttribute('class', 'emphasis heading');
// 			name.appendChild(document.createTextNode(user.firstname + " " + user.lastname));

// 			const requestButtons = document.createElement('div')
// 			requestButtons.setAttribute('class', 'requestButtons')
// 			const accept = document.createElement('input')
// 			accept.setAttribute('type', 'button')
// 			accept.setAttribute('id', user._id+"-accept")
// 			accept.setAttribute('value', 'accept')
// 			accept.setAttribute('class', 'button green')

// 			const decline = document.createElement('input')
// 			decline.setAttribute('type', 'button')
// 			decline.setAttribute('id', user._id + '-decline')
// 			decline.setAttribute('value', 'decline')
// 			decline.setAttribute('class', 'button red')

// 			decline.addEventListener('click', removeRequest)
// 			accept.addEventListener('click', addFriend)

// 			requestButtons.appendChild(accpet)
// 			requestButtons.appendChild(decline)

// 			element.appendChild(img)
// 			element.appendChild(name)
// 			element.appendChild(requestButtons)	

// 			friendRequests.appendChild(element);

// 		});

// 	}
	
// }

function removeRequest(e) {
	const requestCard = e.target.parentElement.parentElement;
	const userId = e.target.getAttribute('id').split('-')[1]
	// First update the dom
	const requestContainer = document.querySelector('#friendRequests');
	requestContainer.removeChild(requestCard);
	// Then update the backend
	
	deleteFriendRequest(currUserId, userId);
}

function addFriend(e) {
	let currFriends = parseInt(document.querySelector('#friendNum').childNodes[0].nodeValue);
	document.querySelector('#friendNum').childNodes[0].nodeValue = currFriends+1;

	const userId = e.target.getAttribute('id').split('-')[1];
	const imageTag = e.target.parentElement.parentElement.firstElementChild;
	const imgSource = imageTag.getAttribute('src');

	const list = document.querySelector('#listOfFriends');

	// First Update the DOM
	const element = document.createElement('li')
	const link = document.createElement('a')
	link.setAttribute('href', '/users/dashboard/' + userId)
	const img = document.createElement('img')
	img.setAttribute('src', imgSource);
	img.setAttribute('class', 'userPic')
	link.appendChild(img)
	element.appendChild(link)

	list.appendChild(element);

	const requestCard = e.target.parentElement.parentElement;
	const requestContainer = document.querySelector('#friendRequests');
	requestContainer.removeChild(requestCard);

	if(requestContainer.children.length === 1){
		requestContainer.removeChild(requestContainer.firstElementChild);
	}

	// Now, make requests and append the backend
	updateBackendFriendList(userId, currUserId);
}

// curr, other are both objectIDs
function deleteFriendRequest(curr, other){
	const url = '/users/deleteRequest';

    // The data we are going to send in our request
    let data = {
        original: curr,
        other: other
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
            console.log('Request Was deleted')
           
        } else {
            // If server couldn't add the student, tell the user.
            // Here we are adding a generic message, but you could be more specific in your app.
            console.log("FAIL Response was: ")
            console.log(res)
        }
    }).catch((error) => {
        console.log(error)
    })

}


// userOne and userTwo refer to objectId's of the two users
function updateBackendFriendList(userOne, userTwo){
	// Need to add friends to the user
	const url = '/users/addFriend';


    // The data we are going to send in our request
    let data = {
        userOne: userOne,
        userTwo: userTwo
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
    .then((res) => {
        if (res.status === 200) {
            // Now, added userOne to userTwo's friend list
            // Do the opposite now
            data = {
            	userOne: userTwo,
            	userTwo: userOne
            }

            const request = new Request(url, {
		        method: 'post', 
		        body: JSON.stringify(data),
		        headers: {
		            'Accept': 'application/json, text/plain, */*',
		            'Content-Type': 'application/json'
		        },
		    });

		    fetch(request)
		    .then(res2 => {
		    	if(res2.status === 200){
		    		// Sucessfully added both users to each other's friend list. Now, delete
		    		// the friend request
		    		deleteFriendRequest(userTwo, userOne)
		    	}
		    }).catch(err => {
		    	console.log(error)
		    })
       
        } else {
            // If server couldn't add the student, tell the user.
            // Here we are adding a generic message, but you could be more specific in your app.
            console.log("FAIL Response was: ")
            console.log(res)
        }
    }).catch((error) => {
        console.log(error)
    })
}
