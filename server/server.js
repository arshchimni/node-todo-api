const express = require('express');
const bodyParser = require('body-parser');


const {mongoose}=require('./db/mongoose');
const {Todo} = require('./db/models/Todo');
const {userInfo}= require('./db/models/User');

let app = express();

app.use(bodyParser.json());

app.post('/todo',(req,res)=>{

      let testInsert = new Todo({
    text:req.body.text,
    completed:req.body.completed,
    completedAt:req.body.completedAt
});

testInsert.save()
.then((result)=>res.status(200).send(result)).
catch((err)=>res.status(400).send(err));

});

app.get("/todos",(req,res)=>{
        Todo.find()
        .then((results)=>{
                res.status(200).send({results});
        })
        .catch((err)=>res.status(400).send(err));
})

app.listen(3000,(err)=>{
        if(err) throw err;
        else{
                console.log('server running at port 3000');
        }
});



module.exports.app=app;


// let testUser= new userInfo({
//         email:'ishdeep@gmail.com'
// });

// testUser.save()
// .then((result)=>console.log(result))
// .catch((err)=>console.log(err));
