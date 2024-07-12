import React, { useCallback, useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
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
import CIcon from '@coreui/icons-react';
import { cilChevronLeft, cilChevronRight,cilFile, cilReload } from '@coreui/icons';
import { useVideoById } from '../../../hooks/queries';

const DetailVideo = (e) => {
    const navigate = useNavigate()

    const { id } = useParams()
    const { isPending, isError, data: materi, error, isFetching, isPlaceholderData } = useVideoById(id)
    
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
            <div style={{display:'flex', justifyContent:'center'}} className='mt-3'>
            <iframe 
              width={800}
              height={450}
              src={materi.link}
              title="Materi jarkom" 
              frameborder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              referrerpolicy="strict-origin-when-cross-origin" 
              allowfullscreen>
              
            </iframe>
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

export default DetailVideo
