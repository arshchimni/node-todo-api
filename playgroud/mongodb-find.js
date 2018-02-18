const {MongoClient, ObjectID}=require('mongodb'); //using es6 object destructiong



MongoClient.connect('mongodb://127.0.0.1:27017/TodoApp',(err,db)=>{
    if(err) {
        console.log('cannot connect ');
         console.log(err);
    }
    console.log('conncetion successfull');

//find returns a cursor hence we have to convert it into an array 
//toArray returns a promise
// db.collection('Users').find({
//  _id: new ObjectID("5a89200f6b50c131d8f6fa06")
// })
// .toArray()
// .then((docs)=>{
//         console.log(JSON.stringify(docs,undefined,2))
//     })
//     .catch((err)=>{
//         console.log(err);
//     }) 

db.collection('Users').find({
    Location:'Amritsar'
   })
   .toArray()
   .then((docs)=>{
           console.log(JSON.stringify(docs,undefined,2))
       })
       .catch((err)=>{
           console.log(err);
       }); 
   
       db.collection('Users').find()
       .count()
       .then((count)=>{
               console.log(`Users in the db ${count}`)
           })
           .catch((err)=>{
               console.log(err);
           }); 
       

    db.close();
})