import { useState } from 'react'
import tinycolor from 'tinycolor2'

const TaskActions = ({ task, closeModal, sectionPosition, projectState, setProjectState }) => {
  const [showColors, setShowColors] = useState(false)
  const modalStyle = {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    left: `${sectionPosition.left + 20}px`,
    top: `${sectionPosition.top - 20}px`,
    backgroundColor: 'transparent',
    padding: '15px',
    gap: '8px',
    zIndex: 1,
    color: 'white'
  }

  const handleEditClick = () => {
    const newState = structuredClone(projectState)
    newState.sections.forEach(section => {
      section.tasks.forEach(taskToEdit => {
        if (taskToEdit.id === task.id) {
          taskToEdit.editing = true
        }
      })
    })

    setProjectState(newState)
    closeModal()
  }

  const handleEditDelete = () => {
    const newState = structuredClone(projectState)
    newState.sections.forEach(section => {
      section.tasks = section.tasks.filter(taskToDelete => taskToDelete.id !== task.id)
    })
    setProjectState(newState)
    closeModal()
  }

  const handleMoveTask = () => {
    const newState = structuredClone(projectState)
    const sectionIndex = newState.sections.findIndex((section, i) =>
      section.tasks.findIndex((taskToMove, j) => taskToMove.id === task.id) !== -1
        ? [i, section.tasks.findIndex((taskToMove) => taskToMove.id === task.id)]
        : null
    )

    if (sectionIndex > -1 && newState.sections[sectionIndex + 1]) {
      newState.sections[sectionIndex].tasks = newState.sections[sectionIndex].tasks.filter(taskToMove => taskToMove.id !== task.id)
      newState.sections[sectionIndex + 1].tasks.push(task)

      setProjectState(newState)
    }

    closeModal()
  }

  const handleSizeClick = () => {
    const newState = structuredClone(projectState)
    newState.sections.forEach(section => {
      section.tasks.forEach(taskToEdit => {
        if (taskToEdit.id === task.id) {
          if (taskToEdit.size === 'small') {
            taskToEdit.size = 'large'
          } else {
            taskToEdit.size = 'small'
          }
        }
      })
    })
    setProjectState(newState)
    closeModal()
  }

  const handleColorClick = () => {
    setShowColors(true)
  }

  const handleColorClickChange = (e) => {
    const newState = structuredClone(projectState)
    newState.sections.forEach(section => {
      section.tasks.forEach(taskToEdit => {
        if (taskToEdit.id === task.id) {
          taskToEdit.color = tinycolor(e.target.style.backgroundColor).toHexString().toUpperCase()
        }
      })
    })
    setProjectState(newState)
    setShowColors(false)
    closeModal()
  }

  return (
    <>
      <div className='modal_backdrop' onClick={() => closeModal()}>
        {showColors
          ? (
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
            )
          : (
            <div className='task-actions' style={modalStyle} onClick={e => e.stopPropagation()}>
              <button className='task-action' onClick={() => handleEditClick()}>Edit</button>
              <button className='task-action' onClick={() => handleMoveTask()}>Move task ➡️</button>
              <button className='task-action' onClick={() => handleColorClick()}>Change color</button>
              <button className='task-action' onClick={() => handleSizeClick()}>Change size</button>
              <button className='task-action' onClick={() => handleEditDelete()}>Delete</button>
            </div>
            )}
      </div>
    </>
  )
}

export default TaskActions
