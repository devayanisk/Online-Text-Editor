import React, { useEffect, useRef } from 'react'
import "quill/dist/quill.snow.css"
import Quill from 'quill'




const TextEditor = () => {

    const wrapperRef = useRef()

    useEffect(() => {
        var quill = new Quill('#container', {
            theme: 'snow'
        })
    }, [])



    return (
        <>
            <div id='container' >
            </div>
        </>
    )
}

export default TextEditor