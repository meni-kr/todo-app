const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouterDOM
import { todoService } from '../services/todo.service.js'
import { showErrorMsg } from '../services/event-bus.service.js'

export function TodoDetails() {
    const params = useParams()
    const navigate = useNavigate()
    const [currTodo, setCurrTodo] = useState(null)

    useEffect(() => {
        const { id } = params
        todoService.getById(id)
            .then(todo => {
                if (!todo) return navigate('/todo')
                setCurrTodo(todo)
            })
            .catch(() => {
                showErrorMsg('Had issues loading todo');
            })
    }, [])

    if (!currTodo) return <h4>loading</h4>
    const { _id, txt, isDone, creatAt } = currTodo
    const formattedDate = new Date(creatAt).toLocaleString('he')
    return (
        <div className="todo-details flex scale-in-hor-right container">
            <div className="todo-data-container">
                <h1>To Do: {txt}</h1>
                <h2>Created at: {formattedDate}</h2>
                <h2>is done? {isDone ? 'yes' : 'no'}</h2>
                <h2>Id: {_id}</h2>

                <button className="back-btn" onClick={() => navigate('/todo')}>
                    Back to todos
                </button>
            </div>
        </div>
    )
}
