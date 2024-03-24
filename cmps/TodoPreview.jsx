

export function TodoPreview({ todo,onCheckBox }) {

    return (<React.Fragment>
        {
            todo.isDone &&    <React.Fragment>
             <input type="checkbox" id={todo._id} onClick={()=>onCheckBox(todo)} defaultChecked/>
              <label htmlFor={todo._id}>{todo.txt}</label>
           </React.Fragment> 
        }
    
        {
            !todo.isDone &&   <React.Fragment>
        <input type="checkbox" id={todo._id} onClick={()=>onCheckBox(todo)}/>
        <label htmlFor={todo._id}>{todo.txt}</label>
         </React.Fragment>  
        }
    </React.Fragment>
    
    )
}