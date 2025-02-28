import React, { useEffect, useState, useRef, useContext } from 'react'
import Task from './Task/Task'
import TaskActions from './Task/TaskActions'
import './index.css'
import { CiEdit } from 'react-icons/ci'
import { BsThreeDots } from 'react-icons/bs'
import { DndContext, useSensor, useSensors, PointerSensor } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import Droppable from './Droppable'
import Draggable from './Task/Draggable'
import SectionActions from './SectionActions'
import { FiltersContext } from '../../context/filters'

const MainBoard = ({ projectState, setProjectState }) => {
  const [showTask, setShowTask] = useState(false)
  const [showTaskActions, setShowTaskActions] = useState(false)
  const [showSectionActions, setShowSectionActions] = useState(false)
  const [sectionPosition, setSectionPosition] = useState({ top: 0, left: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const seeModalRef = useRef(true)
  const { filters } = useContext(FiltersContext)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10
      }
    })
  )

  const handleMouseUp = (taskIndex, sectionIndex) => {
    if (seeModalRef.current) {
      setShowTask({ task: taskIndex, section: sectionIndex })
    }
    seeModalRef.current = true
  }

  useEffect(() => {
    if (isDragging) {
      seeModalRef.current = false
    }
  }, [isDragging])

  const handleInputChange = (event, index) => {
    const newState = structuredClone(projectState)
    newState.sections[index].name = event.target.value
    setProjectState(newState)
  }

  const handleInputChangeTask = (event, sectionIndex, taskIndex) => {
    const newState = structuredClone(projectState)
    newState.sections[sectionIndex].tasks[taskIndex].name = event.target.value
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

  const handleOnBlurTask = (event, sectionIndex, taskIndex) => {
    const newState = structuredClone(projectState)
    newState.sections[sectionIndex].tasks[taskIndex].editing = false
    if (event.target.value === '') {
      const newName = 'Task'
      newState.sections[sectionIndex].tasks[taskIndex].name = newName
    }
    setProjectState(newState)
  }

  const handleEditClick = (e, task) => {
    e.stopPropagation()
    if (seeModalRef.current) {
      const rect = e.target.getBoundingClientRect()
      setSectionPosition(rect)
      setShowTaskActions(task)
    }
    seeModalRef.current = true
  }

  const handleClickSection = (e, section) => {
    e.stopPropagation()
    const rect = e.target.getBoundingClientRect()
    setSectionPosition(rect)
    setShowSectionActions(section)
  }

  //   const handleKeyDown = (e) => {
  //     e.target.style.height = '20px'
  //     e.target.style.height = `${e.target.scrollHeight}px`
  //   }

  const handleKeyDownTask = (e) => {
    e.target.style.height = '30px'
    e.target.style.height = `${e.target.scrollHeight}px`
  }

  const handleClickAddTask = (section) => {
    const newTask = {
      id: crypto.randomUUID(),
      name: 'New task',
      desc: 'Add description here',
      editing: false,
      color: '#323131',
      size: 'small',
      start: null,
      end: null
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

  const handleDragOver = (event) => {
    const { active, over } = event

    if (!over) return

    const { id: activeId } = active
    const { id: overId } = over

    if (activeId === overId) return

    const sourceIndex = projectState.sections.findIndex((section) =>
      section.tasks.some((task) => task.id === activeId)
    )
    const destinationIndex = projectState.sections.findIndex((section) =>
      section.tasks.some((task) => task.id === overId)
    )

    console.log(sourceIndex, destinationIndex)

    if (sourceIndex !== -1 && destinationIndex === -1) {
      if (projectState.sections.findIndex((section) => section.id === overId) === sourceIndex) {
        return
      }
      const sourceSection = projectState.sections[sourceIndex]
      const destinationSection = projectState.sections.find(section => section.id === overId)
      const destinationSectionIndex = projectState.sections.findIndex(section => section.id === overId)

      const activeTaskIndex = sourceSection.tasks.findIndex((task) => task.id === activeId)

      if (activeTaskIndex !== -1) {
        const newSourceTasks = [...sourceSection.tasks]
        const [movedTask] = newSourceTasks.splice(activeTaskIndex, 1)

        const newDestinationTasks = [...destinationSection.tasks]
        newDestinationTasks.splice(0, 0, movedTask)

        const newSections = [...projectState.sections]
        newSections[sourceIndex] = { ...sourceSection, tasks: newSourceTasks }

        newSections[destinationSectionIndex] = { ...destinationSection, tasks: newDestinationTasks }

        setProjectState({ ...projectState, sections: newSections })
        console.log('caso 1')
      }

      return
    }

    if (sourceIndex !== -1 && destinationIndex !== -1) {
      const sourceSection = projectState.sections[sourceIndex]
      const destinationSection = projectState.sections[destinationIndex]

      const activeTaskIndex = sourceSection.tasks.findIndex((task) => task.id === activeId)
      const overTaskIndex = destinationSection.tasks.findIndex((task) => task.id === overId)

      if (activeTaskIndex !== -1 && overTaskIndex !== -1) {
        const newSourceTasks = [...sourceSection.tasks]
        const [movedTask] = newSourceTasks.splice(activeTaskIndex, 1)

        const newDestinationTasks = [...destinationSection.tasks]
        if (sourceIndex === destinationIndex) {
          newDestinationTasks.splice(activeTaskIndex, 1)
        }
        newDestinationTasks.splice(overTaskIndex, 0, movedTask)

        const newSections = [...projectState.sections]
        newSections[sourceIndex] = { ...sourceSection, tasks: newSourceTasks }

        newSections[destinationIndex] = { ...destinationSection, tasks: newDestinationTasks }

        setProjectState({ ...projectState, sections: newSections })
        console.log('caso 2')
      }
    }
  }

  const filteredUser = (task) => {
    return projectState.users.some(user =>
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

  return (
    <>
      <DndContext
        sensors={sensors}
        onDragStart={() => setIsDragging(true)}
        onDragOver={e => handleDragOver(e)}
        onDragEnd={() => setIsDragging(false)}
        onDragCancel={() => setIsDragging(false)}
      >
        <div
          className='background' style={{
            '&::before': {
              backgroundImage: `url(${projectState.backgroundImage})`
            }
          }}
        >
          <ol className='mainBoard'>
            {projectState.sections.map((section, index) => (
              <li className='section' key={section.id}>
                <div className='section-header'>
                  <textarea
                    className='section-title'
                    value={section.name}
                    onChange={event => handleInputChange(event, index)}
                    onBlur={event => handleOnBlur(event, index)}
                    // onInput={(e) => handleKeyDown(e)}
                    spellCheck='false'
                  />
                  <span onClick={(e) => handleClickSection(e, section)}><BsThreeDots /></span>
                </div>
                <div className='list' style={{ backgroundColor: isDragging ? 'lightgray' : 'black' }}>
                  <Droppable id={section.id} isDragging={isDragging}>
                    <SortableContext items={section.tasks} strategy={verticalListSortingStrategy}>
                      {section.tasks.map((task, taskIndex) => (
                        <Draggable key={task.id} id={task.id}>
                          <div className='list-task'>
                            {task.editing
                              ? (
                                <textarea
                                  className='list-item-input'
                                  autoFocus
                                  value={task.name}
                                //   onInput={(e) => handleKeyDownTask(e)}
                                //   onFocus={(e) => handleKeyDownTask(e)}
                                  onChange={event => handleInputChangeTask(event, index, taskIndex)}
                                  onBlur={event => handleOnBlurTask(event, index, taskIndex)}
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
                                  onMouseUp={() => handleMouseUp(taskIndex, index)}
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
                      ))}
                    </SortableContext>
                  </Droppable>
                  <button className='add-task' onClick={() => handleClickAddTask(section)}>Add task</button>
                </div>
              </li>
            ))}
            <div className='flat-button' onClick={() => handleClickAddSection()} key={projectState.sections.length}>Add Section</div>
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
            projectState={projectState}
            setProjectState={setProjectState}
            handleKeyDownTask={handleKeyDownTask}
            closeModal={() => setShowTask(false)}
          />}
        {showTaskActions &&
          <TaskActions
            task={showTaskActions}
            closeModal={() => setShowTaskActions(false)}
            sectionPosition={sectionPosition}
            projectState={projectState}
            setProjectState={setProjectState}
          />}
      </DndContext>
    </>
  )
}

export default MainBoard
