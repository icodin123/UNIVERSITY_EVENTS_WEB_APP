const clickSettings = document.querySelector('#clickSettings');
const options = document.querySelector('#options');
let showDropDown = false;

clickSettings.addEventListener('click', toggleDropdown);

// switch drop down to an appropriate state
function toggleDropdown(e){
	if(!showDropDown){
		options.style.display = 'block';
		showDropDown = true;
	}else{
		options.style.display = 'none';
		showDropDown = false;
	}
}
