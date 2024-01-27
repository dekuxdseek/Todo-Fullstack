import { useState } from "react";
import CreateTodo from "./Components/CreateTodo";
import Todos from "./components/Todos";

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');


const getData = async() => {
  let todos = await fetch("http://localhost:3000/", {method: 'GET'});
  let jsonTodos = await todos.json();
  setTodos(jsonTodos);
}

const addData = async() =>{
 await fetch("http://localhost:3000/", {  method : 'POST',  headers : {   "Content-type" : "application/json"} , body : JSON.stringify({ title : title, description: description
  })});

  setTitle('');
  setDescription('');
  getData();
}
  return (
    <div>
      <CreateTodo title={title} description={description} setTitle={setTitle} setDescription={setDescription} addData={addData}/>
      {todos.map((todo) => (<Todos title={todo.title} description={todo.description} _id={todo._id}/>))}
    </div>
  )
}
export default App;
