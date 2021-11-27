var express = require('express');
var router = express.Router();
const multer  = require('multer');
var upload = multer({ dest: 'upload/'});
const { mongoose } = require('./mongoose');
var fs = require("fs");

const { Event } = require('../models/eventSchema');


// Return all the events
router.get('/', (req, res) => {
    console.log('events');
	// Otherwise, find by the id and creator
	Event.find().then((events) => {
		if (!events) {
			res.status(404).send()  // could not find this student
		} else {
			res.send(events)
		}
	}).catch((error) => {
		res.status(500).send()  // server error
	})
})


// Return event with specified id
router.get('/:id', (req, res) => {

	// Otherwise, find by the id and creator
	Event.findOne({_id: req.params.id}).then((event) => {
		if (!event) {
			res.status(404).send()  // could not find this student
		} else {
			res.send(event)
		}
	}).catch((error) => {
		res.status(500).send()  // server error
	})
})


// Return all the events by given user
router.get('/user/:id', (req, res) => {

	// Otherwise, find by the id and creator
	Event.find({by: req.params.id}).then((events) => {
		if (!events) {
			res.status(404).send()  // could not find this student
		} else {
			res.send(events)
		}
	}).catch((error) => {
		res.status(500).send()  // server error
	})
})






// Return all events that belong to given university
router.post('/university', (req, res) => {

	// Otherwise, find by the id and creator
	Event.find({university: req.body.name}).then((events) => {
		if (!events) {
			res.status(404).send()  // could not find this student
		} else {
			res.send(events)
		}
	}).catch((error) => {
		res.status(500).send()  // server error
	})


})







// ROUTE sends page to create a new event


// router.post('/createEvent', (req, res) => {
//     console.log("event creation form has been submitted");
//     console.log(req.body);
//     new formidable.IncomingForm().parse(req, (err, fields, files) => {
//         if (err) {
//           console.error('Error', err)
//           throw err
//         }
//         //console.log('Fields', fields)
//         //console.log('Files', files)
//         for (const file of Object.entries(files)) {
//           console.log(file)
//         }
//     });
// });
var type = upload.single('eventImage');
router.post("/createEvent", type, function(req, res) {
    console.log(req.body);
    //console.log(req.file);
    const image_data = new Buffer(fs.readFileSync(req.file.path)).toString("base64");
    const customFields = [];
    const fields = req.body.cf.split('|');

    for (let i = 0; i< fields.length; i ++){
        if (fields[i].length > 0){
            const data = fields[i].split('\~');
            customFields.push({
                fieldName: data[0],
                type: data[1],
                description: data[2],
                data: data.splice(3, data.length)
            });
        }
    }

    //console.log(customFields);
    console.log(req.session.university)

    const newEvent = new Event({
        eventName : req.body.eventName,
        miniDesc : req.body.shortDescription,
        description: req.body.description,
        location: req.body.location,
        capacity: req.body.capacity,
        reserved: req.body.reserved,
        time: req.body.time,
        endTime: req.body.endTime,
        customFields: customFields,
        date: req.body.date,
        by: req.session.user,
        university: req.session.university,
        pic: {data: image_data, contentType:"image"},
        attendees: []
    });

    newEvent.save().then((result)=>{
        console.log(result);
        // then link to some page.
        const context = {
            eventId: result._id,
            eventPic: result.pic,
            eventName: result.eventName,
            eventDescription: result.description,
            eventDate: result.date,
            eventLoc: result.location,
            eventStart: result.time,
            eventEnd: result.endTime,
            eventUni: result.university,
            eventOrganizer: result.by,
            eventOccupied: result.attendees.length,
            eventCapacity: result.capacity
        }
        res.redirect('/events');
    }).catch((error) => {
        console.log(error);
    });


});


module.exports = router;
