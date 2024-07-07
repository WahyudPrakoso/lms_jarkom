import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilAccountLogout,
  cilBook,
  cilSchool,
  cilSpeedometer,
  cilVideo,
} from '@coreui/icons'
import { CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    component: CNavTitle,
    name: 'Murid',
  },
  {
    component: CNavItem,
    name: 'Materi',
    to: '/murid/materi',
    icon: <CIcon icon={cilBook} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Video',
    to: '/murid/video',
    icon: <CIcon icon={cilVideo} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Soal',
    to: '/murid/soal',
    icon: <CIcon icon={cilSchool} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Guru',
  },
  {
    component: CNavItem,
    name: 'Materi',
    to: '/guru/materi',
    icon: <CIcon icon={cilBook} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Video',
    to: '/guru/video',
    icon: <CIcon icon={cilVideo} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Soal',
    to: '/guru/soal',
    icon: <CIcon icon={cilSchool} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Akun',
  },
  {
    component: CNavItem,
    name: 'Logout',
    to: '/logout',
    icon: <CIcon icon={cilAccountLogout} customClassName="nav-icon" />,
  },
]

export default _nav
