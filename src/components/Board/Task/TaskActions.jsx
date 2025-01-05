import { useState } from 'react'
import tinycolor from 'tinycolor2'
import { useStore } from '../../../store/store'
import arrow from '../../../assets/right_arrow.svg'

const TaskActions = ({ task, closeModal, sectionPosition }) => {
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

  const moveTask = useStore(state => state.moveTask)
  const deleteTask = useStore(state => state.deleteTask)
  const setEditTask = useStore(state => state.setEditTask)
  const changeSizeTask = useStore(state => state.changeSizeTask)
  const changeColorTask = useStore(state => state.changeColorTask)

  const handleEditClick = () => {
    setEditTask(task, true)
    closeModal()
  }

  const handleEditDelete = () => {
    deleteTask(task)
    closeModal()
  }

  const handleMoveTask = () => {
    moveTask(task)
    closeModal()
  }

  const handleSizeClick = () => {
    changeSizeTask(task)
    closeModal()
  }

  const handleColorClick = () => {
    setShowColors(true)
  }

  const handleColorClickChange = (e) => {
    changeColorTask(task, tinycolor(e.target.style.backgroundColor).toHexString().toUpperCase())
    setShowColors(false)
    closeModal()
  }

  return (
    <>
      <div className='modal_backdrop' onClick={() => closeModal()}>
        {showColors
          ? (
            <div style={modalStyle} onClick={e => e.stopPropagation()}>
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
              <button className='task-action' onClick={() => handleMoveTask()}>Move Task &nbsp;<img className='arrow' src={arrow} /></button>
              <button className='task-action' onClick={() => handleColorClick()}>Change color</button>
              <button className='task-action' onClick={() => handleSizeClick()}>Change size</button>
              <button className='task-action delete' onClick={() => handleEditDelete()}>Delete</button>
            </div>
            )}
      </div>
    </>
  )
}

export default TaskActions
