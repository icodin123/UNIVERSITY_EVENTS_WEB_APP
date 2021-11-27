var express = require('express');
var router = express.Router();
const multer  = require('multer');
var upload = multer({ dest: 'upload/'});
const { mongoose } = require('./mongoose');
var fs = require("fs");

const { ObjectID } = require('mongodb')
const { User } = require('../models/user')
const { University } = require('../models/university')


// // Logged in as user1 and view user1's dashboard
// router.get('/dashboard', (req, res) => {
// 	if (req.session.user) {
// 		User.findById(req.session.user).then((user) => {
// 			//console.log(user);

// 			// Populate list of friends
// 			let friends = []
// 			user.friends.forEach(friend => {
// 				User.findById(friend).then((actualFriend) => {
// 					actualFriend.profilePic.data = actualFriend.profilePic.data.toString('base64');
// 					friends.push(actualFriend);
// 				}).catch(err => {
// 					res.status(500).send();
// 				})
// 			})

// 			// Populate list of friendRequests
// 			let requests = []
// 			user.friendRequests.forEach(friend => {
// 				User.findById(friend).then((actual) => {
// 					actual.profilePic.data = actual.profilePic.data.toString('base64');
// 					requests.push(actual);
// 				}).catch(err => {
// 					res.status(500).send();
// 				})
// 			})
// 			//console.log(user.profilePic.data.toString('base64'));
// 			//console.log('diff');
// 			//console.log(user.profilePic.data);

// 			const context = {
// 				currUser: user,
// 				sameUser: (req.session.user == user._id) ? true : false,
// 				userPic: user.profilePic.data.toString('base64'),
// 				friends: friends,
// 				requests: requests,
// 				numFriends: friends.length,
// 			};

// 			res.render('user.hbs', context);

// 		}).catch((error)=> {
// 			console.log(error);
// 			res.status(500).send();
// 		});

// 	} else {
// 		res.redirect('/')
// 	}

// });
// Logged in as user1 and view user1's dashboard







router.get('/dashboard', (req, res) => {
	if (req.session.user) {
		User.findById(req.session.user).then((user) => {
			//console.log(user);

			// Populate list of friends
			let friends = [];
			let requests = [];
			let ourFriendRequests = user.friendRequests;
			let ourFriends = user.friends;
			User.find({}).then((users) => {
				//console.log(users);
				for (let i = 0; i < users.length; i++){
					for (let j = 0; j < ourFriends.length; j++){
						if (users[i]._id.equals(ourFriends[j])) {
							console.log("twice");
							users[i].profilePic.data = users[i].profilePic.data.toString('base64');
							friends.push(users[i]);
						}
					
					}

					
				}
	
				for (let i = 0; i < users.length; i++){
					for (let j = 0; j < ourFriendRequests.length; j++){
						if (users[i]._id.equals(ourFriendRequests[j])) {
							//console.log("twice");
							users[i].profilePic.data = users[i].profilePic.data.toString('base64');
							requests.push(users[i]);
						}
					
					}
					
					
				}

				const context = {
					currUser: user,
					sameUser: (req.session.user == user._id) ? true : false,
					userPic: user.profilePic.data.toString('base64'),
					friends: friends,
					requests: requests,
					isEventOrganizer: req.session.isEventOrganizer
				};
				//console.log(context);
				res.render('user.hbs', context);
	
	
	
			}).catch((error) => {
				res.status(400).send(error);
			});







			// user.friends.forEach(friend => {
			// 	User.findById(friend).then((actualFriend) => {
			// 		actualFriend.profilePic.data = actualFriend.profilePic.data.toString('base64');
			// 		friends.push(actualFriend);
			// 	}).catch(err => {
			// 		res.status(500).send();
			// 	})
			// })

			// // Populate list of friendRequests
			// let requests = []
			// user.friendRequests.forEach(friend => {
			// 	User.findById(friend).then((actual) => {
			// 		actual.profilePic.data = actual.profilePic.data.toString('base64');
			// 		requests.push(actual);
			// 	}).catch(err => {
			// 		res.status(500).send();
			// 	})
			// })
			//console.log(user.profilePic.data.toString('base64'));
			//console.log('diff');
			//console.log(user.profilePic.data);


		}).catch((error)=> {
			console.log(error);
			res.status(500).send();
		});

	} else {
		res.redirect('/')
	}

});


// // Happens when we want to view user2's data but logged in as user1
// router.get('/dashboard/:id', (req, res) => {
// 	const otherUserId = req.params.id

// 		User.findById(otherUserId).then((user) => {
// 		//console.log(user);

// 		// Populate list of friends
// 		let friends = []
// 		user.friends.forEach(friend => {
// 			User.findById(friend).then((actualFriend) => {
// 				actualFriend.profilePic.data = actualFriend.profilePic.data.toString('base64');
// 				friends.push(actualFriend);
// 			}).catch(err => {
// 				res.status(500).send();
// 			})
// 		})

// 		// Populate list of friendRequests
// 		let requests = []
// 		user.friendRequests.forEach(friend => {
// 			User.findById(friend).then((actual) => {
// 				actual.profilePic.data = actual.profilePic.data.toString('base64');
// 				requests.push(actual);
// 			}).catch(err => {
// 				res.status(500).send();
// 			})
// 		})
// 		//console.log(user.profilePic.data.toString('base64'));
// 		//console.log('diff');
// 		//console.log(user.profilePic.data);

// 		const context = {
// 			currUser: user,
// 			sameUser: (req.session.user == otherUserId) ? true : false,
// 			userPic: user.profilePic.data.toString('base64'),
// 			friends: friends,
// 			requests: requests,
// 			numFriends: friends.length,
// 		};

// 		res.render('user.hbs', context);

// 	}).catch((error)=> {
// 		console.log(error);
// 		res.status(500).send();
// 	});
// })


// Happens when we want to view user2's data but logged in as user1
router.get('/dashboard/:id', (req, res) => {
	const otherUserId = req.params.id

		User.findById(otherUserId).then((user) => {
		//console.log(user);

		// Populate list of friends
		let friends = [];
		let requests = [];
		let ourFriendRequests = user.friendRequests;
		let ourFriends = user.friends;
		User.find({}).then((users) => {
			//console.log(users);
			for (let i = 0; i < users.length; i++){
				for (let j = 0; j < ourFriends.length; j++){
					if (users[i]._id.equals(ourFriends[j])) {
						console.log("twice");
						users[i].profilePic.data = users[i].profilePic.data.toString('base64');
						friends.push(users[i]);
					}
				
				}

				
			}

			for (let i = 0; i < users.length; i++){
				for (let j = 0; j < ourFriendRequests.length; j++){
					if (users[i]._id.equals(ourFriendRequests[j])) {
						//console.log("twice");
						users[i].profilePic.data = users[i].profilePic.data.toString('base64');
						requests.push(users[i]);
					}
				
				}
				
				
			}

			const context = {
				currUser: user,
				sameUser: (req.session.user == user._id) ? true : false,
				userPic: user.profilePic.data.toString('base64'),
				friends: friends,
				requests: requests,
				isEventOrganizer: req.session.isEventOrganizer
			};
			//console.log(context);
			res.render('user.hbs', context);



		}).catch((error) => {
			res.status(400).send(error);
		});

	}).catch((error)=> {
		console.log(error);
		res.status(500).send();
	});
})


// Render the request promotion page
router.get('/requestPromotion', (req, res) => {
	console.log("IN HERE")
	User.findById(req.session.user).then(user => {
		const context = {
			currUser: user,
			isEventOrganizer: req.session.isEventOrganizer,
		}
		console.log("Found User: ")
		console.log(user)
		console.log(context)
		res.render('eventOrganizerApplication.hbs', context)

	}).catch(err => {
		res.status(500).send()
	})

})

router.post('/becomeOrganizer', (req, res) => {
	console.log('Promoting User')
	// Add userOne to userTwo's friend list
	User.findById(req.session.user).then((user) => {
		if (!user) {
			console.log('Could not find student')
			res.status(404).send()  //
		} else {


			user.isEventOrganizer = true;
			req.session.isEventOrganizer = true;
			user.save().then((result) => {
				console.log("SUCCESFULLY GOT THE RESULT AFTER SAVING!")
				console.log("Now, adding user to university's organizer list")
				University.findOne({ name: user.currentInstitution }).then(university => {
					console.log("FOUND UNIVERSITY, NOW ADDING USER TO UNIVERSITY'S LIST")
					// Push the resultant user
					university.eventOrganizers.push(result)
					university.save().then(finalUni => {
						console.log('Saved all information successfully')
						res.redirect('/users/dashboard')		
					})
				})
				
			}, (error) => {
				res.status(400).send(error) // 400 for bad request
			})
		}
	}).catch((error) => {
		res.status(500).send()  // server error
	})

})

// Get all users
router.get('/', (req, res) => {

	// Otherwise, find by the id and creator
	User.find().then((users) => {
		if (!users) {
			res.status(404).send()  // could not find this student
		} else {
			res.send(users)
		}
	}).catch((error) => {
		res.status(500).send()  // server error
	})
})

// Get user with specified id
router.get('/:id', (req, res) => {
	const id = req.params.id

	if (!ObjectID.isValid(id)) {
		res.status(404).send()  // if invalid id, definitely can't find resource, 404.
	}

	// Otherwise, find by the id and creator
	User.findOne({_id: id}).then((user) => {
		if (!user) {
			res.status(404).send()  // could not find this student
		} else {
			res.send(user)
		}
	}).catch((error) => {
		res.status(500).send()  // server error
	})
})

// Add friend to user with specified id
router.post('/addFriend', (req, res) => {
	const userOne = req.body.userOne
	const userTwo = req.body.userTwo
	console.log("USER ONE IS: " + userOne)
	console.log("USER TWO IS: " + userTwo)
	// Add userOne to userTwo's friend list
	User.findById(userOne).then((user) => {
		if (!user) {
			res.status(404).send()  // could not find this student
		} else {
			console.log("FOUND USER, IT IS: " + user)
			user.friends.push(userTwo);
			console.log("REACHED HERE, USER NOW IS: " + user)
			user.save().then((result) => {
				console.log("SUCCESFULLY GOT THE RESULT AFTER SAVING!")
				console.log(result)
				res.send(result)
			}, (error) => {
				res.status(400).send(error) // 400 for bad request
			})
		}
	}).catch((error) => {
		res.status(500).send()  // server error
	})

})

router.post('/deleteRequest', (req, res) => {
	const original = req.body.original
	const other = req.body.other
	console.log("Original is: " + original)
	console.log("Other is: " + other)

	// Add userOne to userTwo's friend list
	User.findById(original).then((user) => {
		if (!user) {
			res.status(404).send()  // could not find this student
		} else {
			// Remove request of other from user's list
			console.log("RETRIEVED USER: ")
			console.log(user)
			user.friendRequests = user.friendRequests.filter(obj => {
				return !obj.equals(other)
			})

			user.save().then((result) => {
				res.send(result)
			}, (error) => {
				res.status(400).send(error) // 400 for bad request
			})
		}
	}).catch((error) => {
		res.status(500).send()  // server error
	})
})

const type = upload.single('profilePic');
router.post('/edit', type, (req, res) => {
	User.findById(req.session.user).then((user) => {
		//console.log(user);

		user.bio = req.body.bio;
		console.log(req.file);
		user.profilePic.data = fs.readFileSync(req.file.path.toString("base64"));


		user.save().then((result) => {
			res.redirect('/users/dashboard');
		}).catch((error)=>{
			res.status(500).send();
		})

	}).catch((error)=> {
		console.log(error);
		res.status(500).send();
	});
});







module.exports = router;
