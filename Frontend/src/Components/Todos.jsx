const Todos = (props) =>{
    return <div id={props._id}>
                <div>{props.title}</div>
                <div>{props.description}</div>
                <button>Edit</button>
                <button>Mark Done</button>
                <button>Delete</button>
              </div>
  }

export default Todos;