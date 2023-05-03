import React, { useState } from "react";
import axios from 'axios'

const ShareModal = (props) => {


  let authToken = localStorage.getItem("authToken");

  const [receiver, setReceiver] = useState('');

  const onChange = (e) =>{
    switch (e.target.name) {
        case 'receiver':
            setReceiver(e.target.value);
            break;
        default:
            break;
    }
}

  const ShareDoc = async() => {
    const data = {
        email: receiver,
        docId: props.noteId
    }
    console.log(receiver)
    let response = await axios.post(`http://localhost:6001/api/share/add-share/`, data , { headers: { authToken } });
    window.location.reload(true)
  }

  return (
    <>

    <div className={`modal ${props.show ? "show" : ""}`} tabIndex="-1" role="dialog" style={{ display: props.show ? "block" : "none" }}>
    <div className="modal-dialog" role="document">
        <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title">Share</h5>
                <button type="button" className="close" onClick={props.handleClose} aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="modal-body">
                <div className="form-group">
                    <label htmlFor="receiver">Receiver:</label>
                    <input type="text" className="form-control" id="receiver" name='receiver' onChange={onChange}/>
                </div>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={props.handleClose}>
                    Close
                </button>
                <button type="button" className="btn btn-primary" onClick={ShareDoc}>
                    Save Changes
                </button>
            </div>
        </div>
    </div>
    </div>

    {props.show && <div className="modal-backdrop show" onClick={props.handleClose}></div>}
    </>
  );
}

export default ShareModal;