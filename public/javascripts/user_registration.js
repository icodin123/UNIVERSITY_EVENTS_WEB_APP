// GLOBAL DUMMY DATA
// WILL USE API CALLS TO GET A LIST OF UNIVERSITIES IN PHASE2
const universityList= [];

// GLOBAL DUMMY DATA
// WILL USE API CALLS TO GET THIS LIST IN PHASE2
const programStudyList = ['Life Science', 'Computer Science'];
programStudyList.push('Economics');
programStudyList.push('Philosophy');
programStudyList.push('Gender Studies');
programStudyList.push('Computer Engineering');
programStudyList.push('Electrical Engineering');
programStudyList.push('Mechanical Engineering');
programStudyList.push('Chemical Engineering');
programStudyList.push('Mathematics');
programStudyList.push('Physics');

// obtain main elements and attach listeners
const universitySelector = document.querySelector('#univerisity_selector');

const programOfStudySelector = document.querySelector('#program_selector');

const registerButton = document.querySelector('#register_button');

for (let i = 0; i < universityList.length; i++){
    universitySelector.appendChild(createOption(universityList[i]));
}

for (let i = 0; i < programStudyList.length; i++){
    programOfStudySelector.appendChild(createOption(programStudyList[i]));
}

function createOption(universityName){
    const curr_option = document.createElement('option');
    curr_option.value = universityName;
    curr_option.appendChild(document.createTextNode(universityName));
    return curr_option;
}






