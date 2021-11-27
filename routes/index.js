var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
const multer  = require('multer');
var upload = multer({ dest: 'upload/'});

const { mongoose } = require('./mongoose');
var type = upload.single('eventImage');



const { User } = require('../models/user');
const { University } = require('../models/university');
const { UniversityApplication } = require('../models/universityApplication');
const { Event, EventSchema, CustomFields, CustomFieldsSchema } = require('../models/eventSchema');
const { EventInvitation, EventInvitationSchema } = require('../models/eventInvitation');


// Our own express middleware to check for
// an active user on the session cookie (indicating a logged in user.)
const sessionChecker = (req, res, next) => {
    if (req.session.user) {
        res.redirect('/users/dashboard'); // redirect to dashboard if logged in.
    } else {
        next(); // next() moves on to the route.
    }
};

router.get('/events/createEvent', (req, res)=> {
    console.log('create event');
    res.render('newEvent.hbs', {isEventOrganizer: req.session.isEventOrganizer});
});


router.get('/logout', (req, res)=>{
  req.session.destroy((error) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.redirect('/');
    }
  });

});



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('loginPage.hbs', { title: 'Univent', isEventOrganizer: req.session.isEventOrganizer });
});

// --- OLDER VERSION
// A route to login and create a session
// router.post('/login', (req, res) => {
// 	const username = req.body.username;
//     const password = req.body.password;
//     console.log(username);
//     console.log(password);
//     // Use the static method on the User model to find a user
// 	// by their email and password
// 	User.findOne({ username: username }).then((user) => {
// 		if (user == undefined) {
// 			res.status(400).redirect('/');
// 		}
// 		console.log(user + " wow what is happening");
// 		if (user.password == password){

// 			req.session.user = user._id;
// 			req.session.university = user.currentInstitution;
// 			res.redirect('/users/dashboard')
// 		} else {
// 			res.render('loginPage.hbs');
// 		}
// 		// if the user exists, make sure their password is correct

// 	}).catch((error)=> {
// 		console.log(error);
// 		res.status(500).send();
// 	});
// });
router.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  console.log(username);
  console.log(password);
    // Use the static method on the User model to find a user
  // by their email and password
  User.findOne({ username: username }).then((user) => {
    if (user === null || user === undefined) {
      // Means either user doesn't exist, or the information might be university information
      // Check university model
      University.findOne({ login: username }).then((uni) => {
        if(uni === null || user === undefined){
          // Nothing exists, so redirect
          res.status(400).redirect('/');
        }else if(uni.password === password){
          req.session.user = uni._id;
          req.session.isUni = true;
          console.log('PLEASE DON')
          res.redirect('/universities/dashboard')
        }else{
          res.render("loginPage.hbs")
        }
      }).catch((err) => {
        console.log(err)
        res.status(500).send()
      })
    }
    else if (user.password === password){
      req.session.user = user._id;
      req.session.university = user.currentInstitution;
      req.session.isUni = false;
      req.session.isEventOrganizer = user.isEventOrganizer;
      console.log("expected");
      res.redirect('/users/dashboard')
    } else {
      res.render('loginPage.hbs', {isEventOrganizer: req.session.isEventOrganizer});
    }
    // if the user exists, make sure their password is correct

  }).catch((error)=> {
    console.log(error);
    res.status(500).send();
  });
});

router.get('/universities/dashboard', (req, res) => {
  console.log('IN HERE UNI DASHBOARD')
  console.log(req.session.user)
  if (req.session.user) {
    University.findById(req.session.user).then((uni) => {
      const context = {
        currUni: uni,
        sameUser: true,
        userPic: uni.profilePic.data.toString('base64'),
        hasOrganizers: (uni.eventOrganizers.length > 0) ? true : false,
        hasEvents: (uni.events.length > 0) ? true : false,
        isEventOrganizer: req.session.isEventOrganizer
      };

      res.render('uni.hbs', context);

    }).catch((error)=> {
      console.log(error);
      res.status(500).send();
    });
  } else {
    res.redirect('/')
  }

});


// ROUTE for handling search
router.post('/search', (req, res)=> {

	const connection = mongoose.connection;
	const query = req.body.searchInput;

	console.log(query);

	connection.db.collection("users", function(err, collection){

        collection.find(
            { $text: { $search: query } },
            { score: { $meta: "textScore" } }
         ).toArray(function(err, data){
			console.log(data);
			for (let i = 0; i < data.length; i++){
				data[i].profilePic.data = data[i].profilePic.data.toString('base64');
				data[i].sent = false;
				for (let j = 0; j < data[i].friendRequests.length; j++){
					if (req.session.user == data[i].friendRequests[j]){
						data[i].sent = true;
						break;
					}
				}
			}
			// sent request = TRUE => friend/ sent request
			// sent request = FALSE => No request sent
			res.render('searchResult.hbs', {users: data, count: data.length, query: query, isEventOrganizer: req.session.isEventOrganizer});
        });

    });

});

router.get('/register', (req, res) => {
  console.log('make new user');
  University.find({}).then((results) => {
    res.render('user_registration.hbs', {
      title: 'Univent',
      universities: results,
      isEventOrganizer: req.session.isEventOrganizer
    });

  }).catch((error) =>{
    res.status(500).send(error);
  })
});


router.post('/register',type, (req, res) => {
	//console.log(req.body)

	// Create a new student using the Student mongoose model
	const user = new User({
		username: req.body.username,
		firstname: req.body.firstname,
		lastname: req.body.lastname,
		password: req.body.password,
		email: req.body.email,
		programOfStudy: req.body.programOfStudy,
		currentInstitution: req.body.currentInstitution,
		yearOfStudy: req.body.yearOfStudy,
		isAdmin: false,
    isEventOrganizer: false,
		profilePic: {
			data: fs.readFileSync(path.join(__dirname, '..', '/public/images/profilePic.png').toString("base64")),
			contentType: 'image/png'
		},
		bio: "Well, looks like this is empty"
	});

	// Save student to the database
	user.save().then((result) => {
		res.redirect('/');
	}, (error) => {
		res.status(400).send(error); // 400 for bad request
	});


});


router.post('/sendRequest', (req, res) =>{
	console.log('sending a request to ' + req.body.id);
	User.findById(req.body.id).then((user) => {
		console.log(user);
		user.friendRequests.push(req.session.user);
		user.save().then((result) => {
			res.status(200).send();
		}).catch((error)=>{
			res.status(500).send();
		})

	}).catch((error)=> {
		console.log(error);
		res.status(500).send();
	});


});

router.post('/sendEventInvitation', (req, res) => {
	console.log(req.body);
	User.findById(req.body.friendID).then((user) => {

		Event.findById(req.body.eventID).then((event) => {
      User.findById(req.session.user).then((you)=>{
          const invite = new EventInvitation({
            to: user._id,
            from: req.session.user,
            event: event

          });

          you.invitesSent.push(invite);
          user.eventInvites.push(invite);

          you.save().then((result) => {
            console.log("saved");
          }).catch((error)=>{
            res.status(500).send(error);
          })

          user.save().then((result)=>{
            console.log("saved");
          }).catch((error)=>{
            res.status(500).send(error);
          });
      });


		});


	}).catch((error)=> {
		console.log(error);
		res.status(500).send();
	});


});

router.get('/myTickets', (req, res) => {
	// get all events we are attending

	// compare our friend list to events attending
	// if friend is already attending don't show them

	User.findById(req.session.user).then((user) => {
		const attendingEvents = user.eventsAttending;
    const sentInvites = user.invitesSent;
    console.log('sentInvites');
    console.log(sentInvites);
    const friends = user.friends;

    console.log('friends')
    console.log(friends);
		for (let i = 0; i < attendingEvents.length; i++){
      // remove all students which are already attending the event.

			const valid_invites = [];
			const event = attendingEvents[i];
			for (let j = 0; j < friends.length; j++){

				if (! (friends[j] in event.attendees)){ // if friend is already attending don't send
					// check if not already sent.
					let sent = false;

					for (let k = 0; k < sentInvites.length; k++){
						if (sentInvites[k].event._id.equals(event._id) && sentInvites[k].to.equals(friends[j])){
							sent = true;
						}
					}
					if (!sent){
            valid_invites.push(friends[j]._id);
            console.log('added friend --------');
            attendingEvents[i].customFields.push(valid_invites);
					}

				}
      }
      console.log("should be added");
      attendingEvents[i].valid_invites = valid_invites;

    }

    console.log(attendingEvents);

    //console.log('wewefewf');

		User.find({}).then((users)=>{
			for (let i = 0; i < attendingEvents.length; i++){

        const invites = attendingEvents[i].customFields;


				for (let j = 0; j < invites.length; j++){
          //console.log('users.length');
          //console.log(users.length);
					for (let k = 0; k < users.length; k++){
            console.log(users[k]._id);
            console.log(attendingEvents[i].customFields[j]._id);
            console.log((users[k]._id.equals(attendingEvents[i].customFields[j]._id)));
						if ((users[k]._id.equals(attendingEvents[i].customFields[j]._id))){
              console.log(users[k].username);
              console.log('hello!!!!!!!!');
              attendingEvents[i].customFields[j] = {
                id: attendingEvents[i]._id + "~" + attendingEvents[i].customFields[j]._id,
                username: users[k].username};
						}
					}

        }



			}

			// const test_data= [{_id: 100, eventName:"dummy1", description: "description", date: "date", location: "location" , attending: [{id:"100~36", username: "adit"}, {id: "100~46", username: "batman"}]},
			// {_id: 104, eventName:"dummy1", description: "description", date: "date", location: "location" , attending: [{id:"104~36", username: "adit"}, {id: "104~46", username: "batman"}]}
      // 				];
      console.log("got to rendering");
      //console.log(attendingEvents[0].customFields);
      console.log(attendingEvents);
			res.render('tickets.hbs', {events: attendingEvents});

		}).catch((error) => {

			res.status(500).send(error);
	  });




	}).catch((error)=> {
		console.log(error);
		res.status(500).send();
	});

});



module.exports = router;


// URLS FOR THE ADMIN PORTAL
router.get('/admin/login', (req, res) => {
  res.render('adminPortalLogin.hbs')
})

router.get('/admin/home', function(req, res, next) {
  res.render('adminPortalInit.hbs', { title: 'Univent', isEventOrganizer: req.session.isEventOrganizer});
});

router.get('/admin/reviewUniversity/:id', function(req, res, next) {
  res.render('reviewUniversityApplicationPage.hbs', { title: 'Univent',  id: req.params.id, isEventOrganizer: req.session.isEventOrganizer});
});

router.get('/admin/editUser/:id', function(req, res, next) {
  res.render('editUserPageAdmin.hbs', { title: 'Univent', id: req.params.id, isEventOrganizer: req.session.isEventOrganizer});
});


router.get('/admin/logout', function(req, res, next) {
  res.render('adminPortalLogin.hbs', { title: 'Univent' });
});


router.get('/event/:id', function(req, res, next) {

  User.findById(req.session.user).then((curUser) => {
  //console.log(user);

    if(!curUser){
      res.status(400).redirect('/events/')
    }

    let eventId = req.params.id;

    Event.findOne({_id: req.params.id}).then((event) => {
  		if (!event) {
        console.log("event not found")
  			res.status(400).redirect('/events/')
  		}
      else{
        let registered = false;
        for(num in curUser.eventsAttending){
          if (curUser.eventsAttending[num]._id == eventId){
            registered = true;
          }
        }
        res.render('eventInfoNew.hbs', { title: 'Univent', id: req.params.id, registered: registered, open: !registered,
        isEventOrganizer: req.session.isEventOrganizer});
      }
  	}).catch((error)=> {
  		console.log(error);
  		res.status(500).send();
  	});

  }).catch((error)=> {
    console.log(error);
    res.status(500).send();
  });

});

///////////////////////////////////////////////
router.get('/edit', (req, res)=> {
	console.log('we reached the edit route');
	res.render('editUserPage.hbs', {isEventOrganizer: req.session.isEventOrganizer});

});



// URLS for event feed
router.get('/events', function(req, res, next) {
  console.log("hello");
  curUserId = req.session.user;

  let result = [];

	User.findById(curUserId).then((user) => {
    User.find({}).then((users)=>{

      for (let i = 0; i < user.eventInvites.length; i++){

        for (let j = 0; j < users.length; j++){
          if (user.eventInvites[i].from.equals(users[j]._id)){
            result.push({from: users[j] , event: user.eventInvites[i],
              invitation_id:  user.eventInvites[i]._id});

          }
        
        }

      }

      res.render('eventFeed.hbs', { title: 'Univent', id: req.session.user,
      result: result, isEventOrganizer: req.session.isEventOrganizer,
      eventsUpcoming: user.eventsAttending.length,
      invitationsTotal: user.eventInvites.length});
        
    }).catch((error)=>{
      res.status(500).send(error);
    });




	}).catch((error)=> {
		console.log(error);
		res.status(500).send();
	});

});

router.post('/acceptApplication', function(req, res, next) {
  let university_application;

  UniversityApplication.findById(req.body.university_id).then((application) => {
    university_application = application;
    console.log(university_application);
    let university = new University({
    	name: university_application.name,
    	login: req.body.username,
    	password: req.body.password,
    	email: university_application.mailAddress,
    	description: "This is an empty bio, please feel free to edit this!",
    	eventOrganizers: [],
      profilePic: {
        data: fs.readFileSync(path.join(__dirname, '..', '/public/images/profilePic.png').toString("base64")),
        contentType: 'image/jpg'
      },
    })


    university.save().then((result) => {
      res.redirect('/admin/home');
    }, (error) => {
      res.status(400).send(error); // 400 for bad request
    });


    university_application.remove();


	}).catch((error)=> {
		console.log(error);
		res.status(500).send();
	});

  //res.render('eventFeed.hbs', { title: 'Univent', id: req.session.user});
});

router.delete('/denyApplication', function(req, res, next) {
  //res.render('eventFeed.hbs', { title: 'Univent', id: req.session.user});

  let university_application;

  UniversityApplication.findAndDelete({_id: req.body.university_id_deny}).then((application) => {
    if(!application){
      res.status(400).send();
    }
    else{
      res.redirect('/admin/home');
    }
	}).catch((error)=> {
		console.log(error);
		res.status(500).send();
	});

  university_application.remove();

});


router.put('/saveUser', function(req, res, next) {
  //res.render('eventFeed.hbs', { title: 'Univent', id: req.session.user});

  User.findOne({ _id: req.body.user_id }).then((user) => {
		if (!user) {
			res.status(400).redirect('admin/home')
		}
    else{
      user.firstname = req.body.firstNameInputField
      user.lastname = req.body.lastNameInputField
      user.username = req.body.usernameInputField
      user.currentInstitution = req.body.universityNameInputField
      user.email = req.body.emailInputField

      user.save().then((result) => {
        res.redirect('/admin/home');
      }, (error) => {
        res.status(400).send(error); // 400 for bad request
      });

    }
	}).catch((error)=> {
		console.log(error);
		res.status(500).send();
	});

});

router.delete('/deleteUser', function(req, res, next) {
  //res.render('eventFeed.hbs', { title: 'Univent', id: req.session.user});

  User.findAndDelete({_id: req.body.user_id_delete}).then((user) => {
    if(!user){
      res.status(400).send();
    }
    else{
      res.redirect('/admin/home');
    }
	}).catch((error)=> {
		console.log(error);
		res.status(500).send();
	});

});


// Accept invitation with given id
router.get('/acceptInvitation/:id/:invite_id', function(req, res, next) {

  User.findById(req.session.user).then((curUser)=>{
    Event.findById(req.params.id).then((event) => {
      curUser.eventsAttending.push(event);
      curUser.eventInvites.pull({_id: req.params.invite_id});

      curUser.save().then((result) => {
      }, (error) => {
        console.log(error)
      });

    }).catch((error)=> {
      console.log(error);
      res.status(500).send();
    });

  }).catch((error)=>{
    res.status(500).send(error);
  })



});


// Deny invitation with given id
router.post('/denyInvitation/:id', function(req, res, next) {

  let curUser = req.session.user;
  if(!curUser){
    return;
  }

  curUser.eventInvites.pull({_id: req.params.id});
  curUser.save().then((result) => {
  }, (error) => {
    console.log(error)
  });


});


router.post('/getTicket', function(req, res, next) {
  //res.render('eventFeed.hbs', { title: 'Univent', id: req.session.user});

  User.findById(req.session.user).then((curUser) => {
  //console.log(user);

    if(!curUser){
      res.status(400).redirect('/events/')
    }

    let eventId = req.body.event_id;


    console.log("started search")
    console.log("event id is " + eventId)

    Event.findOne({_id: eventId}).then((event) => {
  		if (!event) {
        console.log("event not found")
  			res.status(400).redirect('/events/')
  		}
      else{
        console.log("event found")
        let count = parseInt(event.reserved, 10);
        count++;
        console.log("count is " + count)
        event.reserved = "" + count
        event.save().then((result) => {
        }, (error) => {
          res.redirect('/events/')
          res.status(400).send(error); // 400 for bad request
        });

        curUser.eventsAttending.push(event);
        curUser.save().then((result) => {
          res.redirect('/events/');
        }, (error) => {
          res.status(400).send(error); // 400 for bad request
        });

      }
  	}).catch((error)=> {
  		console.log(error);
  		res.status(500).send();
  	});

  }).catch((error)=> {
    console.log(error);
    res.status(500).send();
  });


});


// // populate database with data
// function populate(){
//
//   for(let i = 0; i < 10; i++){
//     let universityApplication = new UniversityApplication({
//       name: "university of " + i,
//       mailAddress: "university@" + i + "mail.com",
//       letter: "letter " + i,
//       contact: "contact" + i
//     });
//
//     universityApplication.save().then((result) => {
//       "mock university application created"
//     }, (error) => {
//       "something went wrong"
//     });
//
//   }
//
//   let generated_users = [];
//   let generated_user_models = [];
//
//
//   for(let i = 0; i < 10; i++){
//     let user = new User({
//       username: "user" + i,
//       password: "123456789ABCDEFG",
//       firstname: "user name" + i,
//       lastname: "user last name" + i,
//       email: "user email" + i,
//       currentInstitution: "university of " + i,
//       programOfStudy: "CS",
//       yearOfStudy: 3,
//       isAdmin: true,
//       // Credit to stack-overflow post:
//       // https://stackoverflow.com/questions/29780733/store-an-image-in-mongodb-using-node-js-express-and-mongoose
//       profilePic: {
//   			data: fs.readFileSync(path.join(__dirname, '..', '/public/images/profilePic.png').toString("base64")),
//   			contentType: 'image/png'
//   		},
//       isEventOrganizer: false,
//       bio: "my bio" + i,
//       friendRequests: [],
//       friends: [],
//       events: [],
//       eventsAttending: [],
//       eventInvites: []
//     })
//
//     user.save().then((result) => {
//       "mock user created"
//     }, (error) => {
//       "something went wrong"
//     });
//
//     generated_users.push(user._id);
//     generated_user_models.push(user);
//
//   }
//
//   let generated_events = [];
//
//   for(let i = 0; i < 10; i++){
//     let event = new Event({
//       eventName: "event" + i,
//     	miniDesc: "mini description" + i,
//     	description: "description" + i,
//     	location: "location" + i,
//     	capacity: "" + 100 * i + 10,
//     	reserved: "" + 10 * i + 5,
//     	// Can just keep time, endTime as string as don't need to modify
//     	time: "10:00" ,
//     	endTime: "12:00",
//     	customFields: [CustomFieldsSchema],
//     	date: "2019/12/01",
//     	// User who created the event
//       // code from
//       // https://stackoverflow.com/questions/5915096/get-random-item-from-javascript-array
//     	by: generated_users[Math.floor(Math.random()*generated_users.length)],
//     	university: "university of " + i,
//       pic: {
//   			data: fs.readFileSync(path.join(__dirname, '..', '/public/images/profilePic.png').toString("base64")),
//   			contentType: 'image/png'
//   		}
//     });
//
//     generated_events.push(event);
//
//     event.save().then((result) => {
//       "mock event created"
//     }, (error) => {
//       "something went wrong"
//     });
//   }
//
//
//   let generated_invitations = [];
//
//   for(let i = 0; i < 10; i++){
//     let eventInvitation = new EventInvitation({
//       to: generated_users[Math.floor(Math.random()*generated_users.length)],
//       from: generated_users[Math.floor(Math.random()*generated_users.length)],
//       event: generated_events[Math.floor(Math.random()*generated_events.length)]
//     })
//
//     generated_invitations.push(eventInvitation);
//
//     eventInvitation.save().then((result) => {
//       "mock event invitation created"
//     }, (error) => {
//       "something went wrong"
//     });
//   }
//
//
//   let eventInvites = [];
//
//   for(u in generated_user_models){
//     for(let j = 0; j < 1; j++){
//
//
//       User.findOne({_id: u}).then((user) => {
//         if (!user) {
//
//         } else {
//           user.eventInvites.push(
//             generated_invitations[
//               Math.floor(Math.random()*generated_invitations.length)]);
//
//
//             user.save().then((result) => {
//               "mock event invitation created"
//             }, (error) => {
//               "user could'nt be saved"
//             });
//
//         }
//       }).catch((error) => {
//
//       })
//
//     }
//  }
//
//
//
//
//
//
//   for(let i = 0; i < 10; i++){
//     let university = new University({
//       name: "university of " + i,
//     	login: "uni" + i,
//     	password: "uni" + i,
//     	email: "uni@" + i + ".com",
//     	description: "just a university",
//     	eventOrganizers: []
//     });
//
//     university.save().then((result) => {
//       "mock university created"
//     }, (error) => {
//       "something went wrong"
//     });
//
//   }
//
// }
//
// // populate()
