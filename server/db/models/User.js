

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

//instance method
userSchema.methods.toJSON = function(){
    let user = this;
    let userObj = user.toObject();

    return _.pick(userObj,['_id','email']);
};

//instance method
userSchema.methods.getAuthToken = function(){
    let user = this;
    let acess="auth";
    let token = jwt.sign({_id:user._id.toHexString(),acess},'abc123').toString();
    user.tokens.push({acess,token});

    return user.save().then(()=>{
        return token
    })
};


//model method
userSchema.statics.findByToken = function(token){
    //bind this to the model
    let userInfo = this;
    let decoded;
    try {
        decoded=jwt.verify(token,'abc123');
    } catch (error) {
        // return new Promise((resolve,reject)=>{
        //     reject();
        // })

        return Promise.reject();
    }
    return userInfo.findOne({
        '_id':decoded,
        'tokens.token':token,
        'tokens.acess':'auth'
    })
};
var userInfo=mongoose.model("User", userSchema);

module.exports.userInfo=userInfo;