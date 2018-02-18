//const {MongoClient, ObjectID} = require('mongodb');
 //using es6 object destructiong
 const MongoClient = require('mongodb').MongoClient;



MongoClient.connect('mongodb://127.0.0.1:27017/TodoApp',(err,db)=>{
    if(err){  
        console.log(err);
    }
    console.log('conncetion successfull');

    // db.collection('Todo').insertOne({
    //     text:'Testing insert in mongo',
    //     completed: false
    // },(err,result)=>{
    //     if(err) throw err;
    //     else console.log(JSON.stringify(result.ops,undefined,2));
    // })

    db.collection('Users').insertOne({
        Name:'Arshdeep',
        Age: 23,
        Location:'Bangaluru'
    },(err,result)=>{
        if(err) throw err;
        else console.log(JSON.stringify(result.ops,undefined,2));
    })

    db.close();
})