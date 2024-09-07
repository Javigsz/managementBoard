import React, { useState } from 'react'
import { FaUser } from 'react-icons/fa'
import './index.css'
import DatePicker from 'react-datepicker'
import { MdOutlineDateRange } from 'react-icons/md'
import 'react-datepicker/dist/react-datepicker.css'
import { IoIosColorPalette } from 'react-icons/io'
import tinycolor from 'tinycolor2'
import { useStore } from '../../../store/store'

const Task = ({ taskInd, sectionInd, closeModal }) => {
  const modalStyle = {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    right: -20,
    top: -18,
    backgroundColor: 'transparent',
    padding: '15px',
    gap: '8px',
    zIndex: 1,
    color: 'white'
  }
  const [selectedValue, setSelectedValue] = useState('')
  const [showColors, setShowColors] = useState(false)

  const {
    project: {
      users,
      sections
    },
    setTaskName,
    changeColorTask,
    setTaskDesc,
    setEditTask,
    moveTask,
    deleteTask,
    setStartDateTask,
    setEndDateTask,
    newTask,
    addUserToTask,
    removeUserFromTask
  } = useStore(state => state)

  const task = sections[sectionInd].tasks[taskInd]

  const handleOnBlurTaskd = (e) => {
    if (e.target.value === '') {
      const newName = 'Task'
      setTaskName(task, newName)
    }
  }

  const handleEditTaskDesc = (e) => {
    setTaskDesc(task, e.target.value)
  }

  const handleOnBlurTaskdDesc = (e) => {
    if (e.target.value === '') {
      const newName = 'Task description'
      setTaskDesc(task, newName)
    }
  }

  const setStartDate = (date) => {
    setStartDateTask(task, date)
  }

  const setEndDate = (date) => {
    setEndDateTask(task, date)
  }

  const handleEditTask = () => {
    setEditTask(task, true)
    closeModal()
  }

  const handleDuplicateTask = () => {
    const duplicatedTask = {
      ...task,
      id: crypto.randomUUID()
    }
    newTask(sectionInd, duplicatedTask)
    closeModal()
  }

  const handleDeleteTask = () => {
    deleteTask(task)
    closeModal()
  }

  const handleMoveTask = () => {
    moveTask(task)
    closeModal()
  }

  const handleColorClickChange = (e) => {
    const hexcolor = tinycolor(e.target.style.backgroundColor).toHexString()
    changeColorTask(task, hexcolor)
    setShowColors(false)
  }

  const handleSubmitAddUser = (e) => {
    e.preventDefault()
    if (selectedValue === '' || selectedValue === 0) return
    const index = parseInt(selectedValue) - 1
    addUserToTask(task.id, index)
    setSelectedValue(0)
  }

  const handleDeleteUser = (index) => {
    removeUserFromTask(task.id, index)
  }

  return (
    <>
      <div className='modal_backdrop' onClick={() => closeModal()}>
        <div className='task_modal' style={{ backgroundColor: task.color }} onClick={e => e.stopPropagation()}>
          <div className='color'>
            <button onClick={() => setShowColors(!showColors)} className='change-color-button'><IoIosColorPalette size={20} /></button>
            {showColors && (
              <div className='task-actions' style={modalStyle} onClick={e => e.stopPropagation()}>
                <div className='colors'>
                  <button onClick={(e) => handleColorClickChange(e)} style={{ backgroundColor: '#1B59CA' }} className='task-color' />
                  <button onClick={(e) => handleColorClickChange(e)} style={{ backgroundColor: '#7C5E07' }} className='task-color' />
                  <button onClick={(e) => handleColorClickChange(e)} style={{ backgroundColor: '#A04700' }} className='task-color' />
                  <button onClick={(e) => handleColorClickChange(e)} style={{ backgroundColor: '#4F6A24' }} className='task-color' />
                  <button onClick={(e) => handleColorClickChange(e)} style={{ backgroundColor: '#8F3E71' }} className='task-color' />
                  <button onClick={(e) => handleColorClickChange(e)} style={{ backgroundColor: '#A82D20' }} className='task-color' />
                  <button onClick={(e) => handleColorClickChange(e)} style={{ backgroundColor: '#323131' }} className='task-color' />
                  <button onClick={(e) => handleColorClickChange(e)} style={{ backgroundColor: '#5E50B0' }} className='task-color' />
                </div>
              </div>
            )}
          </div>
          <textarea
            className='task-name-input'
            value={task.name}
            // onFocus={(e) => handleKeyDownTask(e)}
            // onInput={(e) => handleKeyDownTask(e)}
            style={{ fieldsyzing: 'content' }}
            onChange={(event) => setTaskName(task, event.target.value)}
            onBlur={e => handleOnBlurTaskd(e)}
            spellCheck='false'
          />
          <div className='task-name-section'>
            <p>From {sections[sectionInd].name}</p>
          </div>
          <textarea
            className='task-desc-input'
            value={task.desc}
            // onFocus={(e) => handleKeyDownTask(e)}
            // onInput={(e) => handleKeyDownTask(e)}
            onChange={e => handleEditTaskDesc(e)}
            onBlur={e => handleOnBlurTaskdDesc(e)}
            spellCheck='false'
          />
          <div className='task-users-section'>
            <h4><FaUser />  Users</h4>
            <div className='users-list'>
              {users.map((user, index) => (
                user.tasks.includes(task.id) && (
                  <div className='avatar-container' key={user.id}>
                    <img className='avatar' src={user.avatar ? user.avatar : '/default-user.jpg'} alt={user.username} />
                    <div className='delete-icon' onClick={() => handleDeleteUser(index)}>✖</div>
                  </div>
                )
              ))}
            </div>
            <div>
              <form onSubmit={(e) => handleSubmitAddUser(e)}>
                <button type='submit' className='task-button'>Add User</button>
                <select name='users' id='user-select' value={selectedValue} onChange={(e) => setSelectedValue(e.target.value)}>
                  <option value=''>Select User</option>
                  {users.map(user => (
                    <option key={user.id} value={user.id}>{user.username}</option>
                  ))}
                </select>
              </form>
            </div>
          </div>
          <div className='task-dates-section'>
            <h4><MdOutlineDateRange />  Dates</h4>
            <h5>Start: </h5>
            <DatePicker className='datepicker' selected={task.start} onChange={(date) => setStartDate(date)} />
            <h5>End: </h5>
            <DatePicker className='datepicker' selected={task.end} onChange={(date) => setEndDate(date)} />
          </div>
          <div className='task_actions'>
            <button className='task-button' onClick={e => handleEditTask()}>Edit</button>
            <button className='task-button' onClick={e => handleDuplicateTask()}>Duplicate</button>
            <button className='task-button' onClick={e => handleDeleteTask()}>Delete</button>
            <button className='task-button' onClick={e => handleMoveTask()}>Move Task ➡️</button>
            <button className='task-button' onClick={e => closeModal()}>Close</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Task
