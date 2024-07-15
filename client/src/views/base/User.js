import React, { useEffect, useState } from 'react'
import ResponsivePagination from 'react-responsive-pagination'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormInput,
  CFormSelect,
  CInputGroup,
  CInputGroupText,
  CLink,
  CPagination,
  CPaginationItem,
  CRow,
  CTable,
  CTableBody,
  CTableCaption,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPencil, cilTrash, cilStorage, cilZoom, cilReload, cilPlus } from '@coreui/icons'
import { useNavigate } from 'react-router-dom'
import { useUserPages } from '../../hooks/queries'

const VidMateri = () => {
    const [filter, setFilter] = useState();
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const [fieldFilter, setFieldFilter] = useState('');
    const navigate = useNavigate()
    
    const handleFilterField = (e) => {
      setFieldFilter(e.target.value)
    }
    const handleLimit = (e) => {
      setLimit(e.target.value)
    }

    const handleFilter = (filter) => {
      // console.log("materi ========> page " +page+" limit : "+limit+" filter : "+filter);
      setFilter(filter);
    }
    const { isPending, isError, data: user, error, isFetching, isPlaceholderData } = useUserPages(limit,page,filter)

    if (isError) return `Error: ${error.message}`
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <div style={{display:'flex'}} className='mt-2'>
              <h3>Daftar User</h3>
              <div style={{marginLeft:'auto'}}>
                <CInputGroup className="mb-3" >
                  <CFormSelect onChange={handleLimit} size='sm'>
                    <option disabled>Item/Page</option>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                  </CFormSelect>
                  <CInputGroupText id="basic-addon1" style={{backgroundColor:'#249542'}}>
                    <CLink to="/register">
                        <CButton className='p-0' style={{color:'white'}}>
                            Tambah Data <CIcon icon={cilPlus} size='lg'></CIcon>
                        </CButton>
                    </CLink>
                  </CInputGroupText>
                  <CFormInput aria-label="Username" type='text' name='search' placeholder='Cari : judul' onChange={handleFilterField}/>
                  <CInputGroupText id="basic-addon2">
                    <CButton className='p-0' onClick={() => {handleFilter(fieldFilter,page,limit)}}>
                      <CIcon icon={cilZoom}></CIcon>
                    </CButton>
                  </CInputGroupText>
                  <CInputGroupText id="basic-addon3">
                    <CButton className='p-0' onClick={() => {handleFilter("",page,limit)}}>
                      <CIcon icon={cilReload}></CIcon>
                    </CButton>
                  </CInputGroupText>
                </CInputGroup>
              </div>
            </div>
          </CCardHeader>
          <CCardBody>
            
            {isPending? ( <span>Loading ...</span>
            ) : isError ? (
              <div>Error: {error.message}</div>
            ) : (
              
            <>
              <CTable color="" hover align='middle' responsive caption="top">
                {/* <CTableCaption>Daftar data materi</CTableCaption> */}
                
                <CTableHead color=''>
                  <CTableRow>
                    <CTableHeaderCell scope="col">#</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Nama</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Kontak</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Role</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                    {user.data?.map((userContent, index)=>(
                        <CTableRow key={userContent.uuid}>
                            <CTableHeaderCell scope="row">{(index+1)+user.offset}</CTableHeaderCell>
                            <CTableDataCell>{userContent.name}</CTableDataCell>
                            <CTableDataCell>{userContent.email}</CTableDataCell>
                            <CTableDataCell>{userContent.no_hp}</CTableDataCell>
                            <CTableDataCell>{userContent.role}</CTableDataCell>
                        </CTableRow>
                    ))}
                </CTableBody>
              </CTable>
                <CPagination align="end" style={{marginRight:"40px",marginTop:"2ren",marginLeft:'auto'}}>
                <ResponsivePagination
                  total={user?.total_pages}
                  current={page}
                  onPageChange={(page) => setPage(page)}
                />
              </CPagination>
            </>       
          )}
          {isFetching ? <span> Loading...</span> : null}{' '}
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default VidMateri
