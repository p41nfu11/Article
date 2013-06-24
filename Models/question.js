var mongoose = require('mongoose');
var config = require('../config');

console.log(config);

var questionSchema = new mongoose.Schema({
	question: String,
	createdDate: Date,
	answer: [String],
	correctAnswer: String,
	article: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Article' }],
});


module.exports = mongoose.model('Question', questionSchema);