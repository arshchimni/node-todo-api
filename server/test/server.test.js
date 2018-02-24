const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Todo} = require('./../db/models/Todo');


beforeEach((done)=>{
    Todo.remove({})
    .then(()=> done())
})


describe('POST /todo',()=>{
    it("should save a todo",(done)=>{
        let text = "Test Text Todo";
        request(app)
        .post('/todo')
        .send({text})
        .expect(200)
        .expect((res)=>{
            expect(res.body.text).toBe(text)
        })
        .end((err,res)=>{
            if(err){
                return done(err);
            }
            Todo.find()
            .then((results)=>{
                expect(results.length).toBe(1);
                expect(results[0].text).toBe(text);
                done();
            })
            .catch((err)=>{
                throw err;
            })
        });
    });

    it("should not save a new todo",(done)=>{
        request(app)
        .post('/todo')
        .send({})
        .expect(400)
        .expect((res)=>{
            expect(res.body.text).toBe(undefined)
        })
        .end((err,res)=>{
            if(err){
                return done(err);
            }
            Todo.find()
            .then((results)=>{
                expect(results.length).toBe(0);
              //  expect(results[0].text).toBe(text);
                done();
            })
            .catch((err)=>{
                throw err;
            })
        });
    })
})