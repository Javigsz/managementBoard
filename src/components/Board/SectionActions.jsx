import React from 'react'

const SectionActions = ({ section, closeModal, sectionPosition, projectState, setProjectState, handleClickAddTask }) => {
  const modalStyle = {
    position: 'absolute',
    left: `${sectionPosition.left + 20}px`,
    top: `${sectionPosition.top - 20}px`,
    display: 'block',
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

  return (
    <>
      <div className='modal_backdrop' onClick={() => closeModal()}>
        <div style={modalStyle} onClick={e => e.stopPropagation()}>
          <button className='section-action' onClick={() => handleClickAdd()}>Add task</button>
          <button className='section-action' onClick={() => handleClickDelete()}>Delete</button>
        </div>
      </div>
    </>
  )
}

export default SectionActions
