const express = require('express');
const bodyParser = require('body-parser');

const {ObjectID} = require('mongodb');
const {mongoose}=require('./db/mongoose');
const {Todo} = require('./db/models/Todo');
const {userInfo}= require('./db/models/User');

let app = express();

const port = process.env.PORT||3000;

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

app.get('/todo/:id',(req,res)=>{
        var id=req.params.id;
        if(!ObjectID.isValid(id)){
               return res.status(404).send();
        }
        Todo.findById(id)
        .then((result)=>{
               if(!result)res.status(404).send();
               else   res.status(200).send({result});
        })
        .catch((err)=>res.status(400).send());
})

app.listen(port,(err)=>{
        if(err) throw err;
        else{
                console.log(`server running at ${port}`);
        }
});



module.exports.app=app;


// let testUser= new userInfo({
//         email:'ishdeep@gmail.com'
// });

// testUser.save()
// .then((result)=>console.log(result))
// .catch((err)=>console.log(err));
