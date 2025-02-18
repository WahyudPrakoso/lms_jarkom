import React, { useState } from 'react'
import DateTimePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import moment from 'moment-timezone';
moment.tz("Asia/Jakarta")
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormTextarea,
  CRow,
} from '@coreui/react'
import { Link, useNavigate } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createSoal } from '../../../../services/api'

const AddSoal = () => {
    const [deadline, setDeadline] = useState(new Date())
    const navigate = useNavigate()
    const [input, setInputs] = useState({
        name : "",
        about : "",
        file : ""
    });
    const handleChange = (e) => {
        setInputs((prev) => ({...prev, [e.target.name] : e.target.value}));
    };
    const queryClient = useQueryClient()

    const createMutation = useMutation({
        mutationFn: createSoal,
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['materi'] })
          navigate('/guru/soal')
        },
        onError:(err) => {
            console.log(err.response.data.msg)
        }
    })
    const handleSubmit = async (content,deadline) => {
      createMutation.mutate({...content,deadline})
      setInputs({
        name: '',
        about: '',
        file: '',
      })
      setDeadline(new Date())
    };

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Tambah Soal</strong>
          </CCardHeader>
          <CCardBody>
              {/* <AddMateriForm onsubmit={handleSubmit}/> */}
                <CForm encType='multipart/form-data'>
                    <div className="mb-3">
                        <CFormLabel htmlFor="judul">Pertanyaan</CFormLabel>
                        <CFormInput
                            type="text"
                            id="judul"
                            name='name'
                            placeholder="ex : Soal Materi Pengenalan Jarkom"
                            onChange={handleChange} required 
                        />
                    </div>
                    <div className="mb-3">
                        <CFormLabel htmlFor="keterangan">Keterangan</CFormLabel>
                        <CFormTextarea 
                            id="keterangan" 
                            name='about'
                            rows={3}
                            placeholder='Jelaskan secara garis besar apa yang akan murid kerjakan dari soal ini'
                            onChange={handleChange}
                        >
                        </CFormTextarea>
                    </div>
                    <div className="mb-3">
                        <CFormLabel htmlFor="file">Link Embed File PDF</CFormLabel>
                        <CFormInput
                            type="text"
                            id="file"
                            name='file'
                            placeholder="ex :  https://drive.google.com/file/d/####/preview"
                            onChange={handleChange} required 
                        />
                    </div>
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
                        <CButton color="primary" onClick={()=>{handleSubmit(input,deadline)}}>Buat Soal</CButton>
                    </div>
                </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default AddSoal
