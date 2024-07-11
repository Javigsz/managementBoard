import React from 'react'

const SectionActions = ({ section, closeModal, sectionPosition, projectState, setProjectState, handleClickAddTask }) => {
  const modalStyle = {
    position: 'absolute',
    left: `${sectionPosition.left + 25}px`,
    top: `${sectionPosition.top - 20}px`,
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    backgroundColor: 'transparent',
    padding: '15px',
    zIndex: 1
  }

  const handleClickDelete = () => {
    const newSections = projectState.sections.filter(sectionToDelete => sectionToDelete.id !== section.id)
    setProjectState({ ...projectState, sections: newSections })
    closeModal()
  }

  const handleClickAdd = () => {
    handleClickAddTask(section)
    closeModal()
  }

  const handleClickCopy = () => {
    const newState = structuredClone(projectState)
    const index = newState.sections.findIndex(sectionToCopy => sectionToCopy.id === section.id)
    const newTasks = section.tasks.map(task => ({ ...task, id: crypto.randomUUID() }))
    const newSection = { ...section, name: `Copy of ${section.name}`, id: crypto.randomUUID(), tasks: newTasks }
    newState.sections.splice(index + 1, 0, { ...newSection })
    setProjectState(newState)
    closeModal()
  }

  const handleClickMove = () => {
    const index = projectState.sections.findIndex(sectionToMove => sectionToMove.id === section.id)
    if (projectState.sections[index + 1]) {
      const newState = structuredClone(projectState)
      newState.sections.splice(index + 1, 0, newState.sections.splice(index, 1)[0])
      setProjectState(newState)
    }

    closeModal()
  }

  const handleClickMoveAll = () => {
    const index = projectState.sections.findIndex(sectionToMove => sectionToMove.id === section.id)
    if (projectState.sections[index + 1]) {
      const newState = structuredClone(projectState)
      const tasksToMove = newState.sections[index].tasks
      newState.sections[index].tasks = []
      newState.sections[index + 1].tasks = newState.sections[index + 1].tasks.concat(tasksToMove)
      setProjectState(newState)
    }

    closeModal()
  }

  const handleClickDeleteAll = () => {
    const newState = structuredClone(projectState)
    const index = newState.sections.findIndex(sectionToDelete => sectionToDelete.id === section.id)
    newState.sections[index].tasks = []
    setProjectState(newState)
    closeModal()
  }

  return (
    <>
      <div className='modal_backdrop' onClick={() => closeModal()}>
        <div style={modalStyle} onClick={e => e.stopPropagation()}>
          <button className='section-action' onClick={() => handleClickAdd()}>Add task</button>
          <button className='section-action' onClick={() => handleClickDelete()}>Delete</button>
          <button className='section-action' onClick={() => handleClickCopy()}>Copy list</button>
          <button className='section-action' onClick={() => handleClickMove()}>Move list ➡️</button>
          <button className='section-action' onClick={() => handleClickMoveAll()}>Move all tasks ➡️</button>
          <button className='section-action' onClick={() => handleClickDeleteAll()}>Delete all tasks ❌</button>
          <button className='section-action' style={{ backgroundColor: 'red' }} onClick={() => closeModal()}>Close</button>
        </div>
      </div>
    </>
  )
}

export default SectionActions
