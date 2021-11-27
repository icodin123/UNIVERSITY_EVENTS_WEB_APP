const mongoose = require('mongoose')

const { UserSchema } = require('./user');
const {EventSchema} = require('./eventSchema');
const { ObjectID } = require('mongodb');

// EventInvitation Schema
const EventInvitationSchema = new mongoose.Schema({
	to: ObjectID,
	from: ObjectID,
	event: EventSchema
})


const EventInvitation = mongoose.model('EventInvitation', EventInvitationSchema)

module.exports = { EventInvitation : EventInvitation, EventInvitationSchema: EventInvitationSchema }
