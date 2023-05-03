import React, { useState, useEffect } from 'react'
import axios from 'axios'
import DocumentCard from '../../components/DocumentCard'
import Modal from '../../components/CreateDocumentModal'

const Notes = () => {

    const [notes, setNotes] = useState([])
    let authToken = localStorage.getItem("authToken");


    // Render the first time
    useEffect(() => {
        getDocuments();
    }, []);

    const getDocuments = async () => {
        let response = await axios.get("http://localhost:6001/api/document/fetch-documents", { headers: { authToken } })
        let response2 = await axios.get("http://localhost:6001/api/share/fetch-share", { headers: { authToken } })
        // console.log(response.data);
        setNotes([...response.data, ...response2.data]);
    }

    const deleteDocument = async (id) => {
        let response = await axios.delete(`http://localhost:6001/api/document/delete-document/${id}`, { headers: { authToken } });

        window.location.reload(true)
        // console.log(response.data);
        //alert(`Document ${response.data.deletedDocument.title} deleted!`)
        getDocuments();
    }


    return (
        <>
            <div className='container mt-4'>
                <h1>Notes</h1>

                <Modal />

                
                <div className='container d-flex flex-wrap'>
                    {notes?.map((note) => {
                        return (<DocumentCard note={note} deleteDocument={deleteDocument} key={note._id} />)
                    })}
                </div>


            </div>

        </>
    )
}
export default Notes