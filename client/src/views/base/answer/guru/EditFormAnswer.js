import { CButton, CForm, CFormInput, CFormLabel, CFormTextarea } from '@coreui/react'
import { useState } from 'react'
import DateTimePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import moment from 'moment-timezone';
moment.tz("Asia/Jakarta")

const EditAnswerForm = ({onsubmit, initialValue})=>{
    const [answer, setAnswer] = useState({
        file: initialValue?.file || ''
    })
    const [deadline, setDeadline] = useState(new Date())
    const handleChangeInput = (evt) => {
        setAnswer({
          ...answer,
          [evt.target.name]: evt.target.value,
        })
    }
    const createFileInputElement = (elementName) => (
        <div className="mb-3">
            <CFormLabel htmlFor="file">Link Embed File PDF</CFormLabel>
            <CFormInput
                type="text"
                id="file"
                name={elementName.toLowerCase()}
                placeholder="ex :  https://drive.google.com/file/d/####/preview"
                onChange={handleChangeInput} required
                value = {answer[elementName.toLowerCase()]} 
            />
        </div>
    )
    const handleSubmit = (evt) => {
        onsubmit(answer)
    
        setAnswer({
          file:''
        })
    }

    return(
        <CForm encType='multipart/form-data' id='formEditMateri'>
            {createFileInputElement('file')}
            <CFormLabel htmlFor='deadline'>Deadline</CFormLabel>
            <div className="d-grid">
                <CButton color="primary" onClick={()=>{handleSubmit(answer)}}>Edit Answer</CButton>
            </div>
        </CForm>
    )
}

export default EditAnswerForm
