const mongoose=require('mongoose');

var userInfo=mongoose.model("User",{
    email:{
            type:String,
            required:true,
            minlength:1,
            trim:true
    }
});

module.exports.userInfo=userInfo;