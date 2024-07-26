import { cifId, cilBadge, cilLockLocked, cilPhone, cilUser } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { CButton, CForm, CFormInput, CFormLabel, CFormTextarea, CInputGroup, CInputGroupText } from '@coreui/react'
import { useEffect, useState } from 'react'

const EditUserForm = ({onsubmit, initialValue})=>{
    let kontak = []
    for (let i = 0; i < initialValue.no_hp.length; i++) {
        if (i < 3) continue;
        kontak.push(initialValue.no_hp[i])
    }
    const [input, setInputs] = useState({
        name : initialValue?.name || '',
        email : initialValue?.email || '',
        password : '',
        confpassword: '',
        no_hp : kontak.join('') || '',
        code : initialValue?.role || ''
        
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
    
    const handleSubmit = (evt) => {
        onsubmit(input)
        setInputs({
            name : "",
            email : "",
            password : "",
            confpassword: "",
            no_hp : "",
            code : ""
            
        })
    }
    return(
        <CForm>
            <CInputGroup className="mb-3">
                <CInputGroupText>
                    <CIcon icon={cilUser} />
                </CInputGroupText>
                <CFormInput placeholder="Nama Lengkap" autoComplete="name" value={input.name} name="name" onChange={handleChange} required />
            </CInputGroup>
            <CInputGroup className="mb-3">
                <CInputGroupText>@</CInputGroupText>
                <CFormInput type="email" placeholder="Email" autoComplete="email" value={input.email} name="email" onChange={handleChange} required/>
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
                    placeholder="Ulangi Password"
                    autoComplete="new-password"
                    name="confpassword" onChange={handleChange}
                    required
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
            <div className="d-grid">
                <CButton color="primary" onClick={()=>{handleSubmit(input)}}>Edit User</CButton>
            </div>
        </CForm>
    )
}

export default EditUserForm
