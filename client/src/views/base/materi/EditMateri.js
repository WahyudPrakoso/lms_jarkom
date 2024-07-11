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
import {makeRequest} from '../../../axios'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useMateriById } from '../../../hooks/queries'
import { editMateri } from '../../../services/api'
import EditMateriForm from './EditFormMateri'

const EditMateri = () => {
    const [err, setErr] = useState(null);
    
    const navigate = useNavigate()
    // const [input, setInputs] = useState({
    //     name : "",
    //     about : ""
    // });
    // const handleChange = (e) => {
    //     setInputs((prev) => ({...prev, [e.target.name] : e.target.value}));
    //   };
    const queryClient = useQueryClient()

    const { id } = useParams()
    const { isPending, isError, data: materi, error, isFetching, isPlaceholderData } = useMateriById(id)
    const updateMateriMutation = useMutation({
        mutationFn: editMateri,
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['materi'] })
          navigate('/murid/materi')
        },
        onError:(err) => {
            console.log(err.response.data.msg)
        }
    })
    const handleSubmit = async (updatedMateri, updatedFile) => {
        updateMateriMutation.mutate({ id, ...updatedMateri, updatedFile})
    };
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Daftar materi</strong>
          </CCardHeader>
          <CCardBody>
            
            {isPending? ( <span>Loading ...</span>
            ) : isError ? (
              <div>Error: {error.message}</div>
            ) : (
              <EditMateriForm onsubmit={handleSubmit} initialValue={materi} />
                // <CForm encType='multipart/form-data'>
                //     <div className="mb-3">
                //         <CFormLabel htmlFor="judul">Judul</CFormLabel>
                //         <CFormInput
                //             type="text"
                //             id="judul"
                //             name='name'
                //             placeholder="ex : Materi Pengenalan Jarkom"
                //             onChange={handleChange} required 
                //         />
                //     </div>
                //     <div className="mb-3">
                //         <CFormLabel htmlFor="keterangan">Keterangan</CFormLabel>
                //         <CFormTextarea 
                //             id="keterangan" 
                //             name='about'
                //             rows={3}
                //             placeholder='Jelaskan secara garis besar apa yang dapat murid ketahui dari belajar materi ini'
                //             onChange={handleChange}
                //         >
                //         </CFormTextarea>
                //     </div>
                //     <div className="mb-3">
                //         <CFormLabel htmlFor="formFile">File Materi Baru</CFormLabel>
                //         <CFormInput type="file" id="formFile" name='file'/>
                //     </div>
                //     <p className="text-body-secondary">{err && err}</p>

                //     <div className="d-grid">
                //         <CButton color="primary" onClick={handleSubmit}>Buat Materi</CButton>
                //     </div>
                // </CForm>     
          )}
          {isFetching ? <span> Loading...</span> : null}{' '}
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default EditMateri
