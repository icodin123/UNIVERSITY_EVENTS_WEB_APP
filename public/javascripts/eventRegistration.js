// Test data to render all types of forms
const dummy_fields = [{name: "Preferred Programming Langauge", type: 'text',
description: ''}, {name:'Dietary Restrictions', type:'choice',
description: 'Let us know of any food related restrictions.',
data: ['vegatarian', 'none', 'other']}];


// get reference to the div so we can start adding our custom fields;
const fields = document.querySelector('#fields');
const eventHeader = document.querySelector('#eventHeader');
const submitButton = document.querySelector('#submit_ticket');


submitButton.addEventListener('click', submitTicket);
// we load in the the current event's name here once we have database
const event_name = 'Uoft Hacks';

loadPage();

function loadPage(){
    eventHeader.appendChild(document.createTextNode(event_name));
    for (let i = 0; i < dummy_fields.length; i++){
        fields.appendChild(createFieldHeader(dummy_fields[i].name));
        fields.appendChild(createFieldDescription(dummy_fields[i].description));
        if (dummy_fields[i].type == 'text'){
            fields.appendChild(createTextInput(dummy_fields[i]));
        } else if (dummy_fields[i].type == 'choice'){
            fields.appendChild(createChoiceElement(dummy_fields[i]));
        } else if (dummy_fields[i].type == 'number'){
            fields.appendChild(createNumberInput(dummy_fields[i]));
        }
    }
}

function submitTicket(e){
    e.preventDefault();
    window.location.href = "../HTML/registrationConfirmation.html";
}

// below are all helper functions to create the event registration form dynamically
function createFieldHeader(name){
    const field_name = document.createElement('h4');
    field_name.className = 'user_registration_header';
    field_name.appendChild(document.createTextNode(name));
    return field_name;

}

function createNumberInput(choice){
    const number_input = document.createElement('input');
    number_input.type = 'number';
    number_input.className = 'user_text_input';
    number_input.required = true;
    return number_input;
}

function createTextInput(choice){
    const text_input = document.createElement('input');
    text_input.type = 'text';
    text_input.className = 'user_text_input';
    text_input.required = true;
    return text_input;
}

function createFieldDescription(description){
    const fieldDescription = document.createElement('p');
    fieldDescription.appendChild(document.createTextNode(description));
    fieldDescription.className = 'field_description';
    return fieldDescription;
}

function createChoiceElement(choice){
    const select = document.createElement('select');
    select.className = 'user_text_input';
    for (let i = 0; i < choice.data.length; i++){
        select.appendChild(createOption(choice.data[i]));
    }
    return select;

}

function createOption(value){
    const curr_option = document.createElement('option');
    curr_option.value = value;
    curr_option.appendChild(document.createTextNode(value));
    return curr_option;
}
