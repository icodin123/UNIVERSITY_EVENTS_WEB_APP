const mongoose = require('mongoose')


const { UserSchema } = require('./user');
const { ObjectID } = require('mongodb');


const CustomFieldsSchema = new mongoose.Schema({
	fieldName: String,
	type: String,
	data: Array
})

// Making a Mongoose model a little differently: a Mongoose Schema
// Allows us to add additional functionality.
// Event Schema
const EventSchema = new mongoose.Schema({
	eventName: String,
	miniDesc: String,
	description: String,
	location: String,
	capacity: String,
	reserved: String,
	// Can just keep time, endTime as string as don't need to modify
	time: String,
	endTime: String,
	customFields: [CustomFieldsSchema],
	date: String,
	// User who created the event
	by: ObjectID,
	university: String,
	pic: {
		data: Buffer,
		contentType: String
	},
	attendees: [ObjectID]
})

const Event = mongoose.model('Event', EventSchema)
const CustomFields = mongoose.model('CustomFields', CustomFieldsSchema)

module.exports = { 
    Event: Event,
    EventSchema: EventSchema, 
    CustomFields: CustomFields,
    CustomFieldsSchema: CustomFieldsSchema
}