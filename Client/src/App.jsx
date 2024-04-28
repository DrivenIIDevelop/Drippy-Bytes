import Workspaces from './Navigation/Workspaces'
import NavBar from './Navigation/NavBar'
import Task from './Tasks/Task'
import './App.css'

function App() {
  const fakeTask = {task_name: "wash dishes", date_completed: "4/26",
status: "in_progress", due_date: "4/29", department: "Development"};




  return (
    <>
      <NavBar/>
      <div className='main'>
        <Workspaces/>
        <Task task = {fakeTask}/>
      </div>
    </>
  )
}

export default App
