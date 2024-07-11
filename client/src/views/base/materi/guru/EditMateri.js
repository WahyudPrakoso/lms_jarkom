import React, { useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
} from '@coreui/react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useMateriById } from '../../../../hooks/queries'
import { editMateri } from '../../../../services/api'
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
          navigate('/guru/materi')
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
          )}
          {isFetching ? <span> Loading...</span> : null}{' '}
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default EditMateri
