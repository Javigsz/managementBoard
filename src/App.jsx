import './App.css'
import Header from './components/Header/Header'
import MainBoard from './components/Board/MainBoard'
import { project } from './mocks/project'
import { useState } from 'react'
import { FiltersProvider } from './context/filters'

function App () {
  const [projectState, setProjectState] = useState(project)
  return (
    <>
      <FiltersProvider>
        <header>
          <Header projectState={projectState} setProjectState={setProjectState} />
        </header>
        <MainBoard
          projectState={projectState}
          setProjectState={setProjectState}
        />
      </FiltersProvider>
    </>
  )
}

export default App
