

const mongoose=require('mongoose');
const validator=require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

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
//mongoose middle ware , run it before save event
userSchema.pre('save',function(next){
    let user= this;
    if(user.isModified('password')){
 bcrypt.genSalt(10,(err,salt)=>{
     bcrypt.hash(user.password,salt,(err,hash)=>{
         user.password= hash;
         next();
     })
 })
}else{
    next();
}
});

userSchema.statics.findByCredentials=function(email,password){
    let userInfo=this;
    
    return userInfo.findOne({
        'email':email
    }).then((user)=>{
        if(!user){
            return Promise.reject();
        }
        return new Promise((resolve,reject)=>{
            bcrypt.compare(password,user.password,(err,res)=>{
                if(res)  resolve(user);
                else reject();
            });
        });
    })

};
var userInfo=mongoose.model("User", userSchema);

module.exports.userInfo=userInfo;