const express = require('express');
const app = express();
const path = require('path');
//const { logEvents } = require('./middleware/logEvents');
// 사용자가 만든 미들웨어
const fs = require('fs'); 
const cors = require('cors');

let todoList = [
    {
        id:1,
        checked:false,
        item:'orange'
    },
    {
        id:2,
        checked:false,
        item:'apple'
    },
    {
        id:3,
        checked:true,
        item:'smile'
    },
]
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({extended :false}));

 
app.use((req, res, next)=>{
    console.log( req.url,  req.method );
    //logEvents(`${req.url}  ${req.method}`)
    next();
})

 
app.get('/todos', (req, res)=>{
    res.send(todoList);
    // res.json(todoList);
})
 
app.post('/todos', (req,res)=>{
    const item = req.body.item;
    const todo = {
        id : todoList.length ? todoList[todoList.length - 1].id + 1 : 1,
        checked:false,
        item : item
    }
    todoList.push(todo);

    res.send(todoList);
})

app.put('/todos', (req,res)=>{
    const id = req.body.id;
    const todos = todoList.map( 
        item => item.id === id ?  { ...item, checked: !item.checked} : item ); 
    todoList = todos; 
    res.send(todoList);
})

app.delete('/todos/:id', (req,res)=>{
    const{ id }= req.params ;
    console.log(id)
    const todos = todoList.filter( todo=> parseInt(todo.id) !== parseInt(id) );
    todoList = todos; 
    console.log('length : ', todos.length)
    res.send(todoList);
})

app.get('/*', (req, res)=>{
    res.send('file not found');
})

app.listen(3500, ()=>{
    console.log('app listening ', 3500);
})