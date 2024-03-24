
import { TodoPreview } from "./TodoPreview.jsx"

export function TodoList({ todos,onRemoveTodo,onCheckBox }) {

    return <ul className="todo-list">
        {todos.map(todo =>
            <li className="todo-preview" key={todo._id}>
                <TodoPreview todo={todo} onCheckBox={onCheckBox} />
                <div>
                    <button onClick={() => {
                        onRemoveTodo(todo._id)
                    }}>x</button>
                    <button onClick={() => {
                        // onEditTodo(todo)
                    }}>Edit</button>
                </div>
            </li>
        )}
    </ul>
}



