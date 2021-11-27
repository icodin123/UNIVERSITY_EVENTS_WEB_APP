/**
  Script for generating Hardcoded Mock data used in phase 1
  Includes constructors for common entities used in the demo - Users (human users),
  Universities, Event, EventInvitation and UniversityApplication.

  Classes (and constructors) are used instead of hardcoded objbects to make the process of creating
  multiple users/universities etc. easier. 

  To give illusion of state preservation, we are using multiple versions of the same object.
  For instead, our protagonist for the demo - "user" aka "John Wick" starts out as being an initial object (creatively called "user")
  After one set of interaction, the state of "user" object chagnes. To reflect that, we use an object called "userStepOne".
  See below for more details.

  NOTE: ALL THIS DATA WILL BE LOADED, STORED, AND UPDATED IN A DATABASE IN PHASE-2. HARDCODED FOR PHASE-1.


*/

// Counters to uniqely generate ids for different entities
let userCount = 0;
let universityApplicationCount = 0;
let universityCount = 0;
let eventCount = 0;

// Refers to currentUser (in our case, as hardcoded - "user" aka "John Wick")
let currentUser;

/** 
Function used to generate User objects.  
*/
const User = function(firstName, lastName, username, password, mailAddress,
  university, profilePic) {
  this.firstName = firstName;
  this.lastName = lastName;
	this.username = username;
  this.password = password;
  this.userId = userCount;
  this.mailAddress = mailAddress;
  this.university = university;
  this.isEventOrganizer = false;
  this.eventsAttending = [];
  this.profilePic = profilePic;
  this.eventInvites = [];
  this.friends = [];
  this.events = [];
  this.interestingEvents = [];
  this.friendRequests = [];

  /**
    Common operations that we can perform on a user. Include console.log statements for sanity checks
  */
  this.acceptInvitation = function(index){
    console.log(index);
    console.log('event invitation for ' +
      currentUser.eventInvites[index].evnt.eventName + ' was accepted');
    currentUser.eventInvites.splice(index, 1);
  }

  this.denyInvitation = function(index){
    console.log(index);
    console.log('event invitation for ' +
      currentUser.eventInvites[index].evnt.eventName + ' was denied');
    currentUser.eventInvites.splice(index, 1);
  }

  this.addInvitation = function(invitation){
    this.eventInvites.push(invitation);
  }

  this.equals = function(other){
    return (this.username === other.username);
  }

  this.promoteToEventOrganizer = function(){
    this.isEventOrganizer = true;
  }

  this.revokeOrganizerPrivilege = function(){
    this.isEventOrganizer = false;
  }


  this.cancelEventTicket = function(id){

    for(let i = 0; i < this.events.length; i++){
      if(this.events[i].eventId === id){
        this.events.splice(i, 1);
      }
    }

  }

	userCount++;
}

/**
  Function to create an event invitation. Parameter "user" refers to the user who is sending the invitation
  Parameter "evnt" refers to the event object for which the invitation is sent
*/
const EventInvitation = function(user, evnt){
  this.user = user;
  this.evnt = evnt; // corresponding event
}

/**
  Function to create a University Application. 
*/
const UniversityApplication = function(name, mailAddress, letter, contact) {
  this.name = name;
  this.mailAddress = mailAddress;
  this.letter = letter;
  this.contact = contact;

	universityApplicationCount++;
}

/**
  Function to create a university
*/
const University = function(name, login, password, email, description) {
  this.name = name;
  this.login = login;
  this.password = password;
  this.email = email;
  this.description = description;
  this.eventOrganizers = [];

  /**
    Common functions to make it easier to perform operations on unviersity objects
  */
  this.equals = function(other){
    return this.login === other.login;
  }

  this.addEventOrganizer = function(eventOrganizer){
    this.eventOrganizers.push(eventOrganizer);
  }

  this.getEventOrganizer = function(index){
    return this.eventOrganizers[index];
  }

  this.removeEventOrganizerAtIndex = function(index){
    for(let i = 0; i < this.eventOrganizers.length; i++){
      if(i === index){
        this.eventOrganizers.splice(i, 1);
      }
    }
  }

  this.removeEventOrganizerAtIndex = function(eventOrganizer){
    for(let i = 0; i < this.eventOrganizers.length; i++){
      if(this.eventOrganizers[i].equals(eventOrganizer)){
        this.eventOrganizers.splice(i, 1);
      }
    }
  }

	universityCount++;
}

// Used to create Event objects.
class Event {
    constructor(eventName, miniDesc, location, capacity, reserved, time, endTime, date, by, university, organizerName, pic) {
        this.eventId = eventCount;
        this.eventName = eventName;
        this.miniDesc = miniDesc
        this.description = "";
        this.location = location;
        this.capacity = capacity;
        this.reserved = reserved;
        this.time = time;
        this.endTime = endTime;
        this.customFields = [];
        this.date = date;
        this.by = by;
        this.university = university;
        this.pic = pic;
        this.organizerName = organizerName;
        eventCount++;
    }
}

/**
  UofT is the university all of our users ("user", "user2", "user3") belong to. We don't demo UofT's page 
  as a part of our demo
*/
let uOfT = new University("University of Toronto", "uoft", "uoft123" ,
"admin@uoft.com", "University of Toronto");

/**
  The user objects of our protagonist - "user" aka "John Wick".
  There are 3 objects for John Wick, "user" refers to the initial object, "userStepOne" refers to the object
  after we accept "Jason Bourne's" friend request, and "userStepTwo" regers to the object after we become Event Organizers.

  We need separate objects to give illusion of state preservation.
  IN PHASE 2, USING DATABASE, ALL UPDATES WILL HAPPEN TO THE SAME OBJECT
*/
const user = new User("John", "Wick", "user", "user", "wick@gmail.com", uOfT, "../Images/wick.jpg");
const userStepOne = new User("John", "Wick", "user", "user", "wick@gmail.com", uOfT, "../Images/wick.jpg");
const userStepTwo = new User("John", "Wick", "user", "user", "wick@gmail.com", uOfT, "../Images/wick.jpg");

/**
  Dummy objects for other users. We don't see their profile page for phase1 demo
*/
const user2 = new User("Jason", "Bourne", "user2", "user2","bourne@gmail.com", uOfT, "../Images/bourne.jpg");
const user3 = new User("James", "Bond", "user3", "user3", "jamesbond@hotmail.com", uOfT, "../Images/bond.jpg");

// Array to store initial set of user objects
let users = [user, user2, user3];

// Array to store user objects after admin deletes account of "Jason Borune"
let deletedUsers = [user, user3];

/**
  Hardcoded objects that refer to the 5 set of events in our application. 
  IN PHASE2, THIS DATA WILL BE RETRIEVED FROM DATABASE. 
*/
const hackathon = new Event("U of T Hacks VII", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore",
"Bahen", 1000, 900, "15:00", "19:00", "2019/11/03", "University of Toronto", uOfT, 'Ethan Hunt', '../Images/halloween.jpg');

const android = new Event("Android Development Workshop", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore",
"Bahen", 500, 500, "09:00", "10:00", "2019/11/03", "University of Toronto", uOfT, 'John Doe', '../Images/halloween.jpg');

const ios = new Event("iOS Development Workshop", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore",
"Bahen", 300, 200, "12:00", "13:00", "2019/11/03", "University of Toronto", uOfT, 'Henry Cavill', '../Images/halloween.jpg');

const web = new Event("Web Development Workshop", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore",
"Robarts", 100, 10, "19:00", "15:00", "2019/11/06", "University of Toronto", uOfT, 'Mark Goldbridge', '../Images/halloween.jpg');

const machine = new Event("Machine Learning Hackathon", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore",
"Bahen", 110, 50, "22:00", "00:00", "2019/11/15", "University of Toronto", uOfT, 'Lawrence Mckena', '../Images/halloween.jpg');

/**
  Object for the Event that will be created by the user (TA) as part of the proof-of-concept demo.
  Hardcoded here.
  IN PHASE 2, THIS WILL BE WRITTEN TO DATABASE AND THEN RETRIEVED FROM THERE LATER ON.
*/
const newEvent = new Event("CSC309 Study Jam", "Stressed about 309? Didn't do well in the midterm? Don't worry! Come study for the 309 exam over the reading week!",
"Sidney Smith", 50, 50, "12:00", "14:00", "2019/11/07", "University of Toronto", uOfT, 'John Wick', '../Images/study.jpg');
newEvent.description = "Lorem ipsum dolor sit amet, " +
          "consectetur adipiscing elit. Morbi sed" +
          "tempus justo. Sed leo enim, posuere eget lorem a," +
          " dignissim interdum dui. Curabitur interdum suscipit turpis " +
          "in vehicula. Phasellus nibh magna, dignissim sit amet nunc";

// Array to store the inital 5 events in the application
mockEvents = [hackathon, android, ios, web, machine];

// Populating the description field of all events with some Lorem Ipsum
for(let j = 0; j < mockEvents.length; j++){
  mockEvents[j].description = ("Lorem ipsum dolor sit amet, " +
          "consectetur adipiscing elit. Morbi sed" +
          "tempus justo. Sed leo enim, posuere eget lorem a," +
          " dignissim interdum dui. Curabitur interdum suscipit turpis " +
          "in vehicula. Phasellus nibh magna, dignissim sit amet nunc");
}


// Array to store the mock universities for the application
// These are dummy universities to populate fields. 
// IN PHASE2, THIS DATA WILL BE LOADED FROM DATA BASE
let mockUniversities = [new University("Mc Master",
"mc", "mc", "admin@waterloo.com", "Mc Master"),
new University("University of Alberta", "alberta", "alberta123" ,
"admin@alberta.com", "University of Alberta"),
new University("University of British Columbia", "brColumbia", "brcol123" ,
"admin@british_columbia.com", "University of British Columbia")];


// Mock Applications to populate the admin dashboard
// REPLACED WITH APPLICATIONS PULLED FROM DATABASE IN PHASE2
mockUniverityApplications = [new UniversityApplication(
  "University of Waterloo", "mail@waterloo.com",
  "Hello Univent Admins! Please accept our request to create the account. We would like to use your platform! Thanks!", 
  "Mr Someone"), new UniversityApplication(
    "University of Nelson", "contact@nelson.com",
    "Hello dear portal admins, we are looking towards using your website for" +
    " organizing events at our university. Please contact us if you have any" +
    " questions", "Some Person"), new UniversityApplication(
      "University of Summerside", "contact@summerside.com",
      "Hello dear portal admins, we are looking towards using your website for" +
      " organizing events at our university. Please contact us if you have any" +
      " questions", "Some Person")];



// Initial values of all user objects
users[0].friendRequests.push(user2);
users[0].events.push(machine);
users[1].events.push(ios);
users[2].events.push(android);
users[1].events.push(web);
users[2].events.push(machine);

// "user" object after step one
let invitation1 = new EventInvitation(users[1], ios);
let invitation2 = new EventInvitation(users[1], web);
userStepOne.addInvitation(invitation1);
userStepOne.addInvitation(invitation2);
userStepOne.events.push(machine);
userStepOne.interestingEvents.push(hackathon, web, ios, android);
// As user2 is now friends with user after step-1
userStepOne.friends.push(users[1]);

// In Step 2, need to demonstrate tickets.html page -- use events and friends
userStepTwo.events.push(machine, web, hackathon);
userStepTwo.friends.push(users[1]);


currentUser = userStepOne
currentEvent = mockEvents[0];
