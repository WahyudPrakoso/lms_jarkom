import { CButton, CForm, CFormInput, CFormLabel, CFormTextarea } from '@coreui/react'
import { useState } from 'react'
const EditMateriForm = ({onsubmit, initialValue})=>{
    const [materi, setMateri] = useState({
        name: initialValue?.name || '',
        about: initialValue?.about || ''
    })
    const [file, setFile] = useState(null)
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
                placeholder="ex : Materi Pengenalan Jarkom"
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
                placeholder='Jelaskan secara garis besar apa yang dapat murid ketahui dari belajar materi ini'
                onChange={handleChangeInput}
                value = {materi[elementName.toLowerCase()]} 
            >
            </CFormTextarea>
        </div>
    )
    const handleSubmit = (evt) => {
        evt.preventDefault()
    
        const formData = new FormData();
        formData.append("file", file);
        formData.append("name", materi.name);
        formData.append("about", materi.about);
        onsubmit(materi, file)
    
        setMateri({
          name: '',
          about: '',
        })
        setFile(null)
    }
    return(
        <CForm encType='multipart/form-data' id='formEditMateri'>

            {createTextInputElement('name')}
            {createTextareaInputElement('about')}
            
            <div className="mb-3">
                <CFormLabel htmlFor="formFile">File Materi Baru</CFormLabel>
                <CFormInput type="file" id="formFile" name='file' onChange={(e)=> setFile(e.target.files[0])}/>
            </div>
            <div className="d-grid">
                <CButton color="primary" onClick={handleSubmit}>Edit Materi</CButton>
            </div>
        </CForm>
    )
}

export default EditMateriForm
