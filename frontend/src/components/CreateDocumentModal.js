import React, { useState } from "react";
import axios from 'axios'

function Modal() {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let authToken = localStorage.getItem("authToken");

  const [title, setTitle] = useState('');

  const onChange = (e) =>{
    switch (e.target.name) {
        case 'title':
            setTitle(e.target.value);
            break;
        default:
            break;
    }
}

  const createDoc = async() => {
    const data = {
        title: title,
    }
    let response = await axios.post(`http://localhost:6001/api/document/add-document/`, data , { headers: { authToken } });
    handleClose();
    window.location.reload(true);

  }

  return (
    <>

    <button className="btn btn-primary" onClick={handleShow}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-circle" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
        </svg>
    </button>

    <div className={`modal ${show ? "show" : ""}`} tabIndex="-1" role="dialog" style={{ display: show ? "block" : "none" }}>
    <div className="modal-dialog" role="document">
        <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title">Add Document</h5>
                <button type="button" className="close" onClick={handleClose} aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="modal-body">
                <div className="form-group">
                    <label htmlFor="title">Title:</label>
                    <input type="text" className="form-control" id="title" name='title' onChange={onChange}/>
                </div>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleClose}>
                    Close
                </button>
                <button type="button" className="btn btn-primary" onClick={createDoc}>
                    Save Changes
                </button>
            </div>
        </div>
    </div>
    </div>

    {show && <div className="modal-backdrop show" onClick={handleClose}></div>}
    </>
  );
}

export default Modal;
