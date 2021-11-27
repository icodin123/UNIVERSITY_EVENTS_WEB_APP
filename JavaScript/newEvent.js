log = console.log


let currentEventImage;

// get reference to inputs we need to modify
customFields = []; // current custom fields for event being created
const fieldSelector = document.querySelector('#field_type_selector');
const addCustomFieldBtn = document.querySelector('#add_field_button');
const customFieldChoices = document.querySelector('#customFieldChoices');
const submitButton = document.querySelector('#submit_event');
const field_card = document.querySelector('#field_card');
const eventImageUpload = document.querySelector('#event-image-upload');
// event listeners

addCustomFieldBtn.addEventListener('click', addCustomField);

fieldSelector.addEventListener('change', fieldChange);

submitButton.addEventListener('click', createEvent);

eventImageUpload.addEventListener('change', eventImageChange);

// logic
function createEvent(e){
    // get all data from the form

    const description = document.querySelector('#eventDescription').value;
    const shortDescription = document.querySelector('#eventShortDescription').value;
    const name = document.querySelector('#eventName').value;
    const location = document.querySelector('#eventLocation').value;
    const capacity = document.querySelector('#eventCapacity').value;
    const reserved = document.querySelector('#eventReserved').value;
    const startTime = document.querySelector('#eventStartTime').value;
    const endTime = document.querySelector('#eventEndTime').value;
    const date = document.querySelector('#eventDate').value;

    // create new event object and "store" the event, current stored
    const newEvent = new Event(name, shortDescription, location, capacity, reserved, startTime, endTime, 
        date, "University of Toronto", uOfT, 'John Wick', currentEventImage);
    newEvent.customFields = customFields;
    newEvent.description = description;
    customFields = [];

    // at this point in phase 2 we would save our 
    // new event we created in our data base so it can be
    // viewed by everyone and be interacted with by other users
    // We redirect to the hardcoded page which contains the new event
    window.location.href = '../HTML/eventInfoNew.html';
}


function eventImageChange(e) {
    var eventImageFile = eventImageUpload.files[0];
    var fr = new FileReader();
    fr.readAsDataURL(eventImageFile);
    currentEventImage = fr;
}



function fieldChange(e){

    if (fieldSelector.value == 'choice'){
        customFieldChoices.hidden = false;
    } else {
        customFieldChoices.hidden = true;
    }

}

function addCustomField(e){
    const newFieldName = document.querySelector('#field_name').value;
    const fieldDescription = document.querySelector('#fieldDescription').value;
    if (newFieldName != "" && fieldDescription != ""){
        const newField = {name: newFieldName, type: fieldSelector.value, description: fieldDescription};

        if (fieldSelector.value == 'choice' || fieldSelector.value == 'multi-choice'){
            newField.data = document.querySelector('#fieldOptions').value.data.split('\n');
            document.querySelector('#fieldOptions').value = ""; // cleared
        }
        
        customFields.push(newField);
        const field_entry = document.createElement('h5');
        field_entry.className = 'field_entry';
    
        field_entry.appendChild(document.createTextNode(newFieldName + " type: " + fieldSelector.value ));

        field_card.appendChild(field_entry);
        newFieldName.value = '';
        fieldDescription.value = '';

    }

}