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
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnswer, createSoal } from '../../../../services/api'
import { useAnswerById, useSoalById } from '../../../../hooks/queries';

const AddAnswer = () => {
    const { id } = useParams()
    const { data : soal, isPending, isError, error, isFetching,} = useSoalById(id)
    const navigate = useNavigate()
    const [file, setFile] = useState({
      file : ""
    });
    const handleChange = (e) => {
      setFile({
        ...file,
        [e.target.name]: e.target.value,
      })
    };
    const queryClient = useQueryClient()

    const createMutation = useMutation({
        mutationFn: createAnswer,
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['materi'] })
          navigate('/answer/me')
        },
        onError:(err) => {
            console.log(err.response.data.msg)
        }
    })
    const handleSubmit = async (content) => {
      console.log(content);
      createMutation.mutate({id, ...content})
      setFile("")
    };

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          
        {isPending? ( <span>Loading ...</span>
            ) : isError ? (
              <div>Error: {error.message}</div>
            ) : (
          <>
          <CCardHeader>
            <strong>Jawab soal</strong>
          </CCardHeader>
          <CCardBody>
              {/* <AddMateriForm onsubmit={handleSubmit}/> */}
                <div>
                <p className='mb-4 mt-0'>
                  Pembuat : <strong> {soal.user.name} </strong>
                </p>
                <p className='mb-4'>
                    {soal.about}
                </p>
                </div>
                <CForm encType='multipart/form-data'>
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
                    
                    <div className="d-grid">
                        <CButton color="primary" onClick={()=>{handleSubmit(file)}}>Buat Jawaban</CButton>
                    </div>
                </CForm>
                <div style={{display:'flex', justifyContent:'center'}} className='mt-3'>
                  <iframe
                    width="1000" 
                    height="700" 
                    src={soal.file}
                  ></iframe>
                </div>
          </CCardBody>
          </>
          )}
          {isFetching ? <span> Loading...</span> : null}{' '}
        </CCard>
      </CCol>
    </CRow>
  )
}

export default AddAnswer
