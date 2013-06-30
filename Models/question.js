var mongoose = require('mongoose');
var config = require('../config');

console.log(config);

var questionSchema = new mongoose.Schema({
	question: String,
	createdDate: Date,
	answer: Boolean,
	article: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Article' }],
});


module.exports = mongoose.model('Question', questionSchema);