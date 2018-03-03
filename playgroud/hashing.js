const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');

let data={
    id:66,
    password:'Hello Jwt'
}

let token=jwt.sign(data,"123abc");
console.log(token);

let decoded=jwt.verify(token,'123abc');
console.log(decoded);
// let message= 'Hello hashing bro';

// let hash = SHA256(message).toString();

// console.log(`${message}`);
// console.log(`${hash}`);