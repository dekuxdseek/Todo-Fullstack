const CreateTodo = (props) =>{
    return <div id="createTodo">
              <input type="text" placeholder="title" value={props.title} onChange={(e)=> props.setTitle(e.target.value)}/><br />
              <input type="text" placeholder="description"  value={props.description}onChange={(e)=> props.setDescription(e.target.value)}/><br />
              <button onClick={props.addData}>Add Todo</button>
    </div>
  }
  
export default CreateTodo; 