import React from 'react'
import { useStore } from '../../store/store'
import arrow from '../../assets/right_arrow.svg'

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

  const deleteSection = useStore(state => state.deleteSection)
  const copySection = useStore(state => state.copySection)
  const moveSection = useStore(state => state.moveSection)
  const moveTask = useStore(state => state.moveTask)
  const deleteTask = useStore(state => state.deleteTask)

  const handleClickDelete = () => {
    deleteSection(section.id)
    closeModal()
  }

  const handleClickAdd = () => {
    handleClickAddTask(section)
    closeModal()
  }

  const handleClickCopy = () => {
    copySection(section)
    closeModal()
  }

  const handleClickMove = () => {
    moveSection(section.id)
    closeModal()
  }

  const handleClickMoveAll = () => {
    section.tasks.map(task => moveTask(task))
    closeModal()
  }

  const handleClickDeleteAll = () => {
    section.tasks.map(task => deleteTask(task))
    closeModal()
  }

  return (
    <>
      <div className='modal_backdrop' onClick={() => closeModal()}>
        <div style={modalStyle} onClick={e => e.stopPropagation()}>
          <button className='section-action' onClick={() => handleClickAdd()}>Add task </button>
          <button className='section-action' onClick={() => handleClickCopy()}>Copy list</button>
          <button className='section-action' onClick={() => handleClickMove()}>Move list &nbsp;<img className='arrow' src={arrow} /></button>
          <button className='section-action' onClick={() => handleClickMoveAll()}>Move all tasks &nbsp;<img className='arrow' src={arrow} /></button>
          <button className='section-action delete' onClick={() => handleClickDelete()}>Delete</button>
          <button className='section-action delete' onClick={() => handleClickDeleteAll()}>Delete all tasks</button>
        </div>
      </div>
    </>
  )
}

export default SectionActions
