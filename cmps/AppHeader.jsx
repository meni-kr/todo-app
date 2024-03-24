
const { NavLink, useNavigate } = ReactRouterDOM
const { useSelector, useDispatch } = ReactRedux;

import { LoginSignup } from './LoginSignup.jsx';
import { logout } from '../store/actions/user.actions.js';
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js';


export function AppHeader() {

  const user = useSelector(storeState => storeState.loggedInUser)
  const todos = useSelector(storeState => storeState.todos)
  const checkedTodosCount = useSelector(storeState => storeState.checkedTodosCount)

  function howMuchDone() {
    let count = 0
    todos.map(todo => {
      if (todo.isDone) count++
    }
    )
    return count
  }

  function onLogout() {
    logout()
      .then(() => {
        showSuccessMsg('logout successfully');
      })
      .catch(err => {
        showErrorMsg('OOPs try again');
      });
  }

  function getStyleByUser() {
    const prefs = {
      color: '',
      backgroundColor: ''
    }

    if (user && user.pref) {
 
      prefs.color = user.pref.color
      prefs.backgroundColor = user.pref.bgColor
    }

    return prefs
  }

  return (
    <section  className="header-container">
      <header style={getStyleByUser()} className="app-header full main-layout">
        <h1>Todo app</h1>
        <nav className="app-nav">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/todo">Todos</NavLink>
          {<NavLink to="/user">Profile</NavLink>}
          {/* {user.isAdmin && <NavLink to="/admin">Admin</NavLink>} */}
        </nav>

        {user ? (
          <section>
            <span to={`/user/${user._id}`}>
              Hello {user.fullname}
            </span>
            <progress value={howMuchDone()} max={todos.length}></progress>
            <button onClick={onLogout}>Logout</button>
          </section>
        ) : (
          <section>

            <LoginSignup />
          </section>
        )}
      </header>
    </section>

  )
}