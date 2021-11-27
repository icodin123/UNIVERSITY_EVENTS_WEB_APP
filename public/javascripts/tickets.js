const eventCards = document.querySelectorAll('.card');
for (let i = 0; i < eventCards.length; i++){
	eventCards[i].addEventListener('click', showFriends);
}

const inviteButtons = document.querySelectorAll('.inviteButton');

for (let i = 0; i < inviteButtons.length; i++){
	inviteButtons[i].addEventListener('click', sendEventInvitation);
}

function sendEventInvitation(e){
	console.log("invite");
	let info = e.target.id.split('~');
	let eventID = info[0];
	let friendID = info[1];
	e.target.parentElement.hidden = true;

	axios.post('/sendEventInvitation', {
		eventID: eventID,
		friendID: friendID
      })
      .then(function (response) {
		console.log('request sent');
      })
      .catch(function (error) {
        console.log(error);
      });

	console.log(eventID);
	console.log(friendID);
}

function showFriends(e){
	console.log("showFriends");

	let id =  e.target.id.substr(1);

	hideAllFriends();

	let cards = document.querySelectorAll('.friends');

	for (let i = 0; i < cards.length; i++){
		if (cards[i].id == id){
			console.log('true');
			cards[i].hidden = false;
		}
	}

}

function hideAllFriends(){
	// hide all fields
	let friends = document.querySelectorAll('.friends');
	for (let i = 0; i < friends.length; i++){
		friends[i].setAttribute('hidden', true);
	}

}





hideAllFriends();


