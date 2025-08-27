import React from 'react'
import { Route, Routes } from 'react-router-dom'
import MainLayout from './layouts/mainlayout'
import LogInPage from './pages/logInPage'
import SignUpPage from './pages/signUpPage'
import ProjectsList from './pages/projects-list'
import ProtectedRoute from './features/authentication/protectedRoute'
import ProjectPage from './pages/projectPage'

export default function App() {
  return (
   <Routes>
    <Route path="/" element={<MainLayout/>}>
      <Route path="/login" element={<LogInPage/>}/>
      <Route path="/signup" element={<SignUpPage/>}/>
      <Route path="/projects" element={
        <ProtectedRoute>
          <ProjectsList/>
        </ProtectedRoute>
      }/>
      <Route path="/project/:id" element={
        <ProtectedRoute>
          <ProjectPage/>
        </ProtectedRoute>
      }/>
    </Route>
   </Routes>
  )
}
