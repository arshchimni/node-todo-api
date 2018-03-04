const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');
const {authenticate} = require('./middleware/authenticate');
const { ObjectID } = require('mongodb');
const { mongoose } = require('./db/mongoose');
const { Todo } = require('./db/models/Todo');
const { userInfo } = require('./db/models/User');

let app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todo', (req, res) => {

        let testInsert = new Todo({
                text: req.body.text,
                completed: req.body.completed,
                completedAt: req.body.completedAt
        });

        testInsert.save()
                .then((result) => res.status(200).send(result)).
                catch((err) => res.status(400).send(err));

});

app.get("/todos", (req, res) => {
        Todo.find()
                .then((results) => {
                        res.status(200).send({ results });
                })
                .catch((err) => res.status(400).send(err));
})

app.get('/todo/:id', (req, res) => {
        var id = req.params.id;
        if (!ObjectID.isValid(id)) {
                return res.status(404).send();
        }
        Todo.findById(id)
                .then((result) => {
                        if (!result) res.status(404).send();
                        else res.status(200).send({ result });
                })
                .catch((err) => res.status(400).send());
});

app.delete("/todo/:id", (req, res) => {
        var id = req.params.id;
        if (!ObjectID.isValid(id)) {
                return res.status(404).send();
        }
        Todo.findByIdAndRemove(id)
                .then((result) => {
                        if (!result) res.status(404).send();
                        else res.status(200).send({ result });
                })
                .catch((err) => res.status(400).send());
});

app.patch("/todo/:id", (req, res) => {
        var id = req.params.id;
        var body = _.pick(req.body, ['text', 'completed']);
        if (!ObjectID.isValid(id)) {
                return res.status(404).send();
        }
        if (_.isBoolean(body.completed) && body.completed) {
                body.completedAt = new Date().getTime();
        } else {
                body.completedAt = null;
                body.completed = false;
        }

        Todo.findByIdAndUpdate(id, { $set: body }, { new: true })
                .then((result) => {
                        if (!result) return res.status(404).send();
                        else res.status(200).send({ result });
                })
                .catch((err) => res.status(400).send());

});

app.post('/users', (req, res) => {
        let body = _.pick(req.body, ['email', 'password']);
        let newUser = new userInfo(body);

        newUser.save()
                .then(() => {
                        return newUser.getAuthToken();
                }).then((token) => res.header('x-auth', token).send(newUser))
                .catch((err) => res.status(400).send(err));

});



app.get('/users/me',authenticate,(req,res)=>{
       res.status(200).send(req.user);
})

app.listen(port, (err) => {
        if (err) throw err;
        else {
                console.log(`server running at ${port}`);
        }
});



module.exports.app = app;


// let testUser= new userInfo({
//         email:'ishdeep@gmail.com'
// });

// testUser.save()
// .then((result)=>console.log(result))
// .catch((err)=>console.log(err));
