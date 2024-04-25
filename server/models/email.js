var mongoose = require('mongoose');
var userschema = mongoose.Schema({
    email: String,
    password: String,
    phone:Number
});

// Create a Mongoose model named 'Post' using the schema
module.exports = mongoose.model('users', userschema);
