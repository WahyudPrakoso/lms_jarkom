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
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { useAnswerById, useSoalById } from '../../../hooks/queries';
import CIcon from '@coreui/icons-react';
import { cilExitToApp, cilPen } from '@coreui/icons';
const DetailAnswer = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const { isPending, isError, data: answer, error, isFetching, isPlaceholderData } = useAnswerById(id)
    // console.log(answer);
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
              <strong>Detail Answer </strong>
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol xs={6}>
                <table>
                  <tbody>
                    <tr>
                      <td>
                          Pembuat
                      </td>
                      <td>
                        : <strong> {answer.user.name} </strong>
                      </td>
                    </tr>
                    <tr>
                      <td>
                          Status
                      </td>
                      <td>
                        : <strong> {answer.status} </strong>
                      </td>
                    </tr>
                    <tr>
                      <td>
                          Nilai 
                      </td>
                      <td>
                        : <strong> {answer.nilai} </strong>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </CCol>
              <CCol xs={6}>
                <p className='mb-2'>
                    Soal : {answer.soal.name}
                </p>
                <CButton className='' style={{color : 'white'}} color='info' onClick={() => {navigate(`/soal/${answer.soal.uuid}/detail`)}}>
                  Check Soal <CIcon icon={cilExitToApp}></CIcon>
                </CButton>
              </CCol>
            </CRow>
            {/*/pdf here/*/}
            <div style={{display:'flex', justifyContent:'center'}} className='mt-3'>
              <iframe
                width="1000" 
                height="700" 
                src={answer.file}
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

export default DetailAnswer
