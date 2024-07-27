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
          setErr(err.response.data.msg)
        }
    })
    const handleSubmit = async (updatedUser) => {
      let pass = false
      if(updatedUser.name=='') {setErr("Nama tidak boleh kosong !!")}
      else if(updatedUser.email=='') {setErr("Email tidak boleh kosong !!")}
      else if(updatedUser.password=='') {setErr("Password tidak boleh kosong !!")}
      else if(updatedUser.confpassword=='') {setErr("Confirm Password tidak boleh kosong !!")}
      else if(updatedUser.no_hp=='') {setErr("Kontak tidak boleh kosong !!")}
      else {pass = true}
      if(pass){
        updateUserMutation.mutate({ id, ...updatedUser})
        setInputs({
          name : "",
          email : "",
          password : "",
          confpassword: "",
          no_hp : "",
          code : ""
        })
        
      }
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
              <EditUserForm onsubmit={handleSubmit} initialValue={user} err={err} />     
          )}
          {isFetching ? <span> Loading...</span> : null}{' '}
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default EditUser
