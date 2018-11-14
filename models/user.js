var mongoose=require('mongoose');
var bcrypt=require('bcrypt');
mongoose.connect('mongodb://localhost/nodeauth');
mongoose.Promise = global.Promise;

var db=mongoose.connection;
db.once('open', function() {
console.log("mongodb is connected!!");
});
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var Schema = require('mongoose').Schema;

//User schema
var UserSchema= new Schema({
	username :{
		type: String,
		index: true
	},
	password :{
		type: String,required :true,bcrypt: true

	},
	email :{
		type: String

	},
	name: {
		type: String

	},
	profileimage :{
		type: String

	}
});


var User=module.exports=mongoose.model('User',UserSchema);

module.exports.comparePassword = function(candidatePassowrd, hash, callback){
    bcrypt.compare(candidatePassowrd, hash, function(err, isMatch){
        if(err) return callback(err);
        callback(null, isMatch);
    });
}

module.exports.getUserById = function(id, callback){
    User.findById(id, callback);
}

module.exports.getUserByUsername = function(username, callback){
    var query = {username: username};
    User.findOne(query, callback);
}


module.exports.createUser=function(newUser,callback){
	bcrypt.hash(newUser.password,10,function(err,hash){
		
		if(err) throw  err;
		//set hased password

		newUser.password = hash;
		// create user
		newUser.save(callback);


	})
}
