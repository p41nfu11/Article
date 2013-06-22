var mongoose = require('mongoose');
var config = require('../config');

console.log(config);

var questionSchema = new mongoose.Schema({
	q: String,
	createdDate: Date,
	a: [String],
	correctAnswer: String,
	article: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Article' }],
});


module.exports = mongoose.model('Question', questionSchema);