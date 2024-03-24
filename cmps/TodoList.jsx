const { useState } = React
const { Link } = ReactRouterDOM

import { TodoPreview } from "./TodoPreview.jsx"

export function TodoList({ todos, onRemoveTodo, onCheckBox ,onEditTodo}) {

    const [isEdit, setIsEdit] = useState(false)
    const [todoToEdit, setTodoToEdit] = useState({ txt: '' })
    function onClickEditTodo(todo){
        setTodoToEdit(PrevTodo=>({...PrevTodo, ...todo}))
        setIsEdit(true)
    }
    function onChange(ev) {
        setTodoToEdit(PrevTodo=>({...PrevTodo,  txt: ev.target.value}))
    }
    function onSubmitTodo(ev) {
        ev.preventDefault()
        onEditTodo(todoToEdit)
        setIsEdit(false)
    }
    return (<React.Fragment>
        <ul className="todo-list">
            {todos.map(todo =>
                <li className="todo-preview" key={todo._id}>
                    <TodoPreview todo={todo} onCheckBox={onCheckBox} />
                    <div>
                        <button onClick={() => {
                            onRemoveTodo(todo._id)
                        }}>x</button>
                        <button onClick={() => {
                            onClickEditTodo(todo)
                        }}>Edit</button>
                        <Link to={`/todo/${todo._id}`}><button>Details</button></Link>

                    </div>
                </li>
            )}
        </ul>
        {
            isEdit && <div className="edit-todo-container">
               <form className="" onSubmit={onSubmitTodo}>
                <h3>Edit todo: </h3>
                <input type="text" onChange={onChange} value={todoToEdit.txt} />
                <button>save</button>
            </form> 
            </div>
            
        }
    </React.Fragment>

    )
}



