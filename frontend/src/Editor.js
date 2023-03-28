import Quill from 'quill'
//import './App.css';
import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {io} from 'socket.io-client'
import "quill/dist/quill.snow.css"

function Editor() {

  const [socket, setSocket] = useState();
  const [quill, setQuill] = useState();
  //const {id: docId} = useParams();

  useEffect(() => {
    const q = new Quill('#editor', {
        theme: 'snow'
    });
    setQuill(q)

  }, []);

  useEffect(() => {
    const s = io("http://localhost:3001")
    setSocket(s)
    return ()=>{
      s.disconnect()
    }
  },[]);

  useEffect(() => {
    if (socket && quill){

      const handler = function(delta, oldDelta, source) {
        if (source == 'user'){
          socket.emit("document-change", delta);
        }
      }

      quill.on('text-change', handler);

      return () => {
        quill.off('text-change', handler);
      } 
    }
    
  }, [quill, socket]);

  useEffect(() => {
    if (socket && quill){
      const handler = (delta) => {
        quill.updateContents(delta)
      }
      socket.on("document-update", handler)

      return () => {
        socket.off("document-update", handler)
      }
    }
  }, [socket, quill])

  return <div id="editor"></div>
}

export default Editor;

