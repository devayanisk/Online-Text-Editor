import React, { useState, useEffect } from 'react'
import axios from 'axios'
import DocumentCard from '../../components/DocumentCard'

const Notes = () => {

    const [notes, setNotes] = useState()

    const url = "http://localhost:6001/api/document/fetch-documents";
    let authToken = localStorage.getItem("authToken");
    
    // Render the first time
    useEffect(() => {
        getDocuments();
    }, []);

    const getDocuments = async () => {
        let response = await axios.get("http://localhost:6001/api/document/fetch-documents", { headers: { authToken } })

        // console.log(response.data);
        setNotes(response.data);
    }

    const deleteDocument = async (id) => {
        let response = await axios.delete(`http://localhost:6001/api/document/delete-document/${id}`, { headers: { authToken } });

        // console.log(response.data);
        getDocuments();
    }


    return (
        <>
            <div className='container mt-4'>
                <h1>Notes</h1>

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