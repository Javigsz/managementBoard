import React, { useState } from 'react'

const Userform = () => {
  const [avatar, setAvatar] = useState('')
  const [username, setUsername] = useState('')
  const [fullName, setFullName] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    // Aquí podrías validar los datos antes de agregar el usuario
    // addUser({ avatar, username, fullName })
    // Limpiar el formulario después de enviar
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

        <button type='submit'>Add User</button>
      </form>
      <div className='thin-line' />
    </div>
  )
}

export default Userform
