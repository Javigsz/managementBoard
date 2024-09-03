import React from 'react'
import { BsThreeDots } from 'react-icons/bs'
import Droppable from './Droppable'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import TaskItem from './TaskItem'

const Section = ({
  section, index, isDragging, handleInputChange,
  handleOnBlur, handleClickSection, handleClickAddTask, projectState,
  handleMouseUp, handleEditClick, handleInputChangeTask,
  handleOnBlurTask, handleKeyDownTask, filteredColor, filteredUser, filteredDate, showTask
}) => {
  return (
    <li className='section' key={section.id}>
      <div className='section-header'>
        <textarea
          className='section-title'
          value={section.name}
          onChange={event => handleInputChange(event, index)}
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
                handleInputChangeTask={handleInputChangeTask}
                handleOnBlurTask={handleOnBlurTask}
                handleKeyDownTask={handleKeyDownTask}
                filteredColor={filteredColor}
                filteredUser={filteredUser}
                filteredDate={filteredDate}
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
