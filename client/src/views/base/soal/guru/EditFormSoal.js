import { CButton, CForm, CFormInput, CFormLabel, CFormTextarea } from '@coreui/react'
import { useState } from 'react'
import DateTimePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import moment from 'moment-timezone';
moment.tz("Asia/Jakarta")

const EditSoalForm = ({onsubmit, initialValue})=>{
    const [soal, setSoal] = useState({
        name: initialValue?.name || '',
        about: initialValue?.about || '',
        file: initialValue?.file || ''
    })
    const [deadline, setDeadline] = useState(new Date())
    const handleChangeInput = (evt) => {
        setSoal({
          ...soal,
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
                placeholder="ex : Soal Materi Pengenalan Jarkom"
                onChange={handleChangeInput} required
                value = {soal[elementName.toLowerCase()]} 
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
                placeholder='Jelaskan secara garis besar apa yang akan murid kerjakan dari soal ini'
                onChange={handleChangeInput}
                value = {soal[elementName.toLowerCase()]} 
            >
            </CFormTextarea>
        </div>
    )
    const createFileInputElement = (elementName) => (
        <div className="mb-3">
            <CFormLabel htmlFor="file">Link Embed File PDF</CFormLabel>
            <CFormInput
                type="text"
                id="file"
                name={elementName.toLowerCase()}
                placeholder="ex :  https://drive.google.com/file/d/####/preview"
                onChange={handleChangeInput} required
                value = {soal[elementName.toLowerCase()]} 
            />
        </div>
    )
    const handleSubmit = (evt) => {
        onsubmit(soal, deadline)
    
        setSoal({
          name: '',
          about: '',
          file:''
        })
        setDeadline(new Date())
    }

    return(
        <CForm encType='multipart/form-data' id='formEditMateri'>

            {createTextInputElement('name')}
            {createTextareaInputElement('about')}
            {createFileInputElement('file')}
            <CFormLabel htmlFor='deadline'>Deadline</CFormLabel>
            <div className='mb-3'>
                <DateTimePicker
                    id='deadline'
                    calendarAriaLabel="Toggle calendar"
                    clearAriaLabel="Clear value"
                    dayAriaLabel="Day"
                    hourAriaLabel="Hour"
                    maxDetail="second"
                    minuteAriaLabel="Minute"
                    monthAriaLabel="Month"
                    nativeInputAriaLabel="Date and time"
                    secondAriaLabel="Second"
                    yearAriaLabel="Year" 
                    onChange={setDeadline} 
                    value={deadline} 
                />
            </div>
            <div className="d-grid">
                <CButton color="primary" onClick={()=>{handleSubmit(soal,deadline)}}>Edit Soal</CButton>
            </div>
        </CForm>
    )
}

export default EditSoalForm
