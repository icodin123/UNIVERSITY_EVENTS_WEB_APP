var express = require('express');
var router = express.Router();

const bodyParser = require('body-parser')
router.use(bodyParser.json());


const { ObjectID } = require('mongodb')
const { UniversityApplication } = require('../models/universityApplication')


// Get all university applications
router.get('/', (req, res) => {

	// Otherwise, find by the id and creator
	UniversityApplication.find().then((applications) => {
		if (!applications) {
			res.status(404).send()  // could not find this student
		} else {
			res.send(applications)
		}
	}).catch((error) => {
		res.status(500).send()  // server error
	})
})

// Get university application with specified id
router.get('/:id', (req, res) => {

	// Otherwise, find by the id and creator
	UniversityApplication.findOne({_id: req.params.id}).then((application) => {
		if (!application) {
			res.status(404).send()  // could not find this student
		} else {
			res.send(application)
		}
	}).catch((error) => {
		res.status(500).send()  // server error
	})
})

// Create new university application
router.post('/', (req, res) => {

	const universityApplication = new UniversityApplication({
    name: req.body.name,
  	mailAddress: req.body.mailAddress,
  	letter: req.body.letter,
  	contact: req.body.contact
	})

	universityApplication.save().then((uniApp) => {
		res.send(uniApp)
	}, (error) => {
		res.status(400).send(error)
	})

})

module.exports = router;
