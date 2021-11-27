const invitePop = document.querySelector('#followerList');
const body = document.querySelector('#mainBody');
const ticketInfo = document.querySelector('#ticketInfo');
const queryString = new URLSearchParams(window.location.search);
const currUser = userStepTwo;
let eventInviteId;


// update UI for tickets based on current event data
function loadTickets(){
	const ticketHeading = document.createElement('h2');
	ticketHeading.className = 'heading';
	ticketHeading.appendChild(document.createTextNode('Your Tickets'));

	let eventTags = [];
	currUser.events.map(event => {
		let div = document.createElement('div')
		div.className = 'card';

		let image = document.createElement('img')
		image.className = 'eventPic';
		image.setAttribute('src', event.pic);

		let name = document.createElement('h3')
		name.className += 'heading';
		name.className += 'emphasis';
		name.appendChild(document.createTextNode(event.eventName));

		let logistics = document.createElement('h4')
		logistics.setAttribute('class', 'emphasis heading');
		logistics.appendChild(document.createTextNode(event.date + " --- " + event.location));

		let desc = document.createElement('p');
		desc.className = 'eventDesc';
		desc.appendChild(document.createTextNode(event.miniDesc));

		let inviteButton = document.createElement('input');
		inviteButton.setAttribute('type', 'submit');
		inviteButton.setAttribute('value', 'invite');
		inviteButton.setAttribute('id', 'invitePeople-' + event.eventId);
		inviteButton.setAttribute('class', 'invite button');
		inviteButton.addEventListener('click', openInviteDialog);

		let cancelButton = document.createElement('input');
		cancelButton.setAttribute('type', 'submit');
		cancelButton.setAttribute('value', 'cancel');
		cancelButton.setAttribute('id', 'cancelTicket-' + event.eventId);
		cancelButton.setAttribute('class', 'cancel button');
		cancelButton.addEventListener('click', cancelTicket);

		div.appendChild(image);
		div.appendChild(name);
		div.appendChild(logistics);
		div.appendChild(desc);
		div.appendChild(document.createElement('br'));
		div.appendChild(inviteButton)
		div.appendChild(cancelButton)

		eventTags.push(div);
	});

	ticketInfo.appendChild(ticketHeading);

	eventTags.map(tag => {ticketInfo.appendChild(tag)});

}


// load data for event invitation dialog
function loadInviteDialog(){
	const inviteHeading = document.createElement('h2');
	inviteHeading.className = 'heading';
	inviteHeading.appendChild(document.createTextNode('Select People to Invite'));

	const closeDialog = document.createElement('input');
	closeDialog.setAttribute('type', 'submit');
	closeDialog.setAttribute('value', 'close');
	closeDialog.setAttribute('id', 'closeInvite');
	closeDialog.setAttribute('class', 'cancel');
	closeDialog.addEventListener('click', closeInviteDialog);

	const rule = document.createElement('hr');

	let friendList = [];

	currUser.friends.map(user => {
		let div = document.createElement('div');
		div.className = 'miniCard';

		let img = document.createElement('img');
		img.className = 'miniEventPic';
		img.setAttribute('src', user.profilePic);

		let name = document.createElement('h3');
		name.className = 'emphasis';
		name.appendChild(document.createTextNode(user.firstName + ' ' + user.lastName));

		let inviteButton = document.createElement('input');
		inviteButton.setAttribute('type', 'submit');
		inviteButton.setAttribute('value', 'invite');
		inviteButton.setAttribute('id', 'inviteUser-'+user.userId);
		inviteButton.setAttribute('class', 'invite button');
		inviteButton.addEventListener('click', sendInvite);

		div.appendChild(img);
		div.appendChild(name);
		div.appendChild(inviteButton);

		friendList.push(div);

	});

	invitePop.appendChild(inviteHeading);
	friendList.map(friendCard => invitePop.appendChild(friendCard));
	invitePop.appendChild(rule);
	invitePop.appendChild(closeDialog);
}


// close event invitation dialog
function closeInviteDialog(e){
	body.style.opacity = 1.0;
	invitePop.style.display = 'none';
}


// present information for event dialog that was selected
function openInviteDialog(e){
	body.style.opacity = 0.1;
	invitePop.style.display = 'block';
	eventInviteId = parseInt(e.target.getAttribute('id').split('-')[1]);
}


// update UI after ticket was cancelled
function cancelTicket(e){

	console.log(currUser.events)
	// Changes in the DOM
	const eventCard = e.target.parentElement;
	const parent = e.target.parentElement.parentElement;
	parent.removeChild(eventCard);

	// Changes in user object -- NEED CALL TO DATABASE IN PHASE 2
	const id = e.target.getAttribute('id').split('-')[1];
	currUser.cancelEventTicket(parseInt(id));
	console.log(currUser.events)

}


// send invite to a selected user
function sendInvite(e){

	// Changes in DOM
	const userCard = e.target.parentElement;
	const parent = e.target.parentElement.parentElement;
	parent.removeChild(userCard);

	// Changes in user object -- NEED TO CALL DATABASE IN PHASE 2
	const id = parseInt(e.target.getAttribute('id').split('-')[1]);
	const correctFriend = users.filter(u => u.userId === id)[0];
	const correctEvent = mockEvents.filter(evt => evt.eventId === eventInviteId)[0];
	correctFriend.addInvitation(new EventInvitation(currUser, correctEvent));

}

loadTickets()
loadInviteDialog()
