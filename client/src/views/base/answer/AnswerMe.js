import React, { useEffect, useState } from 'react'
import ResponsivePagination from 'react-responsive-pagination'
import moment from 'moment-timezone';
import 'moment/dist/locale/id'
moment.locale('id')
moment.tz("Asia/Jakarta")
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
import { cilPencil, cilTrash, cilStorage, cilZoom, cilReload, cilPlus, cilColorBorder } from '@coreui/icons'
import { Link, useNavigate } from 'react-router-dom'
import { useAnswerPages, useAnswerPagesMe } from '../../../hooks/queries'
import { useDeleteAnswer } from '../../../hooks/mutation'

const Answer = () => {
    const [filter, setFilter] = useState();
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const [fieldFilter, setFieldFilter] = useState('');
    const navigate = useNavigate()
    
    const handleFilterField = (e) => {
      setFieldFilter(e.target.value)
    }
    const handleLimit = (e) => {
      setPage(1)
      setLimit(e.target.value)
    }

    const handleFilter = (filter) => {
      setFilter(filter);
    }
    const { isPending, isError, data: answer, error, isFetching, isPlaceholderData } = useAnswerPagesMe(limit,page,filter)
    const deleteMutation = useDeleteAnswer()

    if (isError) return `Error: ${error.message}`

    const handleDelete = (id) => {
      deleteMutation.mutate(id)
      setPage(1)
      navigate('/answer/me')
    }
    const handleEdit = (id) => navigate(`/guru/answer/${id}/edit`)
    const handleDetail = (id) => navigate(`/answer/${id}/detail`)
    // console.log(answer);

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <div style={{display:'flex'}} className='mt-2'>
              <h5>Daftar Jawaban yang Sudah Terupload</h5>
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
                {/* <CTableCaption>Daftar data Soal</CTableCaption> */}
                <CTableHead color=''>
                  <CTableRow>
                    <CTableHeaderCell scope="col">#</CTableHeaderCell>
                    <CTableHeaderCell scope="col">User</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Soal</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Nilai</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Aksi</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                    {answer.data?.map((answerContent, index)=>(
                        <CTableRow key={answerContent.uuid}>
                            <CTableHeaderCell scope="row">{(index+1)+answer.offset}</CTableHeaderCell>
                            <CTableDataCell>{answerContent.user.name}</CTableDataCell>
                            <CTableDataCell>{answerContent.soal.name}</CTableDataCell>
                            <CTableDataCell>{answerContent.status}</CTableDataCell>
                            <CTableDataCell>{answerContent.nilai}</CTableDataCell>
                            <CTableDataCell>
                                <CButton color="primary" className="mb-1 mt-1 px-3 mx-1" onClick={() => handleDetail(answerContent.uuid)}>
                                    <CIcon icon={cilStorage} />
                                </CButton>
                            </CTableDataCell>
                        </CTableRow>
                    ))}
                </CTableBody>
              </CTable>
                <CPagination align="end" style={{marginRight:"40px",marginTop:"2ren",marginLeft:'auto'}}>
                <ResponsivePagination
                  total={answer?.total_pages}
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

export default Answer
