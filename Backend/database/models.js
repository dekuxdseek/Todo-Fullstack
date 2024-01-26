const mongoose = require('mongoose');
const { todo } = require('node:test');

mongoose.connect('mongodb+srv://adminsid:xw05Ltqj0mIq3NKO@cluster001.wth6wk9.mongodb.net/');


let todoSchema = mongoose.Schema(
    {
        title : String,
        description : String,
        completed : Boolean
    }
);


let Todo = mongoose.model('Todos', todoSchema);

module.exports = {
    Todo
};