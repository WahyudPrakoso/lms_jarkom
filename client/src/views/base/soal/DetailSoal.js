import React, { useCallback, useEffect, useRef, useState } from 'react'
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
import { useSoalById } from '../../../hooks/queries';
const DetailSoal = () => {
    const { id } = useParams()
    const { isPending, isError, data: soal, error, isFetching, isPlaceholderData } = useSoalById(id)
    // console.log(soal);
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
              <strong>Detail soal : {soal.name}</strong>
          </CCardHeader>
          <CCardBody>
            <p className='mb-4 mt-0'>
              Pembuat : <strong> {soal.user.name} </strong>
            </p>
            <p className='mb-4'>
                {soal.about}
            </p>
            {/*/pdf here/*/}
            <div style={{display:'flex', justifyContent:'center'}} className='mt-3'>
              <iframe
                width="1000" 
                height="700" 
                src={soal.file}
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

export default DetailSoal
