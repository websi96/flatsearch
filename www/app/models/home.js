
//app/models/user.js
//load the things we need
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

//define the schema for our user model
var userSchema = mongoose.Schema({
	_id:{ type: Number, default: 1 },
	name: String,
	mail: String,
	password: String,
	status: String,
	created_date: Date,
	updated_date: Date,
	active_hash: String,
	role_id: { type: Number, default: 2 },
	newsletter: { type: Boolean, default: true },
	plz_interests: { type: Array, default: [] },
	flats: { type: Array, default: [] },
	notificationrate: { type: Number, default: 1 },
	max_costs: { type: Number, default: 1000 },
});


//methods ======================
//generating a hash
userSchema.methods.generateHash = function(password) {
 return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

//checking if password is valid
userSchema.methods.validPassword = function(password) {
 return bcrypt.compareSync(password, this.password);
};

//create the model for users and expose it to our app
module.exports = mongoose.model('ex_users', userSchema);