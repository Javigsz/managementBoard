import React from 'react'
import './index.css'

const Task = ({ task, closeModal }) => {
  return (
    <>
      <div className='modal_backdrop' onClick={() => closeModal()}>
        <div className='task_modal' onClick={e => e.stopPropagation()}>
          <h3>{task.name}</h3>
          <div className='task_desc'>
            <p>{task.desc}</p>
          </div>
          <div className='task_actions'>
            <button className='filter'>Edit</button>
            <button className='filter'>Delete</button>
            <button className='filter'>Complete</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Task
