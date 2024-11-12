const mongoose = require("mongoose")

const UserAccount = mongoose.Schema({

    userName: {type:String},
    userEmail: {type:String},
    userPassword: {type:String},
    userImage: {type:String},
    userStatus: {type:String},


})
 

module.exports= mongoose.model("UserAccount",UserAccount)