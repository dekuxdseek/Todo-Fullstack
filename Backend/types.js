const zod = require('zod');

let createTodoSchema = zod.object({
    title : zod.string(),
    description : zod.string()
});


let updateSchema = zod.object({
    id : zod.string(),
    title : zod.string(),
    description : zod.string(),
    completed : zod.boolean()
});

let deleteSchema = zod.string();

module.exports = {
    createTodo : createTodoSchema,
    updateTodo : updateSchema,
    deleteTodo : deleteSchema
}