import React, { useState } from 'react'
import Userform from './Userform'

const Menu = ({ openMenu, setOpenMenu, projectState }) => {
  const [showUsers, setShowUsers] = useState(false)
  const [showForm, setShowForm] = useState(false)
  return (
    <>
      <div className={`dropdown-menu ${openMenu ? 'open' : ''}`}>
        <h2>Menu</h2>
        <div className='thin-line' />
        <div className='menu-content'>
          <ul className='menu-list'>
            <li className='li-menu'><button className='menu-button'>Change background image</button></li>
            <li className='li-menu'><button onClick={() => setShowUsers(!showUsers)} className={`menu-button ${showUsers ? 'open' : ''}`}>See users list</button></li>
            {showUsers && (
              <ul className='user-list'>
                {projectState.users.map(user => (
                  <li key={user.id} className='user-item-container'>
                    {user.avatar && <img src={user.avatar} />}
                    {user.avatar === undefined && <img src='/default-user.jpg' />}
                    <p className='user-item'>{user.username}</p>
                    <p className='user-item'>{user.name}</p>
                  </li>
                ))}
              </ul>
            )}
            <li className='li-menu'><button onClick={() => setShowForm(!showForm)} className={`menu-button ${showForm ? 'open' : ''}`}>New user</button></li>
            {showForm && <Userform />}
            <li className='li-menu'><button className='menu-button'>Restart project</button></li>
            <li className='li-menu'><button className='close-button' onClick={() => setOpenMenu(false)}>Close</button></li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default Menu
