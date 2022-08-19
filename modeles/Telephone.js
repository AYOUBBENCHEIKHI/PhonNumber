const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    first_name:{
        type: String ,
        required : true
    },
    last_name:{
        type: String ,
        required : true
    },
    telephone: {
        type: String ,
        required : true
    },
    adress: {
        type : String,
        required : true
    },
    user_id:{
        type : String,
        required : true
    }

})

let Telephone = mongoose.model('Telephone',userSchema,'telephones')
module.exports = Telephone