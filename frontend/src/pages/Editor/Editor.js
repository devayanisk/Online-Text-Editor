import { useCallback, useEffect, useState } from "react"
import Quill from "quill"
import "quill/dist/quill.snow.css"
import { useParams } from "react-router-dom"
import '../../assets/editor.css';
import axios from "axios"


  const TOOLBAR_OPTIONS = [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ font: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["bold", "italic", "underline"],
    [{ color: [] }, { background: [] }],
    [{ script: "sub" }, { script: "super" }],
    [{ align: [] }],
    ["image", "blockquote", "code-block"],
    ["clean"],
  ];

const Editor = () => {

  const { id } = useParams()
  const [quill, setQuill] = useState()
  const [title, setTitle] = useState()

  useEffect(() => {
    const fetchData = async () => {
      if (id == null || quill == null) return
      const contents = await axios.get(`http://localhost:6001/api/document/document/${id}`);
      quill.setContents(contents.data.contents);
      setTitle(contents.data.title)
  
      quill.on("text-change", (delta, oldDelta, source) => {
        if (source !== "user") return 
        const content = quill.getContents()
        
        axios.put(`http://localhost:6001/api/document/update-document/${id}`, 
        {
          content: content,
        }, 
        {
          headers: {
            authToken: localStorage.getItem("authToken")
          }
        })
      })
  
      return () => {
        quill.off("text-change")
      }
    }
  
    fetchData();
  },[quill, id])
  

 

 const wrapperRef = useCallback(wrapper => {
    if (wrapper == null) return
  
    wrapper.innerHTML = ""
    const editor = document.createElement("div")
    wrapper.append(editor)
    const q = new Quill(editor, {
      theme: "snow",
      modules: { toolbar: TOOLBAR_OPTIONS },
    })
    setQuill(q)
  }, [])

  return (
    <>
      <div className="editor-container">
        <h3 style={{textAlign:"center"}}>{ title }</h3>
        <div ref={wrapperRef}></div>
      </div>
    </>
  )
}

export default Editor;
