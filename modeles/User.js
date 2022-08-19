const mongoose = require('mongoose')
const bcrypt = require('bcrypt-nodejs')
const userSchema = new mongoose.Schema({
    first_name:{
        type: String ,
        required : true
    },
    last_name:{
        type: String ,
        required : true
    },
    email: {
        type: String ,
        required : true
    },
    password: {
        type : String,
        required : true
    },
    role:{
        type : String,
        required : true
    }

})

//methode pour crypty password
userSchema.methods.hashPassword = (password)=>{
    return bcrypt.hashSync(password,bcrypt.genSaltSync(10))
}

userSchema.methods.comparePasswords = (password,hash)=>{
    return bcrypt.compareSync(password,hash)
}

let User = mongoose.model('User',userSchema,'users')
module.exports = User