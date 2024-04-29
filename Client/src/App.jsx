import { useState } from 'react'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import LandingPage from './LandingPage';
import LoginForm from './Forms/LoginForm';
import SignupForm from './Forms/SignupForm';
import TaskWorkspace from './Workspaces/TaskWorkspace';
import FileList from './Files/FileList';
import './App.css'
import UserContext from './auth/UserContext';
import NavBar from './Navigation/NavBar';

function App() {
  const [currentUser, setCurrentUser] = useState({ first_name: "Jimmy", last_name: "Dean" });

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<LandingPage />}>
        <Route index element={<NavBar />} />
        <Route path="login" element={<LoginForm />} />
        <Route path="signup" element={<SignupForm />} />
        <Route path="tasks" element={<TaskWorkspace />} />
        <Route path="files" element={<FileList />} />
      </Route>
    )
  );


  return (
    <RouterProvider router={router} />
  );
}

export default App;

/*
<UserContext.Provider
        value={{ currentUser, setCurrentUser }}>
        </UserContext.Provider>
*/