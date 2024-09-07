import React, { useState, useEffect, useRef } from 'react'
import { DndContext, useSensor, useSensors, PointerSensor } from '@dnd-kit/core'
import { debounce } from 'lodash'
import Section from './Section'
import './index.css'
import SectionActions from './SectionActions'
import TaskActions from './Task/TaskActions'
import Task from './Task/Task'
import { useStore } from '../../store/store'

const MainBoard = () => {
  const [showTask, setShowTask] = useState(false)
  const [showTaskActions, setShowTaskActions] = useState(false)
  const [showSectionActions, setShowSectionActions] = useState(false)
  const [sectionPosition, setSectionPosition] = useState({ top: 0, left: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const seeModalRef = useRef(true)

  const sections = useStore(state => state.project.sections)
  const newSection = useStore(state => state.newSection)
  const newTask = useStore(state => state.newTask)
  const deleteTask = useStore(state => state.deleteTask)
  const backgroundImage = useStore(state => state.project.backgroundImage)
  const interchangeTasks = useStore(state => state.interchangeTasks)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10
      }
    })
  )

  const handleMouseUp = (taskIndex, sectionIndex) => {
    if (seeModalRef.current) {
      setShowTask({ taskInd: taskIndex, sectionInd: sectionIndex })
    }
    seeModalRef.current = true
  }

  useEffect(() => {
    if (isDragging) {
      seeModalRef.current = false
    }
  }, [isDragging])

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

  const handleKeyDownTask = (e) => {
    e.target.style.height = '30px'
    e.target.style.height = `${e.target.scrollHeight}px`
  }

  const handleClickAddTask = (section) => {
    const task = {
      id: crypto.randomUUID(),
      name: 'New task',
      desc: 'Add description here',
      editing: false,
      color: '#323131',
      size: 'small',
      start: null,
      end: null
    }

    const taskSectionIndex = sections.findIndex(sectionTask => sectionTask.id === section.id)
    newTask(taskSectionIndex, task)
  }

  const handleClickAddSection = () => {
    const section = {
      id: crypto.randomUUID(),
      name: 'To-do list',
      tasks: []
    }

    newSection(section)
  }

  const handleDragOver = debounce((event) => {
    const { active, over } = event

    if (!active || !over || active === over) return

    // over ids can be either task or section ids
    const { id: activeId } = active
    const { id: overId } = over

    // if sourceIndex or destinationIndex is -1, it means that it's a section
    // as sections can't be dragged, activeId will never be -1
    const sourceIndex = sections.findIndex((section) =>
      section.tasks.some((task) => task.id === activeId)
    )
    const destinationIndex = sections.findIndex((section) =>
      section.tasks.some((task) => task.id === overId)
    )

    const taskToMove = sections[sourceIndex].tasks.find((task) => task.id === activeId)
    const sectionForTaskIndex = sections.findIndex((section) => section.id === overId)

    // If the destination section is empty
    if (destinationIndex === -1 && sections[sectionForTaskIndex].tasks.length <= 0) {
      deleteTask(taskToMove)
      newTask(sectionForTaskIndex, taskToMove)
    // If its not empy
    } else if (destinationIndex !== -1) {
      // If destination section is not the same as source section
      if (sourceIndex !== destinationIndex) {
        deleteTask(taskToMove)
        newTask(destinationIndex, taskToMove)
      }
      // If destination section is the same from source section
      const taskToChange = sections[destinationIndex].tasks.find((task) => task.id === overId)
      interchangeTasks(taskToMove, taskToChange)
    }
  }, [10])

  return (
    <>
      <DndContext
        sensors={sensors}
        onDragStart={() => setIsDragging(true)}
        onDragOver={(e) => handleDragOver(e)}
        onDragEnd={() => setIsDragging(false)}
        onDragCancel={() => setIsDragging(false)}
      >
        <div
          className='background'
          style={{
            '&::before': {
              backgroundImage: `url(${backgroundImage})`
            }
          }}
        >
          <ol className='mainBoard'>
            {sections.map((section, index) => (
              <Section
                key={section.id}
                section={section}
                index={index}
                isDragging={isDragging}
                handleClickSection={handleClickSection}
                handleClickAddTask={handleClickAddTask}
                handleMouseUp={handleMouseUp}
                handleEditClick={handleEditClick}
                handleKeyDownTask={handleKeyDownTask}
              />
            ))}
            <div className='flat-button' onClick={() => handleClickAddSection()} key={sections.length}>Add Section</div>
          </ol>
        </div>
        {showSectionActions &&
          <SectionActions
            section={showSectionActions}
            closeModal={() => setShowSectionActions(false)}
            sectionPosition={sectionPosition}
            handleClickAddTask={handleClickAddTask}
          />}
        {showTask &&
          <Task
            taskInd={showTask.taskInd}
            sectionInd={showTask.sectionInd}
            handleKeyDownTask={handleKeyDownTask}
            closeModal={() => setShowTask(false)}
          />}
        {showTaskActions &&
          <TaskActions
            task={showTaskActions}
            closeModal={() => setShowTaskActions(false)}
            sectionPosition={sectionPosition}
          />}
      </DndContext>
    </>
  )
}

export default MainBoard
