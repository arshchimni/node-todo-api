const mongoose=require('mongoose');
const validator=require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

let userSchema = mongoose.Schema({
    email:{
            type:String,
            required:true,
            minlength:1,
            trim:true,
            unique:true,
            validate:{
                validator: validator.isEmail,
                message:'{value} is not a valid email id'
            }
    },
    password:{
        type:String,
        required:true,
        minlength:6,
    },
    tokens:[{
        acess:{
            type:String,
            required:true,
        },
        token:{
            type:String,
            required:true,
        }
    }]
});

userSchema.methods.toJSON = function(){
    let user = this;
    let userObj = user.toObject();

    return _.pick(userObj,['_id','email']);
};

userSchema.methods.getAuthToken = function(){
    let user = this;
    let acess="auth";
    let token = jwt.sign({_id:user._id.toHexString(),acess},'abc123').toString();
    console.log('in get auth');
    user.tokens.push({acess,token});

    return user.save().then(()=>{
        return token
    })
};
var userInfo=mongoose.model("User", userSchema);

module.exports.userInfo=userInfo;