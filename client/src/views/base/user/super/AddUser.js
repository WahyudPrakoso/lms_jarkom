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
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import { Link, useNavigate } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createUser } from '../../../../services/api'
import CIcon from '@coreui/icons-react';
import { cifId, cilBadge, cilLockLocked, cilPhone, cilUser } from '@coreui/icons';

const AddUser = () => {
    const [err, setErr] = useState(null)
    const navigate = useNavigate()
    const [input, setInputs] = useState({
      name : '',
      email : '',
      password : '',
      confpassword: '',
      no_hp : '',
      code : ''
    });
    const handleChange = (e) => {
        setInputs((prev) => ({...prev, [e.target.name] : e.target.value}));
    };
    
    function handleformatkontak (e) {
      let kontak = input.no_hp
      let newKontak = []
      if(kontak[0] === '0'){
        for (let i = 0 ; i < kontak.length; i++) {
          if(i==0) continue
          newKontak.push(kontak[i])
        }
        setInputs((prev) => ({...prev, no_hp : newKontak.join('')}))
      }
    }
    const queryClient = useQueryClient()

    const createMutation = useMutation({
        mutationFn: createUser,
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['user'] })
          navigate('/admin/user')
        },
        onError:(err) => {
            setErr(err.response.data.msg)
        }
    })
    const handleSubmit = async (content) => {
      let pass = false
      if(input.name=='') {setErr("Nama tidak boleh kosong !!")}
      else if(input.email=='') {setErr("Email tidak boleh kosong !!")}
      else if(input.password=='') {setErr("Password tidak boleh kosong !!")}
      else if(input.confpassword=='') {setErr("Confirm Password tidak boleh kosong !!")}
      else if(input.no_hp=='') {setErr("Kontak tidak boleh kosong !!")}
      else {pass = true}
      if(pass){
        createMutation.mutate({...content})
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
            <strong>Tambah User</strong>
          </CCardHeader>
          <CCardBody>
              {/* <AddMateriForm onsubmit={handleSubmit}/> */}
                <CForm encType='multipart/form-data'>
                <CInputGroup className="mb-3">
                  <CInputGroupText>
                    <CIcon icon={cilUser} />
                  </CInputGroupText>
                  <CFormInput placeholder="Nama Lengkap" autoComplete="name" name="name" value={input.name} onChange={handleChange} required />
                </CInputGroup>
                <CInputGroup className="mb-3">
                  <CInputGroupText>@</CInputGroupText>
                  <CFormInput type="email" placeholder="Email" autoComplete="email" name="email" value={input.email} onChange={handleChange} required/>
                </CInputGroup>
                <CInputGroup className="mb-3">
                   <CInputGroupText>
                    <CIcon icon={cilLockLocked} />
                  </CInputGroupText>
                  <CFormInput
                    type="password"
                    placeholder="Password"
                    autoComplete="new-password"
                    name="password" onChange={handleChange}
                    required
                    value={input.password}
                  />
                </CInputGroup>
                <CInputGroup className="mb-4">
                  <CInputGroupText>
                    <CIcon icon={cilLockLocked} />
                  </CInputGroupText>
                  <CFormInput
                    type="password"
                    placeholder="Ulangi Password"
                    autoComplete="new-password"
                    name="confpassword" onChange={handleChange}
                    required
                    value={input.confpassword}
                  />
                </CInputGroup>
                <CInputGroup className="mb-3">
                  <CInputGroupText>
                    <CIcon icon={cilPhone} />
                  </CInputGroupText>
                  <CInputGroupText>
                    <CIcon icon={cifId}></CIcon>
                    <span style={{marginLeft:'5px'}}>+62</span>
                  </CInputGroupText>
                    <CFormInput 
                      placeholder="Nomor Kontak" 
                      type='number' 
                      autoComplete="kontak-nomor" 
                      name="no_hp" 
                      onChange={handleChange} 
                      onBlur={handleformatkontak} 
                      value={input.no_hp}
                      required
                    />
                </CInputGroup>
                <CInputGroup className="mb-3">
                  <CInputGroupText>
                    <CIcon icon={cilBadge} />
                  </CInputGroupText>
                  <CFormInput 
                    placeholder="Kode spesial (optional)" 
                    autoComplete="code" 
                    name="code" 
                    onChange={handleChange} 
                    required 
                    value={input.code}
                  />
                </CInputGroup>
                <CFormLabel>{err && err}</CFormLabel>
                  <div className="d-grid">
                      <CButton color="primary" onClick={()=>{handleSubmit(input)}}>Buat User</CButton>
                  </div>
              </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default AddUser
