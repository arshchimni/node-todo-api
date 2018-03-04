const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
let data={
    id:66,
    password:'Hello Jwt'
};

bcrypt.genSalt(10,(err,salt)=>{
    bcrypt.hash(data.password,salt,(err,hash)=>{
        console.log(hash);
    })
})

// let token=jwt.sign(data,"123abc");
// console.log(token);

// let decoded=jwt.verify(token,'123abc');
// console.log(decoded);
// let message= 'Hello hashing bro';

// let hash = SHA256(message).toString();

// console.log(`${message}`);
// console.log(`${hash}`);