// eslint-disable-next-line no-unused-vars
import React, {useEffect} from 'react'
// import { useDispatch, useSelector } from 'react-redux'
import { userAppSelector,useAppDispatch } from '../../app/hooks'
import { fecthUsers } from './UserSlice'

export const UserViews = () => {

    const user = userAppSelector((state) => state.user)
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(fecthUsers())
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


  return (
    <div>
        <h2>List of users</h2>
        {user.loading && <div>Loading...</div>}
        {!user.loading && user.error ? <div>Error: {user.error}</div> : null}
        {!user.loading && user.users.length?(
            <ul>
                {user.users.map((user)=> (
                    <li key={user.id}>{user.name}</li>
                ))}
            </ul>
        ):null}
    </div>

  )
}
