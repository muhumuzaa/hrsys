import React from 'react'
import { userAuth } from '../context/authContext'

const AdminDashboard = () => {
  const {user} = userAuth()
  return (
    <div className='text-3xl'>{user? `AdminDashboard ${user.name}`: "Loading..."}</div>
  )
}

export default AdminDashboard