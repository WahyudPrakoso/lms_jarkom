import React, { useState } from 'react'

import {
  CCol,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CProgress,
  CRow,
  CWidgetStatsA,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cilArrowBottom,
  cilOptions,
} from '@coreui/icons'
import { useDashboard } from '../../hooks/queries'
import { useNavigate } from 'react-router-dom'
const Dashboard = () => {
    const [currentUser, setCurrentUser] = useState(
      JSON.parse(localStorage.getItem("user")) || null
    );
    const navigate = useNavigate()
    const { isPending, isError, data: dashboard, error, isFetching, isPlaceholderData } = useDashboard()
    
    const rolePath = currentUser.role === '0105' ? '/guru' : '/murid' 

    if (isError) return `Error: ${error}`
  return (
      <CRow className='mb-4' xs={{ gutter: 4 }}>
        {isPending? ( <span>Loading ...</span>
            ) : isError ? (
              <div>Error: {error.message}</div>
            ) : (
            <>
            <CCol sm={6} xl={4} xxl={3}>
              <CWidgetStatsA
                color="primary"
                value={
                  <>
                    Data User
                  </>
                }
                title={`Total = ${dashboard.jumUser} `}
                action={ currentUser.role==='0105' ? 
                  <CDropdown alignment="end">
                    <CDropdownToggle color="transparent" caret={false} className="text-white p-0">
                      <CIcon icon={cilOptions} />
                    </CDropdownToggle>
                    <CDropdownMenu style={{cursor:'pointer'}}>
                      <CDropdownItem onClick={() => {navigate(`/user`)}}>Lihat Data</CDropdownItem>
                    </CDropdownMenu>
                  </CDropdown>
                  : <div></div>
                }
                
                style={{paddingBottom: '4rem'}}
              />
            </CCol>
            <CCol sm={6} xl={4} xxl={3}>
              <CWidgetStatsA
                color="success"
                value={
                  <>
                    Data Materi
                  </>
                }
                title={`Total = ${dashboard.jumMateri} `}
                action={
                  <CDropdown alignment="end">
                    <CDropdownToggle color="transparent" caret={false} className="text-white p-0">
                      <CIcon icon={cilOptions} />
                    </CDropdownToggle>
                    <CDropdownMenu style={{cursor:'pointer'}}>
                      <CDropdownItem onClick={() => {navigate(`${rolePath}/materi`)}}>Lihat Data</CDropdownItem>
                    </CDropdownMenu>
                  </CDropdown>
                }
                
                style={{paddingBottom: '4rem'}}
              />
            </CCol>
            <CCol sm={6} xl={4} xxl={3}>
              <CWidgetStatsA
                color="danger"
                value={
                  <>
                    Data Soal
                  </>
                }
                title={`Total = ${dashboard.jumSoal} `}
                action={
                  <CDropdown alignment="end">
                    <CDropdownToggle color="transparent" caret={false} className="text-white p-0">
                      <CIcon icon={cilOptions} />
                    </CDropdownToggle>
                    <CDropdownMenu style={{cursor:'pointer'}}>
                      <CDropdownItem onClick={() => {navigate(`${rolePath}/soal`)}}>Lihat Data</CDropdownItem>
                    </CDropdownMenu>
                  </CDropdown>
                }
                
                style={{paddingBottom: '4rem'}}
              />
            </CCol>
            <CCol sm={6} xl={4} xxl={3}>
              <CWidgetStatsA
                color="warning"
                value={
                  <>
                    Data Jawaban
                  </>
                }
                title={`Total = ${dashboard.jumJawaban} `}
                action={
                  <CDropdown alignment="end">
                    <CDropdownToggle color="transparent" caret={false} className="text-white p-0">
                      <CIcon icon={cilOptions} />
                    </CDropdownToggle>
                    <CDropdownMenu style={{cursor:'pointer'}}>
                      <CDropdownItem onClick={() => {navigate(`${rolePath}/answer`)}}>Lihat Data</CDropdownItem>
                    </CDropdownMenu>
                  </CDropdown>
                }
                
                style={{paddingBottom: '4rem'}}
              />
            </CCol>
            </>
        )}
        {isFetching ? <span> Loading...</span> : null}{' '}
      </CRow>
  )
}

export default Dashboard
