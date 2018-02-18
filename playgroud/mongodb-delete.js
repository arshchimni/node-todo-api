const {MongoClient, ObjectID}=require('mongodb'); //using es6 object destructiong



MongoClient.connect('mongodb://127.0.0.1:27017/TodoApp',(err,db)=>{
    if(err) {
        console.log('cannot connect ');
         console.log(err);
    }
    console.log('connection successfull');

    // //delete Many

    // db.collection('Todo')
    // .deleteMany({text:"Have lunch"})
    // .then((results)=>console.log(results))
    // .catch((err)=>console.log(err))
    
    //delete one

    // db.collection('Todo')
    // .deleteOne({text:'walk navab'})
    // .then((result)=>console.log(result))
    // .catch((err)=>console.log(err))

    //find one and delete

    db.collection('Todo')
    .findOneAndDelete({_id:new ObjectID("5a87df6b9666641e18664306")})
    .then((result)=>console.log(result))
     .catch((err)=>console.log(err))

    db.close();
})