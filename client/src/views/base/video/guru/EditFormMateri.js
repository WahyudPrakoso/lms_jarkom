import { CButton, CForm, CFormInput, CFormLabel, CFormTextarea } from '@coreui/react'
import { useState } from 'react'
const EditVideoForm = ({onsubmit, initialValue})=>{
    const [materi, setMateri] = useState({
        name: initialValue?.name || '',
        about: initialValue?.about || '',
        link: initialValue?.link || ''
    })
    const handleChangeInput = (evt) => {
        setMateri({
          ...materi,
          [evt.target.name]: evt.target.value,
        })
    }

    const createTextInputElement = (elementName) => (
        <div className="mb-3">
            <CFormLabel htmlFor="judul">Judul</CFormLabel>
            <CFormInput
                type="text"
                id="judul"
                name={elementName.toLowerCase()}
                placeholder="ex : Video Pengenalan Jarkom"
                onChange={handleChangeInput} required
                value = {materi[elementName.toLowerCase()]} 
            />
        </div>
    )
    const createLinkInputElement = (elementName) => (
        <div className="mb-3">
            <CFormLabel htmlFor="link">Link Embed Video</CFormLabel>
            <CFormInput
                type="text"
                id="link"
                name={elementName.toLowerCase()}
                placeholder="ex : https://www.youtube.com/embed/###"
                onChange={handleChangeInput} required
                value = {materi[elementName.toLowerCase()]} 
            />
        </div>
    )
    const createTextareaInputElement = (elementName) => (
        <div className="mb-3">
            <CFormLabel htmlFor="keterangan">Keterangan</CFormLabel>
            <CFormTextarea 
                id="keterangan" 
                name={elementName.toLowerCase()}
                rows={3}
                placeholder='Jelaskan secara garis besar apa yang dapat murid ketahui dari belajar video ini'
                onChange={handleChangeInput}
                value = {materi[elementName.toLowerCase()]} 
            >
            </CFormTextarea>
        </div>
    )
    const handleSubmit = (evt) => {
        evt.preventDefault()
        onsubmit(materi)
        
        setMateri({
          name: '',
          about: '',
          link:''
        })
    }
    return(
        <CForm encType='multipart/form-data' id='formEditMateri'>

            {createTextInputElement('name')}
            {createTextareaInputElement('about')}
            {createLinkInputElement('link')}
            <div className="d-grid">
                <CButton color="primary" onClick={handleSubmit}>Edit Materi Video</CButton>
            </div>
        </CForm>
    )
}

export default EditVideoForm
