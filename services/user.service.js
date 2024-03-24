import { storageService } from './async-storage.service.js'

const STORAGE_KEY = 'userDB'
const STORAGE_KEY_LOGGEDIN = 'loggedinUser'

export const userService = {
    login,
    logout,
    signup,
    getById,
    getLoggedinUser,
    updateScore,
    getEmptyCredentials,
    updateUserPreffs,
    addActivity
}


function getById(userId) {
    return storageService.get(STORAGE_KEY, userId)
}

function login({ username, password }) {
    return storageService.query(STORAGE_KEY)
        .then(users => {
            const user = users.find(user => user.username === username)
            // if (user && user.password !== password) return _setLoggedinUser(user)
            if (user) return _setLoggedinUser(user)
            else return Promise.reject('Invalid login')
        })
}

function signup(newUser) {
    const userToAdd = getEmptyCredentials()
    const user = { ...userToAdd,...newUser}
    return storageService.post(STORAGE_KEY, user)
        .then(_setLoggedinUser)
}


function updateScore(diff) {
    const loggedInUserId = getLoggedinUser()._id
    return userService.getById(loggedInUserId)
        .then(user => {
            if (user.score + diff < 0) return Promise.reject('No credit')
            user.score += diff
            return storageService.put(STORAGE_KEY, user)
        })
        .then(user => {
            _setLoggedinUser(user)
            return user.score
        })
}

function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN)
    return Promise.resolve()
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN))
}

function _setLoggedinUser(user) {
    const userToSave = { _id: user._id, fullname: user.fullname, pref: user.pref }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(userToSave))
    return userToSave
}

function updateUserPreffs(userToUpdate) {
    const loggedinUserId = getLoggedinUser()._id
    return getById(loggedinUserId)
        .then(user => {
            user.fullname = userToUpdate.fullname
            user.pref.color = userToUpdate.color
            user.pref.bgColor = userToUpdate.bgColor
            return storageService.put(STORAGE_KEY, user)
                .then((savedUser) => {
                    _setLoggedinUser(savedUser)
                    return savedUser
                })
        })
}

function addActivity(type, todoId) {
    const activity = {
        txt: `${type} a Todo with id : ${todoId}`,
        at: Date.now()
    }
    const loggedinUser = getLoggedinUser()
    if (!loggedinUser) return
    return getById(loggedinUser._id)
        .then(user => {
            if (!user.activities) user.activities = []
            user.activities.unshift(activity)
            return user
        })
        .then(userToUpdate => {
            return storageService.put(STORAGE_KEY, userToUpdate)
                .then((savedUser) => {
                    _setLoggedinUser(savedUser)
                    return savedUser
                })
        })
}


function getEmptyCredentials() {
    return {
        username: '',
        password: '',
        fullname: '',
        activities:[],
        pref:{
            color:'',
            bgColor:''
        }
    }
}


// Test Data
// userService.signup({username: 'bobo', password: 'bobo', fullname: 'Bobo McPopo'})
// userService.login({username: 'bobo', password: 'bobo'})



