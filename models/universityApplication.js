const mongoose = require('mongoose')

const UniversityApplicationSchema = new mongoose.Schema({
	name: String,
	mailAddress: String,
	letter: String,
	contact: String
})

const UniversityApplication = mongoose.model('UniversityApplication',
UniversityApplicationSchema);
module.exports = { UniversityApplication }
