const apply = document.querySelector('#apply');
const back = document.querySelector('#back');

// transition to apropriate page after application is submitted
apply.addEventListener('click', e => {
	e.preventDefault();
	alert('Your Application was submitted. Expect to get an email with login credentials if it is accepted');
	window.location.href = '../index.html';
})
// go back to the main page
back.addEventListener('click', e => {
	e.preventDefault();
	window.location.href = '../index.html'
});
