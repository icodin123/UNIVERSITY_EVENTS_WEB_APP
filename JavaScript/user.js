
const decline = document.querySelector('#declineUser2')
const accept = document.querySelector('#acceptUser2')

decline.addEventListener('click', removeRequest)
accept.addEventListener('click', addFriend)

// Hardcoded. Will get from DataBase in Phase 2
const currUser = users[0];

function removeRequest(e) {
	const requestCard = e.target.parentElement.parentElement;
	const requestContainer = document.querySelector('#friendRequests');
	requestContainer.removeChild(requestCard);
	currUser.friendRequests.pop();
}

function addFriend(e) {
	// Adding hardcoded data. Will make DataBase operations in phase 2
	const friend = currUser.friendRequests.pop();
	currUser.friends.push(friend);

	let currFriends = parseInt(document.querySelector('#friendNum').childNodes[0].nodeValue);
	document.querySelector('#friendNum').childNodes[0].nodeValue = currFriends+1;

	const list = document.querySelector('#listOfFriends');

	// We know friend request was from user1. Hardcoded for Phase1 purposes
	const element = document.createElement('li')
	const link = document.createElement('a')
	link.setAttribute('href', 'user2.html')
	const img = document.createElement('img')
	img.setAttribute('src', '../Images/bourne.jpg');
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

}
