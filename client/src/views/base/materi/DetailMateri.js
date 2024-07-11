import React, { useCallback, useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useResizeObserver } from '@wojtekmaj/react-hooks';
import { pdfjs, Document, Page } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import {
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CContainer,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CFormInput,
  CFormSelect,
  CHeader,
  CHeaderNav,
  CHeaderToggler,
  CNavItem,
  CNavLink,
  CRow,
  useColorModes,
} from '@coreui/react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useMateriById, usePdf } from '../../../hooks/queries';
import './StylingDetail.css'
import CIcon from '@coreui/icons-react';
import { cilChevronLeft, cilChevronRight,cilFile, cilReload } from '@coreui/icons';


pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url
).toString()
  
const options = {
  cMapUrl: "/cmaps/",
  standardFontDataUrl: "/standard_fonts/"
}
  
const resizeObserverOptions = {}
  
const maxWidth = 2000
const DetailMateri = (e) => {
    const [numPages, setNumPages] = useState(0); 
    const [scale, setScale ] = useState(0.5)
    const [isAllPages, setIsAllPages ] = useState(false)
    const [pageNumber, setPageNumber] = useState(0); 
    const [containerRef, setContainerRef] = useState(null)
    const [containerWidth, setContainerWidth] = useState()
  
    const navigate = useNavigate()

    const onResize = useCallback(entries => {
      const [entry] = entries
      if (entry) {
        setContainerWidth(entry.contentRect.width)
      }
    }, [])

    useResizeObserver(containerRef, resizeObserverOptions, onResize)
  
    const onDocumentLoadSuccess = ({ numPages }) => {
      setNumPages(numPages);
      setPageNumber(1); 
    };
    
    const { id } = useParams()
    const { isPending, isError, data: materi, error, isFetching, isPlaceholderData } = useMateriById(id)
    const { data: pdfFiles,} = usePdf({file : materi?.file})
    const [pdf, setPdf] = useState(null);

    const loadPdf = (e) => {
      e.preventDefault()
      const pdfBlob = new Blob([pdfFiles], {type: "application/pdf"})
      const url = window.URL.createObjectURL(pdfBlob);
      setPdf(url)
    }

    useEffect(()=>{
      const pdfBlob = new Blob([pdfFiles], {type: "application/pdf"})
      const url = window.URL.createObjectURL(pdfBlob);
      setPdf(url)
    }, [])
  
    const pageRefs = useRef({});
    const onItemClickPrev = (e) => {
      e.preventDefault();
      setPageNumber(pageNumber - 1 <= 1 ? 1 : pageNumber - 1);
      pageRefs.current[pageNumber]?.scrollIntoView({ behavior: 'smooth', block: 'nearest'});
    }
    const onItemClickNext = (e) => {
      e.preventDefault();
      setPageNumber(pageNumber + 1 >= numPages ? numPages : pageNumber + 1);
      pageRefs.current[pageNumber]?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    const handleScale = (e) => {
      setScale(e.target.value)
    }
    const changeSingle = (e) =>{
      e.preventDefault();
      setIsAllPages(false)
    }
    const changeAll = (e) =>{
      e.preventDefault
      setIsAllPages(true)
    }
    const goToPrevPage = () =>
      setPageNumber(pageNumber - 1 <= 1 ? 1 : pageNumber - 1);

    const goToNextPage = () =>
      setPageNumber(pageNumber + 1 >= numPages ? numPages : pageNumber + 1);

    // console.log(isAllPages);
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
            <table width={"100%"}>
                <tbody>
                  <tr>
                    <td align='left'>
                      <CFormSelect size="sm" className="" aria-label="Small select example" style={{width:"5rem"}} onChange={handleScale}>
                        <option value="0.5">100%</option>
                        <option value="0.75">150%</option>
                        <option value="1.00">200%</option>
                        {/* <option value="1.25">125%</option>
                        <option value="1.50">150%</option>
                        <option value="2.00">200%</option> */}
                      </CFormSelect>
                    </td>
                     <td align='center'>
                      <CButtonGroup role='group' aria-label="Basic example">
                        <CButton color='danger' size='sm' className='' style={{color: 'white'}} onClick={changeSingle} disabled={(isAllPages)?false:true}>
                          Single Page
                        </CButton>
                        <CButton color='danger' size='sm' className='' style={{color: 'white'}} onClick={changeAll} disabled={(isAllPages)?true:false}>
                          All Pages
                        </CButton>
                      </CButtonGroup>
                    </td>
                    <div style={{display:(isAllPages)?'none':'block'}}>
                    <td align='center'>
                      <CButton onClick={goToPrevPage} size='sm' className="previous" color='primary'>
                        <CIcon icon={cilChevronLeft} size='sm'/>
                      </CButton>
                        {pageNumber} / {numPages}
                      <CButton onClick={goToNextPage} size='sm' className="next" color='primary'>
                        <CIcon icon={cilChevronRight} size='sm'/>
                      </CButton>
                    </td>
                    </div>
                    <td align='right'>
                      <CButton color='danger' size='sm' className='' style={{color: 'white'}} onClick={loadPdf}>
                        Reload PDF <CIcon icon={cilFile} size="lg"/>
                      </CButton>
                    </td>
                  </tr>
                </tbody>
              </table>
            <div className="frame" ref={setContainerRef}>
              {/* <div style={{"overflow-y" : scroll,height: "400px"}}> */}
                <Document
                    file={pdf}
                    onLoadSuccess={onDocumentLoadSuccess}
                    options={options}
                    onItemClick={{onItemClickNext, onItemClickPrev}}
                    pageLayout = "singlePage"
                    pageMode="useOutlines"
                >
                  <div style={{display:(isAllPages)?'none':'block'}}>
                      <Page
                          className="page"
                          scale={scale}
                          pageNumber={pageNumber}
                          width={
                            containerWidth ? Math.min(containerWidth, maxWidth) : maxWidth
                          }
                          // width={
                          //   containerWidth ? Math.min(containerWidth, maxWidth) : maxWidth
                          // }
                      />
                  </div>
                  <div style={{display:(!isAllPages)?'none':'block'}}>
                    {Array.from(new Array(numPages), (el, index) => (
                      <div key={index} ref={el => { pageRefs.current[index] = el; }}>
                      <Page
                          className="page"
                          scale={scale}
                          key={`page_${index + 1}`}
                          pageNumber={index + 1}
                          width={
                            containerWidth ? Math.min(containerWidth, maxWidth) : maxWidth
                          }
                      />
                      </div>
                    ))}
                  </div>
                </Document>
              {/* </div> */}
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
