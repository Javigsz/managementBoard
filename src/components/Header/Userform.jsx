import React, { useState } from 'react'
import { useStore } from '../../store/store'

const Userform = () => {
  const [avatar, setAvatar] = useState('')
  const [username, setUsername] = useState('')
  const [fullName, setFullName] = useState('')

  const users = useStore(state => state.project.users)
  const newUser = useStore(state => state.newUser)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (users.find(user => user.username === username)) {
      window.alert('Username already exists')
    } else {
      const user = {
        id: crypto.randomUUID(),
        avatar,
        username,
        name: fullName,
        tasks: []
      }
      console.log(user.avatar)
      newUser(user)
    }
    setAvatar('')
    setUsername('')
    setFullName('')
  }

  return (
    <div>
      <form id='new-user-form' className='new-user-form' onSubmit={handleSubmit}>
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
