import React from 'react'
import { CiEdit } from 'react-icons/ci'
import Draggable from './Task/Draggable'

const TaskItem = ({
  task, taskIndex, sectionIndex, handleMouseUp,
  handleEditClick, handleInputChangeTask, handleOnBlurTask, handleKeyDownTask, filteredColor, filteredUser, filteredDate, showTask
}) => {
  return (
    <Draggable key={task.id} id={task.id}>
      <div className='list-task'>
        {task.editing
          ? (
            <textarea
              className='list-item-input'
              autoFocus
              value={task.name}
              onChange={event => handleInputChangeTask(event, sectionIndex, taskIndex)}
              onBlur={event => handleOnBlurTask(event, sectionIndex, taskIndex)}
              spellCheck='false'
              style={{
                backgroundColor: task.color ? task.color : '#323131',
                fontSize: task.size === 'large' ? '20px' : '15px'
              }}
            />
            )
          : (
            <div
              className={`list-item ${(filteredColor(task) || filteredUser(task) || filteredDate(task)) ? 'filtered' : ''}`}
              onMouseUp={() => handleMouseUp(taskIndex, sectionIndex)}
              style={{
                backgroundColor: task.color ? task.color : '#323131',
                fontSize: task.size === 'large' ? '20px' : '15px'
              }}
            >
              <p>{task.name}</p>
              <span onMouseUp={(e) => handleEditClick(e, task)}><CiEdit /></span>
            </div>
            )}
      </div>
    </Draggable>
  )
}

export default TaskItem
