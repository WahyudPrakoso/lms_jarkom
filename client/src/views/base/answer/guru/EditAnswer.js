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
import { useAnswerById } from '../../../../hooks/queries'
import { editAnswer } from '../../../../services/api'
import EditAnswerForm from './EditFormAnswer'

const EditAnswer = () => {
    const [err, setErr] = useState(null);
    
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const { id } = useParams()
    const { isPending, isError, data: materi, error, isFetching, isPlaceholderData } = useAnswerById(id)
    const updateAnswerMutation = useMutation({
        mutationFn: editAnswer,
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['answer'] })
          navigate('/answer/me')
        },
        onError:(err) => {
            console.log(err.response.data.msg)
        }
    })
    const handleSubmit = async (updatedAnswer) => {
        updateAnswerMutation.mutate({ id, ...updatedAnswer})
    };
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Edit Answer</strong>
          </CCardHeader>
          <CCardBody>
            
            {isPending? ( <span>Loading ...</span>
            ) : isError ? (
              <div>Error: {error.message}</div>
            ) : (
              <EditAnswerForm onsubmit={handleSubmit} initialValue={materi} />     
          )}
          {isFetching ? <span> Loading...</span> : null}{' '}
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default EditAnswer
