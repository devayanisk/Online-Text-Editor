import React from 'react'
import { Link } from 'react-router-dom'
import ShareModal from './ShareModal'
import { useState } from "react";

const DocumentCard = (props) => {

    const [show, setShow] = useState(false);

    const handleClick = () => {
      setShow(true);
    }
  
    const handleModalClose = () => {
      setShow(false);
    }

    let timestamp = new Date(props.note.timestamp);
    let date = timestamp.toLocaleDateString();
    let time = timestamp.toLocaleTimeString();
    timestamp = date + "  " + time;

    let deleteDocument = props.deleteDocument;


    return (
        <>
            <div className="card" style={{ width: `18rem`, margin: `0.9rem` }}>
                <div className="card-body">
                    <h5 className="card-title">{props.note.title}</h5>
                    <p className="card-text" style={{ fontSize: "0.75rem" }}>Created On: {timestamp}</p>
                    <Link to={`http://localhost:3000/editor/${props.note._id}`} role="button" className="btn btn-outline-primary btn-sm me-3">Open</Link>
                    <button type="button" className="btn btn-outline-danger btn-sm me-3" onClick={() => { deleteDocument(props.note._id) }}>Delete</button>
                    <button type="button" className="btn btn-outline-secondary btn-sm" onClick={handleClick}>Share</button>
                    <ShareModal show={show} handleClose={handleModalClose} noteId={props.note._id}/>
                </div>
            </div>
        </>
    )
}

export default DocumentCard