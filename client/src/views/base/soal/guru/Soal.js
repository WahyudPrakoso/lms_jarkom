import React, { useEffect, useState } from 'react'
import ResponsivePagination from 'react-responsive-pagination'
import ShowMoreText from "react-show-more-text";
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
import { cilPencil, cilTrash, cilStorage, cilZoom, cilReload, cilPlus, cilColorBorder, cilArrowThickFromLeft } from '@coreui/icons'
import { Link, useNavigate } from 'react-router-dom'
import { useSoalPages } from '../../../../hooks/queries'
import { useDeleteSoal } from '../../../../hooks/mutation'
import AddAnswer from '../../answer/guru/AddAnswer';

const Soal = () => {
    const [filter, setFilter] = useState();
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const [fieldFilter, setFieldFilter] = useState('');
    const [visible, setVisible] = useState(false);
    const [id, setId] = useState();
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
    const { isPending, isError, data: soal, error, isFetching, isPlaceholderData } = useSoalPages(limit,page,filter)
    const deleteMutation = useDeleteSoal()

    if (isError) return `Error: ${error.message}`

    const handleDelete = (id) => {
      deleteMutation.mutate(id)
      setPage(1)
      navigate('/guru/soal')
    }
    const handleEdit = (id) => navigate(`/guru/soal/${id}/edit`)
    const handleDetail = (id) => navigate(`/soal/${id}/detail`)
    const handleAdd = () => navigate(`/guru/add/soal`)

    const handleAnswerbySoal = (id) => navigate(`/guru/answer/soal/${id}`)

    // console.log(soal);
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <div style={{display:'flex'}} className='mt-2'>
              <h3>Daftar Soal</h3>
              <div style={{marginLeft:'auto'}}>
                <CInputGroup className="mb-3" >
                  <CFormSelect onChange={handleLimit} size='sm'>
                    <option disabled>Item/Page</option>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                  </CFormSelect>
                  <CInputGroupText id="basic-addon1" style={{backgroundColor:'#249542'}}>
                    <CButton className='p-0' onClick={handleAdd} style={{color:'white'}}>
                      Tambah Data <CIcon icon={cilPlus} size='lg'></CIcon>
                    </CButton>
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
                {/* <CTableCaption>Daftar data Soal</CTableCaption> */}
                <CTableHead color=''>
                  <CTableRow>
                    <CTableHeaderCell scope="col">#</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Pembuat</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Soal</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Keterangan</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Deadline</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Aksi</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                    {soal.data?.map((soalContent, index)=>(
                        <CTableRow key={soalContent.uuid}>
                            <CTableHeaderCell scope="row">{(index+1)+soal.offset}</CTableHeaderCell>
                            <CTableDataCell>{soalContent.user.name}</CTableDataCell>
                            <CTableDataCell>{soalContent.name}</CTableDataCell>
                            <CTableDataCell width={'30%'}>
                              <ShowMoreText
                                  lines={3}
                                  more='Tampilkan Detail'
                                  less='Kecilkan'
                                  anchorClass=''
                                  className=''
                                  expanded={false}
                                  truncatedEndingComponent={"..... "}
                              >
                                {soalContent.about}
                              </ShowMoreText>
                            </CTableDataCell>
                            <CTableDataCell>{moment(soalContent.deadline).format("LLLL")}</CTableDataCell>
                            <CTableDataCell>
                                <CButton color="primary" className="mb-1 mt-1 px-3 mx-1"  size='sm' onClick={() => handleDetail(soalContent.uuid)}>
                                    <CIcon icon={cilStorage} />
                                </CButton>
                                <CButton color="warning" className="mb-1 mt-1 px-3 mx-1"  size='sm' onClick={() => handleEdit(soalContent.uuid)}>
                                    <CIcon icon={cilPencil} />
                                </CButton>
                                <CButton color="danger" className="mb-1 mt-1 px-3 mx-1"  size='sm' onClick={()=>handleDelete(soalContent.uuid)}>
                                    <CIcon icon={cilTrash} />
                                </CButton>
                                <CButton color="info" className="mb-1 mt-1 px-3 mx-1" size='sm' style={{color:'white'}} onClick={() => handleAnswerbySoal(soalContent.uuid)}>
                                  List Jawaban <CIcon icon={cilArrowThickFromLeft} />
                                </CButton>
                            </CTableDataCell>
                        </CTableRow>
                    ))}
                </CTableBody>
              </CTable>
                <CPagination align="end" style={{marginRight:"40px",marginTop:"2ren",marginLeft:'auto'}}>
                <ResponsivePagination
                  total={soal?.total_pages}
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

export default Soal
