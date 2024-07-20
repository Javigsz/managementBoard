import React, { useState } from 'react'
import { FaUser } from 'react-icons/fa'
import './index.css'
import DatePicker from 'react-datepicker'
import { MdOutlineDateRange } from 'react-icons/md'
import 'react-datepicker/dist/react-datepicker.css'
import { IoIosColorPalette } from 'react-icons/io'

const Task = ({ task, closeModal, projectState, setProjectState }) => {
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
  const handleEditTaskName = (e) => {
    const newState = structuredClone(projectState)
    newState.sections[task.section].tasks[task.task].name = e.target.value
    setProjectState(newState)
  }

  const handleOnBlurTaskd = (e) => {
    const newState = structuredClone(projectState)
    if (e.target.value === '') {
      const newName = 'Task'
      newState.sections[task.section].tasks[task.task].name = newName
    }
    setProjectState(newState)
  }

  const handleKeyDownTask = (e) => {
    e.target.style.height = '20px'
    e.target.style.height = `${e.target.scrollHeight}px`
  }

  const handleEditTaskDesc = (e) => {
    const newState = structuredClone(projectState)
    newState.sections[task.section].tasks[task.task].desc = e.target.value
    setProjectState(newState)
  }

  const handleOnBlurTaskdDesc = (e) => {
    const newState = structuredClone(projectState)
    if (e.target.value === '') {
      const newName = 'Task description'
      newState.sections[task.section].tasks[task.task].desc = newName
    }
    setProjectState(newState)
  }

  const setStartDate = (date) => {
    const newState = structuredClone(projectState)
    newState.sections[task.section].tasks[task.task].start = date
    setProjectState(newState)
  }

  const setEndDate = (date) => {
    const newState = structuredClone(projectState)
    newState.sections[task.section].tasks[task.task].end = date
    setProjectState(newState)
  }

  const handleEditTask = () => {
    const newState = structuredClone(projectState)
    newState.sections[task.section].tasks[task.task].editing = !newState.sections[task.section].tasks[task.task].editing
    setProjectState(newState)
    closeModal()
  }

  const handleDuplicateTask = () => {
    const newState = structuredClone(projectState)
    const newTask = {
      ...projectState.sections[task.section].tasks[task.task],
      id: crypto.randomUUID()
    }
    newState.sections[task.section].tasks.push(newTask)
    setProjectState(newState)
    closeModal()
  }

  const handleDeleteTask = () => {
    const newState = structuredClone(projectState)
    newState.sections[task.section].tasks.splice(task.task, 1)
    setProjectState(newState)
    closeModal()
  }

  const handleMoveTask = () => {
    const newState = structuredClone(projectState)
    if (newState.sections[task.section + 1]) {
      newState.sections[task.section].tasks = newState.sections[task.section].tasks.filter(taskToMove => taskToMove.id !== projectState.sections[task.section].tasks[task.task].id)
      newState.sections[task.section + 1].tasks.push(projectState.sections[task.section].tasks[task.task])
      setProjectState(newState)
    }
    closeModal()
  }

  const handleColorClickChange = (e) => {
    const newState = structuredClone(projectState)
    newState.sections[task.section].tasks[task.task].color = e.target.style.backgroundColor
    setProjectState(newState)
    setShowColors(false)
  }

  const handleSubmitAddUser = (e) => {
    e.preventDefault()
    if (selectedValue === '' || selectedValue === 0) return
    const index = parseInt(selectedValue) - 1
    const newState = structuredClone(projectState)
    newState.users[index].tasks = [...newState.users[index].tasks, projectState.sections[task.section].tasks[task.task].id]
    setProjectState(newState)
    setSelectedValue(0)
  }

  const handleDeleteUser = (index) => {
    const newState = structuredClone(projectState)
    newState.users[index].tasks = newState.users[index].tasks.filter(taskd => taskd !== projectState.sections[task.section].tasks[task.task].id)
    setProjectState(newState)
  }

  return (
    <>
      <div className='modal_backdrop' onClick={() => closeModal()}>
        <div className='task_modal' style={{ backgroundColor: projectState.sections[task.section].tasks[task.task].color }} onClick={e => e.stopPropagation()}>
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
            value={projectState.sections[task.section].tasks[task.task].name}
            onFocus={(e) => handleKeyDownTask(e)}
            onInput={(e) => handleKeyDownTask(e)}
            onChange={e => handleEditTaskName(e)}
            onBlur={e => handleOnBlurTaskd(e)}
            spellCheck='false'
          />
          <div className='task-name-section'>
            <p>From {projectState.sections[task.section].name}</p>
          </div>
          <textarea
            className='task-desc-input'
            value={projectState.sections[task.section].tasks[task.task].desc}
            onFocus={(e) => handleKeyDownTask(e)}
            onInput={(e) => handleKeyDownTask(e)}
            onChange={e => handleEditTaskDesc(e)}
            onBlur={e => handleOnBlurTaskdDesc(e)}
            spellCheck='false'
          />
          <div className='task-users-section'>
            <h4><FaUser />  Users</h4>
            <div className='users-list'>
              {projectState.users.map((user, index) => (
                user.tasks.includes(projectState.sections[task.section].tasks[task.task].id) && (
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
                  {projectState.users.map(user => (
                    <option key={user.id} value={user.id}>{user.username}</option>
                  ))}
                </select>
              </form>
            </div>
          </div>
          <div className='task-dates-section'>
            <h4><MdOutlineDateRange />  Dates</h4>
            <h5>Start: </h5>
            <DatePicker className='datepicker' selected={projectState.sections[task.section].tasks[task.task].start} onChange={(date) => setStartDate(date)} />
            <h5>End: </h5>
            <DatePicker className='datepicker' selected={projectState.sections[task.section].tasks[task.task].end} onChange={(date) => setEndDate(date)} />
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
