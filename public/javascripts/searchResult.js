// button that is clicked for searching for users
const requestButton = document.querySelector('.green_button');
requestButton.addEventListener('click', sendRequest);

// send request to a user with provided name
function sendRequest(e){
    //alert('Friend request to user sent.');
    //console.log();
    axios.post('/sendRequest', {
        id: e.target.id,
      })
      .then(function (response) {
        e.target.type="hidden";
      })
      .catch(function (error) {
        console.log(error);
      });

}
