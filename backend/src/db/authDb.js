const mongoose = require('mongoose') 
const validator = require('validator')
require('dotenv').config()

mongoose.connect(process.env.DB_URL)

const UserSchema = new mongoose.Schema({
    phoneNumber : {
        type : String,
        required : true,
        unique : true,
        trim : true,
        minLength : 10,
        maxLength : 10
    },
    name : {
        type : String,
        required : true,
        trim : true,
    },
    email : {
        type : String,
        required : true,
        unique : true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Not Valid Email')
            }
        }
    }
})

const OtpSchema = new mongoose.Schema({
    otp:{
        type:Number,
        required:true,
        unique:true,
        minLength:6,
        maxLength:6
    },
    email : {
        type : String,
        required : true,
        unique:true
    }

})

const User = mongoose.model('User',UserSchema)
const Otp = mongoose.model('Otp',OtpSchema)
module.exports = {User,Otp}

