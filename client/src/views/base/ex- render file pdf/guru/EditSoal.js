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
import { useSoalById } from '../../../../hooks/queries'
import { editSoal } from '../../../../services/api'
import EditSoalForm from './EditFormSoal'

const EditSoal = () => {
    const [err, setErr] = useState(null);
    
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const { id } = useParams()
    const { isPending, isError, data: materi, error, isFetching, isPlaceholderData } = useSoalById(id)
    const updateSoalMutation = useMutation({
        mutationFn: editSoal,
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['soal'] })
          navigate('/guru/soal')
        },
        onError:(err) => {
            console.log(err.response.data.msg)
        }
    })
    const handleSubmit = async (updatedSoal, updatedFile) => {
        updateSoalMutation.mutate({ id, ...updatedSoal, updatedFile})
    };
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Edit Soal</strong>
          </CCardHeader>
          <CCardBody>
            
            {isPending? ( <span>Loading ...</span>
            ) : isError ? (
              <div>Error: {error.message}</div>
            ) : (
              <EditSoalForm onsubmit={handleSubmit} initialValue={materi} />     
          )}
          {isFetching ? <span> Loading...</span> : null}{' '}
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default EditSoal
