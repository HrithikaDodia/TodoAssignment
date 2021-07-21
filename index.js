const express = require('express');
const firebase = require('firebase');

const app = express();

app.use(express.json());

const { config } = require('./firebaseConfig');

const fb = firebase.initializeApp(config);
const db = fb.firestore();

app.listen(5000, () => console.log('App is listening to port 5000'));


app.post('/api/v1/todos', async (req, res) => {
    try{
        const data = req.body;
        const todo = await db.collection('todo').doc().set(data);
        res.send('Todo created successfully!!');
    }
    catch(error){
        res.status(404).send(error);
    };
});


app.get('/api/v1/todos', async (req, res) => {
    try{
        const data = await db.collection('todo').get();
        todosArr = [];

        data.forEach(element => {
            todosArr.push(
                {
                    id: element.id,
                    name: element.data().name,
                    description: element.data().description
                }
            )
        });
        res.send(todosArr);
    }
    catch(error){
        res.status(404).send(error);
    }
});


app.put('/api/v1/todos/:id', async (req, res) => {
    try{
        const id = req.params.id;
        const data = req.body;
        const todo = await db.collection('todo').doc(id).update(data);
        res.send('Todo updated successfully!!');
    }
    catch(error){
        res.status(404).send(error);
    }
});


app.delete('/api/v1/todos/:id', async (req, res) => {
    try{
        const id = req.params.id;
        const todo = await db.collection('todo').doc(id).delete();
        res.send('Todo deleted successfully!!');
    }
    catch(error){
        res.status(404).send(error);
    }
});