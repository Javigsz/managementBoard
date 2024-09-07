import React, { useContext } from 'react'
import { CiEdit } from 'react-icons/ci'
import Draggable from './Task/Draggable'
import { useStore } from '../../store/store'
import { FiltersContext } from '../../context/filters'

const TaskItem = ({
  task, taskIndex, sectionIndex, handleMouseUp,
  handleEditClick
}) => {
  const setTaskName = useStore(state => state.setTaskName)
  const setEditTask = useStore(state => state.setEditTask)
  const users = useStore(state => state.project.users)

  const { filters } = useContext(FiltersContext)

  const filteredUser = (task) => {
    return users.some(user =>
      user.tasks.includes(task.id) && filters.users.includes(user.id)
    )
  }

  const filteredColor = (task) => {
    return filters.color.includes(task.color)
  }

  const filteredDate = (task) => {
    if (task.end !== null) {
      return task.end <= filters.endDate
    }
    return false
  }

  const handleOnBlurTask = (event) => {
    setEditTask(task, false)
    if (event.target.value === '') {
      const newName = 'Task'
      setTaskName(task, newName)
    }
  }
  return (
    <Draggable key={task.id} id={task.id}>
      <div className='list-task'>
        {task.editing
          ? (
            <textarea
              className='list-item-input'
              autoFocus
              value={task.name}
              onChange={(event) => setTaskName(task, event.target.value)}
              onBlur={(event) => handleOnBlurTask(event)}
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
                backgroundColor: task.color ? task.color : '#323131'
              }}
            >
              <p style={{ fontSize: task.size === 'large' ? '20px' : '15px' }}>{task.name}</p>
              <span onMouseUp={(e) => handleEditClick(e, task)}><CiEdit /></span>
            </div>
            )}
      </div>
    </Draggable>
  )
}

export default TaskItem
