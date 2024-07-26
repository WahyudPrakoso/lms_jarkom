import React, { useEffect, useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
} from '@coreui/react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useUserById } from '../../../../hooks/queries'
import { editUser } from '../../../../services/api'
import EditUserForm from './EditFormUser'

const EditUser = () => {
    const [err, setErr] = useState(null);
    
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const { id } = useParams()
    const { isPending, isError, data: user, error, isFetching, isPlaceholderData } = useUserById(id)
    const updateUserMutation = useMutation({
        mutationFn: editUser,
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['edituser'] })
          navigate('/admin/user')
        },
        onError:(err) => {
            console.log(err.response.data.msg)
        }
    })
    const handleSubmit = async (updatedUser) => {
        updateUserMutation.mutate({ id, ...updatedUser})
    };
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Edit User</strong>
          </CCardHeader>
          <CCardBody>
            
            {isPending? ( <span>Loading ...</span>
            ) : isError ? (
              <div>Error: {error.message}</div>
            ) : (
              <EditUserForm onsubmit={handleSubmit} initialValue={user} />     
          )}
          {isFetching ? <span> Loading...</span> : null}{' '}
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default EditUser
