const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path'); 

const app = express();

app.use(express.json());
app.use(cors());

const uri = "mongodb+srv://kevinhuang:Hzh030926!!!@freecluster.pjomz.mongodb.net/todo-db?retryWrites=true&w=majority";

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("Connected to DB"))
    .catch((error) => console.log(error));

const Todo = require('./models/todo');

app.use(express.static(path.join(__dirname, 'build')));

app.get('/todos', async (req, res) => {
    const todos = await Todo.find();

    res.json(todos);
})

app.post('/todo/new', (req, res) => {
    const todo = new Todo({
        text: req.body.text
    });

    todo.save();

    res.json(todo);
})

app.delete('/todo/delete/:id', async (req, res) => {
    const todo = await Todo.findByIdAndDelete(req.params.id);

    res.json(todo);
})

app.get('/todo/complete/:id', async (req, res) => {
    const todo = await Todo.findById(req.params.id);

    todo.complete = !todo.complete;

    todo.save();

    res.json(todo);
})

// app.get('/*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

const port = process.env.PORT || 3000

app.listen(port, () => console.log(`Server up and running on port ${port}`));