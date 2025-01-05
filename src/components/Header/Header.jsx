import { useEffect, useState } from 'react'
import { CiMenuBurger } from 'react-icons/ci'
import { IoFilter } from 'react-icons/io5'

import Menu from './Menu'
import Filter from './Filter'
import './index.css'
import { useStore } from '../../store/store'
import SearchResult from './SearchResult'

const Header = () => {
  const [openMenu, setOpenMenu] = useState(false)
  const [openFiltrer, setOpenFiltrer] = useState(false)
  const [searchString, setSearchString] = useState('')
  const [openSearch, setOpenSearch] = useState(false)

  const projectName = useStore(state => state.project.name)
  const setProjectName = useStore((state) => state.setProjectName)

  const handleInputChange = event => {
    setProjectName(event.target.value)
    event.target.style.width = event.target.value.length + 'ch'
  }

  const handleOnBlur = event => {
    if (event.target.value === '') {
      const newName = 'New Project'
      setProjectName(newName)
      event.target.style.width = newName.length + 'ch'
    }
  }

  const handleSearchChange = (event) => {
    setSearchString(event.target.value)
  }

  const handleOpenFiltrer = () => {
    setOpenFiltrer(!openFiltrer)
    setOpenSearch(false)
  }

  //   const handleCloseSearch = (e) => {
  //     setSearchString('')
  //     setOpenSearch(!openSearch)
  //     console.log('asdfasdf')
  //   }

  const handleOnFocusSearch = () => {
    setOpenSearch(true)
    setOpenFiltrer(false)
  }

  useEffect(() => {
    if (projectName === '') {
      document.title = 'New Project'
    } else {
      document.title = projectName
    }
  }, [projectName])

  return (
    <>
      <div className='header'>
        <input
          className='header-input'
          style={{ width: projectName.length + 'ch' }}
          value={projectName}
          onChange={event => handleInputChange(event)}
          onBlur={event => handleOnBlur(event)}
        />
        <div className='buttons' style={{ right: openMenu ? '277px' : '7px' }}>
          <div className='search-container'>
            <input
              className='search-input'
              type='text'
              placeholder='Search'
              value={searchString}
              onChange={(e) => handleSearchChange(e)}
              onFocus={() => handleOnFocusSearch()}
              onBlur={() => setOpenSearch(false)}
            />
            {/* {openSearch && <div className='search-button' onClick={(e) => handleCloseSearch(e)}><IoCloseCircleSharp size={20} /></div>} */}
          </div>
          <button className={`filter ${openFiltrer ? 'open' : ''}`} onClick={() => handleOpenFiltrer()}>Filter&nbsp;<IoFilter size={15} /></button>
          <button className={`filter ${openMenu ? 'open' : ''}`} onClick={() => setOpenMenu(!openMenu)}>
            <CiMenuBurger size={15} />
          </button>
          {openFiltrer &&
            <Filter
              closeModal={() => setOpenFiltrer(false)}
              openFilter={openFiltrer}
              setOpenFilter={setOpenFiltrer}
            />}
          {/* {openSearch &&
            <SearchResult
              searchString={searchString}
            />} */}
        </div>
      </div>
      <Menu openMenu={openMenu} setOpenMenu={setOpenMenu} />
    </>
  )
}

export default Header
