const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const UserSchema = new Schema({
    user_id : {
        type : String,
        required : true
    } ,
    hashed_password : {
        type : String,
        required : true
    } ,
    name : {
        type : String,
    } , 
    email : {
        type : String,
        required : true,
        unique : true
    } ,
    
})

module.exports = mongoose.model('Users',UserSchema);