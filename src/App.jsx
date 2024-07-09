import './App.css'
import Header from './components/Header/Header'
import MainBoard from './components/Board/MainBoard'
import { project } from './mocks/project'
import { useState } from 'react'

function App () {
  const [projectState, setProjectState] = useState(project)
  return (
    <>
      <header>
        <Header projectState={projectState} setProjectState={setProjectState} />
      </header>
      <MainBoard
        projectState={projectState}
        setProjectState={setProjectState}
      />
    </>
  )
}

export default App
