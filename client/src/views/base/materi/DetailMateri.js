import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useResizeObserver } from '@wojtekmaj/react-hooks';
import {
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormSelect,
  CRow,
} from '@coreui/react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useMateriById, usePdf } from '../../../hooks/queries';
import CIcon from '@coreui/icons-react';
import { cilChevronLeft, cilChevronRight,cilFile, cilReload } from '@coreui/icons';

const maxWidth = 2000
const DetailMateri = (e) => {  
    const navigate = useNavigate()
    const { id } = useParams()
    const { isPending, isError, data: materi, error, isFetching, isPlaceholderData } = useMateriById(id)
    if (isError) return `Error: ${error.response.data}`
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
            
        {isPending? ( <span>Loading ...</span>
            ) : isError ? (
              <div>Error: {error.message}</div>
            ) : (
              
        <>
          <CCardHeader className="">
              <strong>Detail materi : {materi.name}</strong>
          </CCardHeader>
          <CCardBody>
            <p className='mb-4 mt-0'>
              Pembuat : <strong> {materi.user.name} </strong>
            </p>
            <p className='mb-4'>
                {materi.about}
            </p>
            {/*/pdf here/*/}
            <div style={{display:'flex', justifyContent:'center'}} className='mt-3'>
              <iframe
                width="1000" 
                height="700" 
                allow="autoplay"
                src={materi.file}
              ></iframe>
            </div>
          </CCardBody>
          </>       
          )}
          {isFetching ? <span> Loading...</span> : null}{' '}
        </CCard>
      </CCol>
    </CRow>
  )
}

export default DetailMateri
