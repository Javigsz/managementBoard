import React from 'react'
import { BsThreeDots } from 'react-icons/bs'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import TaskItem from './TaskItem'
import Droppable from './Droppable'
import { useStore } from '../../store/store'

const Section = ({
  section, index, isDragging, handleClickSection, handleClickAddTask,
  handleMouseUp, handleEditClick, handleKeyDownTask
}) => {
  const setSectionName = useStore(state => state.setSectionName)
  const handleOnBlur = (event, index) => {
    if (event.target.value === '') {
      const newName = 'To-do list'
      setSectionName(newName, index)
    }
  }
  return (
    <li className='section' key={section.id}>
      <div className='section-header'>
        <textarea
          className='section-title'
          value={section.name}
          onChange={event => setSectionName(event.target.value, index)}
          onBlur={event => handleOnBlur(event, index)}
          spellCheck='false'
        />
        <span onClick={(e) => handleClickSection(e, section)}><BsThreeDots /></span>
      </div>
      <div className='list' style={{ backgroundColor: isDragging ? 'lightgray' : 'black' }}>
        <Droppable id={section.id} isDragging={isDragging}>
          <SortableContext items={section.tasks} strategy={verticalListSortingStrategy}>
            {section.tasks.map((task, taskIndex) => (
              <TaskItem
                key={task.id}
                task={task}
                taskIndex={taskIndex}
                sectionIndex={index}
                handleMouseUp={handleMouseUp}
                handleEditClick={handleEditClick}
                handleKeyDownTask={handleKeyDownTask}
              />
            ))}
          </SortableContext>
        </Droppable>
        <button className='add-task' onClick={() => handleClickAddTask(section)}>Add task</button>
      </div>
    </li>
  )
}

export default Section
