import React, { useState } from 'react'

const Userform = ({ projectState, setProjectState }) => {
  const [avatar, setAvatar] = useState('')
  const [username, setUsername] = useState('')
  const [fullName, setFullName] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (projectState.users.find(user => user.username === username)) {
      console.log('Username already exists')
    } else {
      if (avatar === '') setAvatar(undefined)
      const newUser = {
        id: crypto.randomUUID(),
        avatar,
        username,
        name: fullName,
        tasks: []
      }

      const newUsers = [...projectState.users, newUser]
      setProjectState({ ...projectState, users: newUsers })
    }
    setAvatar('')
    setUsername('')
    setFullName('')
  }

  return (
    <div>
      <form className='new-user-form' onSubmit={handleSubmit}>
        <div className='thin-line' />
        <label htmlFor='avatar'>Avatar URL:</label>
        <input
          type='text'
          id='avatar'
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
        />

        <label htmlFor='username'>Username:</label>
        <input
          type='text'
          id='username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <label htmlFor='fullName'>Name & Surname:</label>
        <input
          type='text'
          id='fullName'
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />

        <button className='mini-menu-button' type='submit'>Add User</button>
      </form>
      <div className='thin-line' />
    </div>
  )
}

export default Userform
