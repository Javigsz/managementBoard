import React, { useState } from 'react'
import Userform from './Userform'

const Menu = ({ openMenu, setOpenMenu, projectState, setProjectState }) => {
  const [showUsers, setShowUsers] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [showDeleteUser, setShowDeleteUser] = useState(false)

  const handleClickUser = (id) => {
    if (id === showDeleteUser) {
      setShowDeleteUser(false)
    } else {
      setShowDeleteUser(id)
    }
  }

  const handleClickUsersList = () => {
    if (showUsers) setShowDeleteUser(false)
    setShowUsers(!showUsers)
  }

  const handleDeleteClick = () => {
    if (showDeleteUser) {
      const newState = structuredClone(projectState)
      newState.users = newState.users.filter(user => user.id !== showDeleteUser)
      setProjectState(newState)
      setShowDeleteUser(false)
    }
  }

  return (
    <>
      <div className={`dropdown-menu ${openMenu ? 'open' : ''}`}>
        <h2>Menu</h2>
        <div className='thin-line' />
        <div className='menu-content'>
          <ul className='menu-list'>
            <li className='li-menu'><button className='menu-button'>Change background image</button></li>
            <li className='li-menu'><button onClick={() => handleClickUsersList()} className={`menu-button ${showUsers ? 'open' : ''}`}>See Users List</button></li>
            {showUsers && (
              <ul className='user-list'>
                {projectState.users.map(user => (
                  <li key={user.id} className={`user-item-container ${user.id === showDeleteUser ? 'marked' : ''}`} onClick={() => handleClickUser(user.id)}>
                    {user.avatar && <img src={user.avatar} />}
                    {user.avatar === undefined && <img src='/default-user.jpg' />}
                    <p className='user-item'>{user.username}</p>
                    <p className='user-item'>{user.name}</p>
                  </li>
                ))}
              </ul>
            )}
            {showDeleteUser && <button className='mini-menu-button' onClick={() => handleDeleteClick()}>Delete user</button>}
            <li className='li-menu'><button onClick={() => setShowForm(!showForm)} className={`menu-button ${showForm ? 'open' : ''}`}>New user</button></li>
            {showForm && <Userform projectState={projectState} setProjectState={setProjectState} />}
            <li className='li-menu'><button className='menu-button'>Restart project</button></li>
            <li className='li-menu'><button className='close-button' onClick={() => setOpenMenu(false)}>Close</button></li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default Menu
