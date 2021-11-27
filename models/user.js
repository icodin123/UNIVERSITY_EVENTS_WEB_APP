/* User model */
'use strict';

const mongoose = require('mongoose')
const { ObjectID } = require('mongodb')

const { EventSchema } = require('./eventSchema')
const { EventInvitationSchema } = require('./eventInvitation')

const UserSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		minlength: 1,
		trim: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
		minlength: 3
    },
  firstname: String,
  lastname: String,
  email: String,
  currentInstitution: String,
  programOfStudy: String,
  yearOfStudy: Number,
  isAdmin: Boolean,
  // Credit to stack-overflow post:
  // https://stackoverflow.com/questions/29780733/store-an-image-in-mongodb-using-node-js-express-and-mongoose
  profilePic: {
    data: Buffer,
    contentType: String
  },
  isEventOrganizer: Boolean,
  bio: String,
  friendRequests: [ObjectID],
  friends: [ObjectID],
  events: [EventSchema],
  eventsAttending: [EventSchema],
  eventInvites: [EventInvitationSchema],
  invitesSent: [EventInvitationSchema]

})


// make a model using the User schema
const User = mongoose.model('User', UserSchema)


module.exports = { User: User, UserSchema: UserSchema }
