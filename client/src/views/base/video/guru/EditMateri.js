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
import { useVideoById } from '../../../../hooks/queries'
import { editVideo } from '../../../../services/api'
import EditMateriForm from './EditFormMateri'

const EditVideoMateri = () => {
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
    const { isPending, isError, data: materi, error, isFetching, isPlaceholderData } = useVideoById(id)
    const updateMateriMutation = useMutation({
        mutationFn: editVideo,
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['video'] })
          navigate('/guru/video')
        },
        onError:(err) => {
            console.log(err.response.data.msg)
        }
    })
    const handleSubmit = async (updatedVideo) => {
        updateMateriMutation.mutate({ id, ...updatedVideo})
    };
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Edit Video</strong>
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

export default EditVideoMateri
