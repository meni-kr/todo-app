const { useState, useEffect } = React
const { useSelector, useDispatch } = ReactRedux

import { todoService } from '../services/todo.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'

import { loadTodos,removeTodo,saveTodo,checkTodo } from '../store/actions/todo.actions.js'
import { SET_FILTER_BY } from '../store/reducers/todo.reducer.js'

import { TodoFilter } from '../cmps/TodoFilter.jsx'
import { TodoAdd } from '../cmps/TodoAdd.jsx'
import { TodoSort } from '../cmps/TodoSort.jsx'
import { TodoList } from '../cmps/TodoList.jsx'
import { Loading } from '../cmps/Loading.jsx'

export function TodoIndex() {
    const dispatch = useDispatch()

    const todos = useSelector(storeState => storeState.todoModule.todos)
    const filterBy = useSelector((storeState) => storeState.todoModule.filterBy)

    const [sortBy, setSort] = useState('time')
    // const count = useSelector(storeState => storeState.checkedTodoCount)
    // console.log(count);
    // const isLoadingShown = useSelector(storeState => storeState.isLoadingShown)
    // console.log(isLoadingShown);

    useEffect(() => {
        loadTodos(filterBy)
            .catch(err => {
                showErrorMsg('Cannot load todos!')
            })
    }, [filterBy])

    function setFilter(filter) {
        const action = {
            type: SET_FILTER_BY,
            val: filter,
        }
        dispatch(action)
    }

    function onSetSort(sort) {
        setSort(sort)
    }

    function todosForDisplay() {
        let sortedTodos = [...todos]
        if (sortBy === 'txt') {
            sortedTodos = sortedTodos.sort((a, b) => a.txt.localeCompare(b.txt));
        } else {
            sortedTodos = sortedTodos.sort((a, b) => a.createdAt - b.createdAt);
        }
        return sortedTodos
    }

function onRemoveTodo(todoId){
    removeTodo(todoId)
            .then(() => {
                showSuccessMsg('Todo removed')
            })
            .catch(err => {
                showErrorMsg('Cannot remove todo')
            })
}

    function onAddTodo(todoToAdd){
        // const todoToSave = todoService.getEmptyTodo()

        // TODO: move to a function and use dispatch
        saveTodo(todoToAdd)
            .then((savedTodo) => {
                showSuccessMsg(`Todo added (id: ${savedTodo._id})`)
            })
            .catch(err => {
                showErrorMsg('Cannot add todo')
            })
    }

    function onEditTodo(todoToSave) {
        saveTodo(todoToSave)
            .then((savedTodo) => {
                showSuccessMsg(`Todo added (id: ${savedTodo._id})`)
            })
            .catch(err => {
                showErrorMsg('Cannot add todo')
            })
    }

    function onCheckBox(todo) {
        checkTodo(todo)
        .then((savedTodo) => {
            // showSuccessMsg(`Car added (id: ${savedTodo._id})`)
        })
        .catch(err => {
            showErrorMsg('Cannot check todo')
        })
		

	}

    // if (!todos.length) return <h1>Loading...</h1>
    return (
        <div>
            <h1>Todos</h1>
            <main>
                
                <TodoFilter onSetFilter={setFilter} onSetSort={onSetSort}/>
                <TodoAdd onAddTodo={onAddTodo}/>
                
                <TodoList 
                todos={todosForDisplay()} 
                onRemoveTodo={onRemoveTodo} 
                onCheckBox={onCheckBox}
                onEditTodo={onEditTodo}
                />
            </main>
        </div>
    )
}