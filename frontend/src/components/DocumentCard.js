import React from 'react'
import { Link } from 'react-router-dom'

const DocumentCard = (props) => {

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
                    <button type="button" className="btn btn-outline-danger btn-sm" onClick={() => { deleteDocument(props.note._id) }}>Delete</button>
                </div>
            </div>
        </>
    )
}

export default DocumentCard