var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var website = new Schema({
	userid: String,
	name:  String,
	template:  String,
	contactemail: String,
	logo:   String,
	aside: String,
	footer: String,
	subpage: [{ title: String, url: {type:String, index:{unique:true}}, content: String, menuIndex: Number, date: Date }]
});

var Website = mongoose.model('Website', Website);
module.exports=Website;