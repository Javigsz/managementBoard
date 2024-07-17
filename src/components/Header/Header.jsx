import { useEffect, useState } from 'react'
import { IoFilter } from 'react-icons/io5'
import { CiMenuBurger } from 'react-icons/ci'
import Menu from './Menu'
import './index.css'

const Header = ({ projectState, setProjectState }) => {
  const [openMenu, setOpenMenu] = useState(false)

  const handleInputChange = event => {
    setProjectState({ ...projectState, name: event.target.value })
    event.target.style.width = event.target.value.length + 'ch'
  }

  const handleOnBlur = event => {
    if (event.target.value === '') {
      const newName = 'New Project'
      setProjectState({ ...projectState, name: newName })
      event.target.style.width = newName.length + 'ch'
    }
  }

  useEffect(() => {
    document.title = projectState.name ?? 'New Project'
  }, [projectState.name])

  return (
    <>
      <div className='header'>
        <input
          style={{ width: projectState.name.length + 'ch' }}
          value={projectState.name}
          onChange={event => handleInputChange(event)}
          onBlur={event => handleOnBlur(event)}
        />
        <div className='buttons' style={{ right: openMenu ? '277px' : '7px' }}>
          <button className='filter'>
            <IoFilter /> Filter
          </button>
          <button className='filter' onClick={() => setOpenMenu(!openMenu)}>
            <CiMenuBurger size={15} />
          </button>
        </div>
      </div>
      <Menu openMenu={openMenu} setOpenMenu={setOpenMenu} projectState={projectState} />
    </>
  )
}

export default Header
