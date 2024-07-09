import React, { useState } from 'react'
import Task from './Task/Task'
import TaskActions from './Task/TaskActions'
import './index.css'
import { CiEdit } from 'react-icons/ci'
import { BsThreeDots } from 'react-icons/bs'
import SectionActions from './SectionActions'

const MainBoard = ({ projectState, setProjectState }) => {
  const [showTask, setShowTask] = useState(false)
  const [showTaskActions, setShowTaskActions] = useState(false)
  const [showSectionActions, setShowSectionActions] = useState(false)
  const [sectionPosition, setSectionPosition] = useState({ top: 0, left: 0 })
  const handleInputChange = (event, index) => {
    const newState = structuredClone(projectState)
    newState.sections[index].name = event.target.value
    setProjectState(newState)
  }

  const handleOnBlur = (event, index) => {
    if (event.target.value === '') {
      const newName = 'To-do list'
      const newState = structuredClone(projectState)
      newState.sections[index].name = newName
      setProjectState(newState)
    }
  }

  const handleTaskClick = (task) => {
    setShowTask(task)
  }

  const handleEditClick = (e, task) => {
    e.stopPropagation()
    const rect = e.target.getBoundingClientRect()
    setSectionPosition(rect)
    setShowTaskActions(task)
  }

  const handleClickSection = (e, section) => {
    e.stopPropagation()
    const rect = e.target.getBoundingClientRect()
    setSectionPosition(rect)
    setShowSectionActions(section)
  }

  const handleKeyDown = (e) => {
    e.target.style.height = '20px'
    e.target.style.height = `${e.target.scrollHeight}px`
  }

  const handleClickAddTask = (section) => {
    const newTask = {
      id: crypto.randomUUID(),
      name: 'New task',
      desc: 'Add description here'
    }

    const newState = structuredClone(projectState)
    const taskSectionIndex = newState.sections.findIndex(sectionTask => sectionTask.id === section.id)
    newState.sections[taskSectionIndex].tasks.push(newTask)

    setProjectState(newState)
  }

  const handleClickAddSection = () => {
    const newSection = {
      id: crypto.randomUUID(),
      name: 'To-do list',
      tasks: []
    }

    setProjectState({ ...projectState, sections: [...projectState.sections, newSection] })
  }

  return (
    <>

      <div className='background'>
        <ol className='mainBoard'>
          {projectState.sections.map((section, index) => (
            <li className='section' key={section.id}>
              <div className='section-header'>
                <textarea
                  value={section.name}
                  onChange={event => handleInputChange(event, index)}
                  onBlur={event => handleOnBlur(event, index)}
                  onInput={(e) => handleKeyDown(e)}
                  spellCheck='false'
                />
                <span onClick={(e) => handleClickSection(e, section)}><BsThreeDots /></span>
              </div>
              <div className='list'>
                {section.tasks.map(task => (
                  <div className='list-task' key={task.id}>
                    <div className='list-item' onClick={() => handleTaskClick(task)}>
                      {task.name}
                      <span><CiEdit onClick={(e) => handleEditClick(e, task)} /></span>
                    </div>
                  </div>
                ))}
                <button className='add-task' onClick={() => handleClickAddTask(section)}>Add task</button>
              </div>
            </li>
          ))}
          <div className='flat-button' onClick={() => handleClickAddSection()} key={projectState.sections.length}>Add Section </div>
        </ol>
      </div>
      {showSectionActions &&
        <SectionActions
          section={showSectionActions}
          closeModal={() => setShowSectionActions(false)}
          sectionPosition={sectionPosition}
          projectState={projectState}
          setProjectState={setProjectState}
          handleClickAddTask={handleClickAddTask}
        />}
      {showTask &&
        <Task
          task={showTask}
          closeModal={() => setShowTask(false)}
        />}
      {showTaskActions &&
        <TaskActions
          task={showTaskActions}
          closeModal={() => setShowTaskActions(false)}
          sectionPosition={sectionPosition}
        />}
    </>
  )
}

export default MainBoard
