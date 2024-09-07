import './App.css'
import Header from './components/Header/Header'
import MainBoardComponent from './components/Board/MainBoardComponent'
import { project } from './mocks/project'
import { useState } from 'react'
import { FiltersProvider } from './context/filters'

function App () {
  const [projectState, setProjectState] = useState(project)
  return (
    <>
      <FiltersProvider>
        <header>
          <Header />
        </header>
        <MainBoardComponent
          projectState={projectState}
          setProjectState={setProjectState}
        />
      </FiltersProvider>
    </>
  )
}

export default App
