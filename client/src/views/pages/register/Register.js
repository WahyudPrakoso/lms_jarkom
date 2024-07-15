import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilBadge, cilLockLocked, cilPhone, cilUser } from '@coreui/icons'
import {makeRequest} from '../../../axios'
import { Link, useNavigate } from 'react-router-dom'

const Register = () => {

  const [input, setInputs] = useState({
    name : "",
    email : "",
    password : "",
    confpassword: "",
    no_hp : "",
    code : ""
    
  });
  
  const [err, setErr] = useState(null)

  const navigate = useNavigate()

  const handleChange = (e) => {
    setInputs((prev) => ({...prev, [e.target.name] : e.target.value}));
  };

  function timeout(delay) {
    return new Promise( res => setTimeout(res, delay) );
  }

  const handleRegister = async (e) => {
    e.preventDefault() // prevent auto refresh

    try{
      
      await makeRequest.post("/user", input);
      setErr("Register berhasil silahkan login !!")
      await timeout(1500);
      navigate("/login");
    }catch(err){
      setErr(err.response.data)
    }
  };
  
  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1>Daftar akun</h1>
                  <p className="text-body-secondary">Segera selesaikan pendaftaran akun dan mulai belajar !</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput placeholder="Nama Lengkap" autoComplete="name" name="name" onChange={handleChange} required />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput type="email" placeholder="Email" autoComplete="email" name="email" onChange={handleChange} required/>
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
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Repeat password"
                      autoComplete="new-password"
                      name="confpassword" onChange={handleChange}
                      required
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilPhone} />
                    </CInputGroupText>
                    <CFormInput placeholder="Kontak nomor" autoComplete="kontak-nomor" name="no_hp" onChange={handleChange} required/>
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilBadge} />
                    </CInputGroupText>
                    <CFormInput placeholder="Kode spesial" autoComplete="code" name="code" onChange={handleChange} required />
                  </CInputGroup>

                  <p className="text-body-secondary">{err && err}</p>

                  <div className="d-grid">
                    <CButton color="success" onClick={handleRegister} style={{color:'white'}}>Buat Akun</CButton>
                  </div>
                  <p className="text-body-secondary mt-2">Sudah punya akun ?
                    <Link to="/login">
                      <CButton color="link" className="px-1">
                          Masuk
                      </CButton>
                    </Link>
                  </p>

                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
