import React from 'react'
import { Route, Routes } from 'react-router-dom'
import MainLayout from './layouts/mainlayout'
import LogInPage from './pages/logInPage'
import SignUpPage from './pages/signUpPage'
import ProjectsList from './pages/projects-list'

export default function App() {
  return (
   <Routes>
    <Route path="/" element={<MainLayout/>}>
      <Route path="/login" element={<LogInPage/>}/>
      <Route path="/signup" element={<SignUpPage/>}/>
      <Route path="/projects" element={<ProjectsList/>}/>
      {/* add the project layout here*/}
    </Route>
   </Routes>
  )
}
