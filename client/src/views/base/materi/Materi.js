import React, { useEffect, useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
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
import { cilPencil, cilTrash, cilStorage } from '@coreui/icons'
import {makeRequest} from '../../../axios'
import { Link, useNavigate } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { fetchMateri, useMateriPages } from '../../../hooks/queries'
import { useDeleteMateri } from '../../../hooks/mutation'
import ResponsivePagination from 'react-responsive-pagination'

const Materi = () => {
    const [err, setErr] = useState(null);
    const [page, setPage] = useState(1);
    let lastNum = 0
    const navigate = useNavigate()
    const { isPending, isError, data: materi, error, isFetching, isPlaceholderData } = useMateriPages(page)
    // const {isLoading, error, data} = useQuery(['materi'], ()=>
    //     makeRequest.get("/materi").then((res) => {
    //         return res.data
    //     })
    // )
    // console.log(totalPages);
    const deleteSongMutation = useDeleteMateri()

    if (isError) return `Error: ${error.message}`

    const handleDelete = (id) => deleteSongMutation.mutate(id)
    const handleEdit = (id) => navigate(`/materi/${id}/edit`)
    const handleDetail = (id) => navigate(`/murid/materi/${id}/detail`)

    //for pagination
    const handlePage = (num) => setPage(num)
    const pagesNum = []
    for (let i = 0; i < materi?.total_pages; i++) {
      pagesNum.push(<CPaginationItem onClick={() => handlePage(i+1)} key={i}>{i+1}</CPaginationItem>);
  }
    // console.log(materi);
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Daftar materi</strong>
          </CCardHeader>
          <CCardBody>
            
            {isPending? ( <span>Loading ...</span>
            ) : isError ? (
              <div>Error: {error.message}</div>
            ) : (
              
            <>
              <CTable color="dark" hover align='middle' responsive caption="top">
                {/* <CTableCaption>Daftar data materi</CTableCaption> */}
                
                <CTableHead color='dark'>
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
                                <CButton color="warning" className="mb-1 mt-1 px-3 mx-1" onClick={() => handleEdit(materiContent.uuid)}>
                                    <CIcon icon={cilPencil} />
                                </CButton>
                                <CButton color="danger" className="mb-1 mt-1 px-3 mx-1" onClick={handleDelete}>
                                    <CIcon icon={cilTrash} />
                                </CButton>
                            </CTableDataCell>
                        </CTableRow>
                    ))}
                </CTableBody>
              </CTable>
              <CPagination align="end" style={{marginRight:"40px",marginTop:"2ren"}}>
              <ResponsivePagination
                total={materi?.total_pages}
                current={page}
                onPageChange={(page) => setPage(page)}
              />
              </CPagination>
              {/* <CPagination align="center" aria-label="Page navigation example">
                
              
                <CPaginationItem onClick={() => setPage((old) => Math.max(old - 1, 0))} 
                disabled={page === 1}>
                  Previous
                </CPaginationItem>

                {pagesNum}
                
                <CPaginationItem onClick={() => {
                  if (!isPlaceholderData) {
                    setPage((old) => old + 1)
                  }
                }}
                // {...console.log(materi.total_pages)}
                // Disable the Next Page button until we know a next page is available
                disabled={isPlaceholderData || page === materi?.total_pages}>
                  Next
                </CPaginationItem>
              </CPagination> */}
            </>       
          )}
          {isFetching ? <span> Loading...</span> : null}{' '}
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Materi
