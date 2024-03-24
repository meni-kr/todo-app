
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

const STORAGE_KEY = 'todoDB'
const PAGE_SIZE = 8
export const todoService = {
    query,
    getById,
    save,
    remove,
    getEmptyTodo,
    getDefaultFilter
}


_createTodos()

function query(filterBy = { txt: '', isDone: 'all', pageIdx: 0 }) {
    return storageService.query(STORAGE_KEY)
        .then(todos => {
            if (filterBy.txt) {
                const regex = new RegExp(filterBy.txt, 'i')
                todos = todos.filter(todo => regex.test(todo.txt))
            }
            if (filterBy.isDone !== 'all') {
                todos = todos.filter((todo) => (filterBy.isDone === 'done' ? todo.isDone : !todo.isDone))
            }
            if (filterBy.pageIdx !== undefined) {
                const startIdx = filterBy.pageIdx * PAGE_SIZE
                todos = todos.slice(startIdx, PAGE_SIZE + startIdx)
            }
            return todos
        })



}

function getById(todoId) {
    return storageService.get(STORAGE_KEY, todoId)
}

function remove(todoId) {
    // return Promise.reject('Not now!')
    return storageService.remove(STORAGE_KEY, todoId).then(() => {
        userService.addActivity('Removed', todoId)
    })
}


function save(todo) {
    if (todo._id) {
        return storageService.put(STORAGE_KEY, todo).then(savedTodo => {
            userService.addActivity('Updated', savedTodo._id)
            return savedTodo
        })
    } else {
        todo.createdAt = Date.now()
        return storageService.post(STORAGE_KEY, todo).then((savedTodo) => {
            userService.addActivity('Added', savedTodo._id)
            return savedTodo
        })
    }
}

function getEmptyTodo() {
    return {
        txt: '',
        isDone: false,
    }
}

function getDefaultFilter() {
    return { txt: '', isDone: 'all', pageIdx: 0 }
}

function _createTodos() {
    let todos = utilService.loadFromStorage(STORAGE_KEY)
    if (!todos || !todos.length) {
        todos = []
        todos.push(_createTodo())
        todos.push(_createTodo())
        todos.push(_createTodo())
        todos.push(_createTodo())
        utilService.saveToStorage(STORAGE_KEY, todos)
    }

}

function _createTodo() {
    const todo = getEmptyTodo()
    todo._id = utilService.makeId()
    todo.creatAt = Date.now()
    todo.txt = utilService.makeLorem(2)
    return todo
}

// TEST DATA
// storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 6', price: 980}).then(x => console.log(x))


