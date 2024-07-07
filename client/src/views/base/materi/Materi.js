import React, { useState } from 'react'
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
import { cilFile, cilBadge, cilPencil, cilTrash, cilStorage } from '@coreui/icons'
import { DocsExample } from 'src/components'
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
    const handlePage = (num) => setPage(num)
    const pagesNum = []
    for (let i = 0; i < materi?.total_pages; i++) {
      // note: we are adding a key prop here to allow react to uniquely identify each
      // element in this array. see: https://reactjs.org/docs/lists-and-keys.html
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
                                <CButton color="primary" className="px-3 mx-1" onClick={handleDelete}>
                                    <CIcon icon={cilStorage} />
                                </CButton>
                                <CButton color="warning" className="px-3 mx-1" onClick={handleDelete}>
                                    <CIcon icon={cilPencil} />
                                </CButton>
                                <CButton color="danger" className="px-3 mx-1" onClick={handleDelete}>
                                    <CIcon icon={cilTrash} />
                                </CButton>
                            </CTableDataCell>
                        </CTableRow>
                    ))}
                </CTableBody>
              </CTable>
              <ResponsivePagination
                total={materi?.total_pages}
                current={page}
                onPageChange={(page) => setPage(page)}
              />
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
