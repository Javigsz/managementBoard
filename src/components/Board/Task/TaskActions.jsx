import React from 'react'

const TaskActions = ({ task, closeModal, sectionPosition }) => {
  const modalStyle = {
    position: 'absolute',
    left: `${sectionPosition.left + 20}px`,
    top: `${sectionPosition.top - 20}px`,
    display: 'block',
    backgroundColor: 'transparent',
    padding: '15px',
    zIndex: 1
  }

  return (
    <>
      <div className='modal_backdrop' onClick={() => closeModal()}>
        <div className='task-actions' style={modalStyle} onClick={e => e.stopPropagation()}>
          <button className='task-action'>Edit</button>
          <button className='task-action'>Set completed</button>
        </div>
      </div>
    </>
  )
}

export default TaskActions
