import React, { useState } from 'react'
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
import CIcon from '@coreui/icons-react'
import { cilFile, cilBadge, cilPencil, cilTrash, cilStorage } from '@coreui/icons'
import {makeRequest} from '../../../../axios'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createMateri } from '../../../../services/api'

const AddMateri = () => {
    const [err, setErr] = useState(null);
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

    const createMateriMutation = useMutation({
        mutationFn: createMateri,
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['materi'] })
          navigate('/guru/materi')
        },
        onError:(err) => {
            console.log(err.response.data.msg)
        }
    })
    const handleSubmit = async (materi) => {
      createMateriMutation.mutate({...materi})
      setInputs({
        name: '',
        about: '',
        file: '',
      })
    };
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Tambah materi</strong>
          </CCardHeader>
          <CCardBody>
              {/* <AddMateriForm onsubmit={handleSubmit}/> */}
                <CForm encType='multipart/form-data'>
                    <div className="mb-3">
                        <CFormLabel htmlFor="judul">Judul</CFormLabel>
                        <CFormInput
                            type="text"
                            id="judul"
                            name='name'
                            placeholder="ex : Materi Pengenalan Jarkom"
                            onChange={handleChange} required 
                        />
                    </div>
                    <div className="mb-3">
                        <CFormLabel htmlFor="keterangan">Keterangan</CFormLabel>
                        <CFormTextarea 
                            id="keterangan" 
                            name='about'
                            rows={3}
                            placeholder='Jelaskan secara garis besar apa yang dapat murid ketahui dari belajar materi ini'
                            onChange={handleChange}
                        >
                        </CFormTextarea>
                    </div>
                    <div className="mb-3">
                        <CFormLabel htmlFor="judul">Link Embed File PDF</CFormLabel>
                        <CFormInput
                            type="text"
                            id="file"
                            name='file'
                            placeholder="ex : https://drive.google.com/file/d/####/preview"
                            onChange={handleChange} required 
                        />
                    </div>
                    <div className="d-grid">
                        <CButton color="primary" onClick={()=>{handleSubmit(input)}}>Buat Materi</CButton>
                    </div>
                </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default AddMateri
