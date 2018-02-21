const {MongoClient, ObjectID}=require('mongodb'); //using es6 object destructiong



MongoClient.connect('mongodb://127.0.0.1:27017/TodoApp',(err,db)=>{
    if(err) {
        console.log('cannot connect ');
         console.log(err);
    }
    console.log('connection successfull');

//   db.collection('Todo').findOneAndUpdate({
//     _id: new ObjectID("5a892ad2974078f15a215ac2")
//   },{
//       $set:{
//           completed:true
//       }
//   },{
//       returnOriginal:false
//   }).then((result)=>console.log(result));

    db.collection('Users').findOneAndUpdate({
        _id: new ObjectID("5a87e043a68d3f1ddc54b34a")
    },{
        $set:{
            Name:"Richa"
        },
        $inc:{
            Age:1
        }
    },{
        returnOrignal:false
    }).then((result)=>console.log(result));

    db.close();
})