import Workspaces from './Navigation/Workspaces'
import NavBar from './Navigation/NavBar'
import './App.css'

function App() {

  return (
    <>
      <NavBar/>
      <div className='main'>
        <Workspaces/>
      </div>
    </>
  )
}

export default App
