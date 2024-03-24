import { userService } from "../services/user.service.js"

const { createStore, compose } = Redux


//* Todos
export const SET_TODOS = 'SET_TODOS'
export const ADD_TODO = 'ADD_TODO'
export const REMOVE_TODO = 'REMOVE_TODO'
export const UPDATE_TODO = 'UPDATE_TODO'
export const INCREMENT = 'INCREMENT'
export const DECREMENT = 'DECREMENT'
export const SET_FILTER_BY = 'SET_FILTER_BY'

//* Loading
export const LOADING_IS_SHOWN = 'LOADING_IS_SHOWN'

// user
export const SET_USER = 'SET_USER'


const initialState = {
    todos: [],
    checkedTodoCount: 0,
    isLoadingShown: false,
    loggedInUser: userService.getLoggedinUser(),
    filterBy: { txt: '', isDone: 'all', pageIdx: 0 }
    
}


export function appReducer(state = initialState, action = {}) { // {type,  payload}

    switch (action.type) {

        case SET_TODOS:
            return { ...state, todos: action.todos }

        case REMOVE_TODO:
            return {
                ...state,
                todos: state.todos.filter(todo => todo._id !== action.todoId)
            }

        case ADD_TODO:
            return {
                ...state,
                todos: [...state.todos, action.todo]
            }

        case UPDATE_TODO:
            return {
                ...state,
                todos: state.todos.map(todo => todo._id === action.todo._id ? action.todo : todo)
            }
        case INCREMENT:
            // console.log(initialState.checkedTodoCount);
            return { ...state, checkedTodoCount: state.checkedTodoCount + 1 }
        case DECREMENT:
            return { ...state, checkedTodoCount: state.checkedTodoCount - 1 }

        case LOADING_IS_SHOWN:
            return { ...state, isLoadingShown: !state.isLoadingShown }

        case SET_USER:
            return {
                ...state,
                loggedInUser: action.user
            }

            case SET_FILTER_BY:
            return { ...state, filterBy: action.val }

        default:
            return state;
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export const store = createStore(appReducer, composeEnhancers())

window.gStore = store
