const mongoose = require('mongoose')

const { UserSchema } = require('./user')
const { ObjectID } = require('mongodb');
const { Event, EventSchema, CustomFields, CustomFieldsSchema } = require('./eventSchema');

const UniversitySchema = new mongoose.Schema({
	name: String,
	login: String,
	password: String,
	email: String,
	description: String,
	eventOrganizers: [UserSchema],
	events: [EventSchema],
	profilePic: {
	    data: Buffer,
	    contentType: String
  	},
})

const University = mongoose.model('University', UniversitySchema)

module.exports = { University }
