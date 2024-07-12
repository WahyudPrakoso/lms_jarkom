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
import { Link, useNavigate } from 'react-router-dom'
import { fetchMateri, useMateriPages, useVideoPages } from '../../../../hooks/queries'
import { useDeleteMateri } from '../../../../hooks/mutation'

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
    const { isPending, isError, data: materi, error, isFetching, isPlaceholderData } = useVideoPages(limit,page,filter)

    if (isError) return `Error: ${error.message}`

    const handleDetail = (id) => navigate(`/video/${id}/detail`)
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <div style={{display:'flex'}} className='mt-2'>
              <h3>Daftar materi</h3>
              <div style={{marginLeft:'auto'}}>
                <CInputGroup className="mb-3" >
                  <CFormSelect onChange={handleLimit} size='sm'>
                    <option disabled>Item/Page</option>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                  </CFormSelect>
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
                    <CTableHeaderCell scope="col">Pembuat</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Judul</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Keterangan</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Aksi</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                    {materi.data?.map((materiContent, index)=>(
                        <CTableRow key={materiContent.uuid}>
                            <CTableHeaderCell scope="row">{(index+1)+materi.offset}</CTableHeaderCell>
                            <CTableDataCell>{materiContent.user.name}</CTableDataCell>
                            <CTableDataCell>{materiContent.name}</CTableDataCell>
                            <CTableDataCell>{materiContent.about}</CTableDataCell>
                            <CTableDataCell>
                                <CButton color="primary" className="mb-1 mt-1 px-3 mx-1" onClick={() => handleDetail(materiContent.uuid)}>
                                    <CIcon icon={cilStorage} />
                                </CButton>
                            </CTableDataCell>
                        </CTableRow>
                    ))}
                </CTableBody>
              </CTable>
                <CPagination align="end" style={{marginRight:"40px",marginTop:"2ren",marginLeft:'auto'}}>
                <ResponsivePagination
                  total={materi?.total_pages}
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
