var express = require('express');
var router = express.Router();
const multer  = require('multer');
var upload = multer({ dest: 'upload/'});
const { mongoose } = require('./mongoose');
var fs = require("fs");

const { ObjectID } = require('mongodb')
const { University } = require('../models/university')
const { UniversityApplication } = require('../models/universityApplication')


router.get('/requestAccount', (req, res) => {
	console.log('Now rendering the app page for university')
	res.render('universityApplicationPage.hbs')
})

router.post('/createRequest', (req, res) => {
	const newAccountRequest = new UniversityApplication({
		name: req.body.universityName,
		mailAddress: req.body.universityEmail,
		letter: req.body.universityLetter,
		contact: req.body.universityContact
    });	

    newAccountRequest.save().then(result => {
    	console.log("REQUEST CREATED!")
    	res.redirect('/')
    }).catch(err => {
    	res.status(500).send()
    })
	
})

// Get all universities
router.get('/', (req, res) => {

	// Otherwise, find by the id and creator
	University.find().then((universities) => {
		if (!universities) {
			res.status(404).send()  // could not find this student
		} else {
			res.send(universities)
		}
	}).catch((error) => {
		res.status(500).send()  // server error
	})
})

// Get university with specified id
router.get('/:id', (req, res) => {

	// Otherwise, find by the id and creator
	University.findOne({_id: req.params.id}).then((university) => {
		if (!university) {
			res.status(404).send()  // could not find this student
		} else {
			res.send(university)
		}
	}).catch((error) => {
		res.status(500).send()  // server error
	})
})

// Get university with name
router.post('/one', (req, res) => {

  let uniName = req.body.name;
	console.log(uniName)

	// Otherwise, find by the id and creator
	University.findOne({name: uniName}).then((university) => {
		if (!university) {
			res.status(400).send()  // could not find this student
		} else {
			console.log(university);
			res.send(university);
		}
	}).catch((error) => {
		res.status(500).send()  // server error
	})
})

// router.get('/dashboard', (req, res) => {
// 	console.log('IN HERE UNI DASHBOARD')
// 	console.log(req.session.user)
// 	if (req.session.user) {
// 		University.findById(req.session.user).then((uni) => {
// 			const context = {
// 				currUni: uni,
// 				sameUser: true,
// 				userPic: uni.profilePic.data.toString('base64'),
// 				hasOrganizers: (uni.eventOrganizers.length > 0) ? true : false,
// 				hasEvents: (uni.events.length > 0) ? true : false
// 			};
	
// 			res.render('uni.hbs', context);
	
// 		}).catch((error)=> {
// 			console.log(error);
// 			res.status(500).send();
// 		});
// 	} else {
// 		res.redirect('/')
// 	}

// });




module.exports = router;
