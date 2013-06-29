var mongoose = require('mongoose');
var config = require('../config');

console.log(config);

var articleSchema = new mongoose.Schema({
	title: String,
	link: String,
	createdDate: Date,
	content: String,
	excerpt: String,
	poster: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
	views: Number,
	random: Number
});


module.exports = mongoose.model('Article', articleSchema);