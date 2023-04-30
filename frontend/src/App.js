import "quill/dist/quill.snow.css"

import React from "react";
import { Route, Router, Routes } from "react-router-dom";
import Editor from "./pages/Editor/Editor"
import Login from "./pages/Authentication/Login";
import Signup from "./pages/Authentication/Signup";
import Notes from "./pages/Notes/Notes";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
    
      <Navbar />

      <Routes>
        <Route exact path="/editor/:id" element={<Editor />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path='/signup' element={<Signup />} />
        <Route exact path="/notes" element={<Notes />} />
      </Routes>
    </>

  )
}

export default App
