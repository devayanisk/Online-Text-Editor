import "quill/dist/quill.snow.css"

import React from "react";
import {Route, Routes } from "react-router-dom";
import Editor from "./pages/Editor/Editor"
import Login from "./pages/Authentication/Login";
import Signup from "./pages/Authentication/Signup";

function App() {
  return (
    <Routes>
      <Route path="/editor" element={<Editor/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path='/signup' element={<Signup />}/>
    </Routes>
    
  )
}

export default App
