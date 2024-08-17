import { useEffect, useState } from 'react'
import { CiMenuBurger } from 'react-icons/ci'
import { IoFilter } from 'react-icons/io5'
import Menu from './Menu'
import Filter from './Filter'
import './index.css'

const Header = ({ projectState, setProjectState }) => {
  const [openMenu, setOpenMenu] = useState(false)
  const [openFiltrer, setOpenFiltrer] = useState(false)

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
          className='header-input'
          style={{ width: projectState.name.length + 'ch' }}
          value={projectState.name}
          onChange={event => handleInputChange(event)}
          onBlur={event => handleOnBlur(event)}
        />
        <div className='buttons' style={{ right: openMenu ? '277px' : '7px' }}>
          <div className='search-container'>
            <input className='search-input' type='text' placeholder='Buscar' />
          </div>
          <button className={`filter ${openFiltrer ? 'open' : ''}`} onClick={() => setOpenFiltrer(!openFiltrer)}>Filter&nbsp;<IoFilter size={15} /></button>
          <button className={`filter ${openMenu ? 'open' : ''}`} onClick={() => setOpenMenu(!openMenu)}>
            <CiMenuBurger size={15} />
          </button>
          {openFiltrer &&
            <Filter
              closeModal={() => setOpenFiltrer(false)}
              openFilter={openFiltrer}
              setOpenFilter={setOpenFiltrer}
              projectState={projectState}
              setProjectState={setProjectState}
            />}
        </div>
      </div>
      <Menu openMenu={openMenu} setOpenMenu={setOpenMenu} projectState={projectState} setProjectState={setProjectState} />
    </>
  )
}

export default Header
