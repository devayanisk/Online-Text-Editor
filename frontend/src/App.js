import "quill/dist/quill.snow.css"

import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Editor from "./Editor"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Editor/>}/>
    </Routes>
    
  )
}

export default App
