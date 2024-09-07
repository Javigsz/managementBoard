import React, { useState } from 'react'
import Userform from './Userform'
import { useStore } from '../../store/store'

const Menu = ({ openMenu, setOpenMenu }) => {
  const [showUsers, setShowUsers] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [showDeleteUser, setShowDeleteUser] = useState(false)
  const [showChangeImage, setShowChangeImage] = useState(false)
  const [confirmReset, setConfirmReset] = useState(false)

  const users = useStore(state => state.project.users)
  const deleteUser = useStore(state => state.deleteUser)
  const resetProject = useStore(state => state.resetProject)

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
      deleteUser(showDeleteUser)
      setShowDeleteUser(false)
    }
  }

  const handleConfirmReset = () => {
    resetProject()
    setConfirmReset(false)
  }

  return (
    <>
      <div className={`dropdown-menu ${openMenu ? 'open' : ''}`}>
        <h2>Menu</h2>
        <div className='thin-line' />
        <div className='menu-content'>
          <ul className='menu-list'>
            <li className='li-menu'><button className={`menu-button ${showChangeImage ? 'open' : ''}`} onClick={() => setShowChangeImage(!showChangeImage)}>Change background image</button></li>
            {showChangeImage &&
              <input
                className='image-input'
                type='text'
                // onChange={(e) => setProjectState({ ...projectState, backgroundImage: e.target.value })}
              />}
            <li className='li-menu'><button onClick={() => handleClickUsersList()} className={`menu-button ${showUsers ? 'open' : ''}`}>See Users List</button></li>
            {showUsers && (
              <ul className='user-list'>
                {users.map(user => (
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
            {showForm && <Userform />}
            <li className='li-menu'><button className={`menu-button ${confirmReset ? 'open' : ''}`} onClick={() => setConfirmReset(!confirmReset)}>Restart project</button></li>
            {confirmReset &&
              <div className='confirm-reset'>
                <p>Are you sure you want to reset the project?</p>
                <div className='reset-buttons'>
                  <button className='reset-button' onClick={() => handleConfirmReset()}>Reset</button>
                  <button className='cancel-button' onClick={() => setConfirmReset(false)}>Cancel</button>
                </div>
              </div>}
            <li className='li-menu'><button className='close-button' onClick={() => setOpenMenu(false)}>Close</button></li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default Menu
