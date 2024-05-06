import React from 'react'
import ReactDOM from 'react-dom/client'
import { Route , createRoutesFromElements, createBrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import LandingPage from './LandingPage.jsx'
import NavBar from './Navigation/NavBar.jsx'
import LoginSignupLayout from './LoginSignupSearch/LoginSignupLayout.jsx'
import TaskWorkspace from './Workspaces/TaskWorkspace.jsx'
import FileWorkspace from './Workspaces/FileWorkspace.jsx'
import WalkthroughPage from './WalkthroughPage.jsx'
import MessagingWorkspace from './Workspaces/MessagingWorkspace.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<NavBar />} >
      <Route index element={<LandingPage />} />
      <Route path="login" element={<LoginSignupLayout mode={"login"} />} />
      <Route path="signup" element={<LoginSignupLayout mode={"signup"} />} />
      <Route path="tasks" element={<TaskWorkspace />} />
      <Route path="files" element={<FileWorkspace />} />
      <Route path="messages" element={<MessagingWorkspace />} />
      <Route path="walkthrough" element={<WalkthroughPage />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App router={router}/>
  </React.StrictMode>,
)
