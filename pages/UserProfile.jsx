const { useState, useEffect } = React
const { useSelector, useDispatch } = ReactRedux
import { userService } from '../services/user.service.js'
import { SET_USER } from '../store/reducers/user.reducer.js'
import { updateUser } from '../store/actions/user.actions.js'

export function UserProfile() {
    const loggedInUser = useSelector((storeState) => storeState.userModule.loggedInUser)
    const [userDetails, setUserDetails] = useState(null)
   

    useEffect(() => {
        if (loggedInUser) loadUser()
    }, [])

    function loadUser() {
        userService.getById(loggedInUser._id).then(user => {
            
            setUserDetails({
                fullname: user.fullname || '',
                color: user.pref.color || '#eeeeee',
                bgColor: user.pref.bgColor || '#191919',
                activities: user.activities || []
            })
        })
    }

    function getActivityTime(activity) {
        const { at } = activity
        const timeDiff = new Date(Date.now() - at)
        const atByMin = timeDiff.getMinutes()
        if (atByMin < 60) return atByMin + ' minutes ago:'
        else if (atByMin > 60) return 'Couple of hours ago: '
        else if (atByMin > 60 * 24) return 'A day or more ago: '
    }

    function onEditUser(ev) {
        ev.preventDefault()
        updateUser(userDetails)
    }

    function handleChange(ev) {
        setUserDetails((prevUser) => ({ ...prevUser, [ev.target.name]: ev.target.value }))
    }

    if (!loggedInUser || !userDetails) return <div>No user</div>
    return (
        <div className='container'>
            <h1>Profile</h1>
            <form className='activities-form' onSubmit={(ev) => onEditUser(ev)}>
                <label htmlFor="fullname">Name:</label>
                <input type="text" id="fullname" name="fullname" value={userDetails.fullname} onChange={handleChange} />
                <label htmlFor="name">Color:</label>
                <input type="color" name="color" value={userDetails.color} onChange={handleChange} />
                <label htmlFor="name">BG Color:</label>
                <input type="color" name="bgColor" value={userDetails.bgColor} onChange={handleChange} />
                <button type="submit">save</button>
            </form>

            {userDetails.activities &&
                <ul className='activities-list clean-list'>
                    {userDetails.activities.map((activity, idx) => (
                        <li key={activity.at}>
                            {getActivityTime(activity)}
                            {activity.txt}
                        </li>
                    ))}
                </ul>
            }
        </div>
    )
}
