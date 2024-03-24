const { useSelector, useDispatch } = ReactRedux;


export function AppFooter() {

  const user = useSelector(storeState => storeState.loggedInUser)

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
      <footer style={getStyleByUser()} className="flex center ">
        <p>&copy; Coffeerights Coding Academy 2023</p>
      </footer>
    )
  }
  