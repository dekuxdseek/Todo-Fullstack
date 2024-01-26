const express = require('express');

const {createTodo, updateTodo, deleteTodo} = require('./types');
const {Todo} = require('./database/models');

const app = express();

const port = 3000 || process.env.PORT;

app.use(express.json());

app.get('/', async (req, res)=>{
    let allTodos = await Todo.find({});
    res.send(allTodos);
});

app.post('/', async (req, res) =>{

    let newTodoData = req.body;

    // input validate
    let newTodoValidate = createTodo.safeParse(newTodoData);
    if(!newTodoValidate.success) return res.status(411).json({
        msg : 'Invalid new todo datatype'
    });


    // add in mongodb
    let newTodo = {
        title : newTodoData.title,
        description : newTodoData.description,
        completed : false
    }
    let todo = new Todo(newTodo);
    
    try{
        await todo.save();
    }
    catch(err)
    {
        return res.status(500).json({
            msg : "Error saving new todo"
        });
    }

    res.json({
        id : todo._id,
        msg : "Successfully saved new todo"
    });
});

app.delete('/:id', async(req, res)=>{
    
    let id = req.params.id;

    let idValidate = deleteTodo.safeParse(id);
    
    if(!idValidate.success) return res.send('Invalid id datatype');

    // delete from mongodb
    try{
        let todoRemoveResponse = await Todo.findByIdAndDelete(id);

        if(!todoRemoveResponse) return res.status(411).json({
            msg : "Todo with provided id doesn't exist"
        })
    }catch(err)
    {
        return res.status(500).json({
            msg : "Error removing todo from DB"
        })
    }

    res.send('Successfully removed Todo');    
});

app.put('/:id', async(req, res) =>{
    
    let id = req.params.id;

    let updatedTodo= {
        id : id,
        title : req.body.title,
        description : req.body.description,
        completed : req.body.completed
    };

    let updatedTodoValidate = updateTodo.safeParse(updatedTodo);
    if(!updatedTodoValidate.success) return res.send('Invalid toBeUpdated Todo datatype');

    // update in mongodb
    try{
        await Todo.findByIdAndUpdate(updatedTodo.id, updatedTodo);
        // console.log(todoUpdateResponse);
    }
    catch(err){
        return res.status(500).json({
            msg : "Error in updating todo in DB(can be wrong id or internal)"
        });   
    }

    res.send('Todo Updated Successfully');
});

app.use((err, req, res, next) =>{
    if(err)  res.send('error aaya');
});

app.listen(port, ()=>{
    console.log(`Listening on ${port}...`);
});