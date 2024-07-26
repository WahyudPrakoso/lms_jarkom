import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

// Base
const GuruMateri = React.lazy(() => import('./views/base/materi/guru/Materi'))
const MuridMateri = React.lazy(() => import('./views/base/materi/murid/Materi'))
const EditMateri = React.lazy(() => import('./views/base/materi/guru/EditMateri'))
const AddMateri = React.lazy(() => import('./views/base/materi/guru/AddMateri'))
const DetailMateri = React.lazy(() => import('./views/base/materi/DetailMateri'))
const DetailVideo = React.lazy(() => import('./views/base/video/DetailVideo'))
const GuruVideo = React.lazy(() => import('./views/base/video/guru/VideoMateri'))
const AddVideo = React.lazy(() => import('./views/base/video/guru/AddMateri'))
const EditVideo = React.lazy(() => import('./views/base/video/guru/EditMateri'))
const MuridVideo = React.lazy(() => import('./views/base/video/murid/VideoMateri'))
const DetailSoal = React.lazy(() => import('./views/base/soal/DetailSoal'))
const GuruSoal = React.lazy(() => import('./views/base/soal/guru/Soal'))
const AddSoal = React.lazy(() => import('./views/base/soal/guru/AddSoal'))
const EditSoal = React.lazy(() => import('./views/base/soal/guru/EditSoal'))
const MuridSoal= React.lazy(() => import('./views/base/soal/murid/Soal'))
const GuruAnswer= React.lazy(() => import('./views/base/answer/guru/Answer'))
const AddAnswer= React.lazy(() => import('./views/base/answer/guru/AddAnswer'))
const AnswerMe= React.lazy(() => import('./views/base/answer/AnswerMe'))
const EditAnswer= React.lazy(() => import('./views/base/answer/guru/EditAnswer'))
const NilaiAnswer= React.lazy(() => import('./views/base/answer/guru/NilaiAnswer'))
const DetailAnswer= React.lazy(() => import('./views/base/answer/DetailAnswer'))
const AnswerSoal= React.lazy(() => import('./views/base/answer/guru/AnswerbySoal'))
const GuruUser= React.lazy(() => import('./views/base/user/guru/User'))
const AdminSoal= React.lazy(() => import('./views/base/soal/super/Soal'))
const AdminUser= React.lazy(() => import('./views/base/user/super/User'))
const AddUser= React.lazy(() => import('./views/base/user/super/AddUser'))
const EditUser= React.lazy(() => import('./views/base/user/super/EditUser'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/murid', name: 'Murid', element: Dashboard, exact: true },
  { path: '/guru', name: 'Guru', element: Dashboard, exact: true },

  { path: '/materi/:id/detail', name: 'Detail Materi', element: DetailMateri },
  { path: '/murid/materi', name: 'Materi', element: MuridMateri },
  { path: '/guru/materi', name: 'Materi', element: GuruMateri },
  { path: '/guru/add/materi', name: 'Tambah Materi', element: AddMateri },
  { path: '/guru/materi/:id/edit', name: 'Edit Materi', element: EditMateri },

  { path: '/video/:id/detail', name: 'Detail Video', element: DetailVideo },
  { path: '/murid/video', name: 'Video', element: MuridVideo },
  { path: '/guru/video', name: 'Video', element: GuruVideo },
  { path: '/guru/add/video', name: 'Tambah Video', element: AddVideo },
  { path: '/guru/video/:id/edit', name: 'Edit Video', element: EditVideo },

  { path: '/soal/:id/detail', name: 'Detail Soal', element: DetailSoal },
  { path: '/murid/soal', name: 'Soal', element: MuridSoal },
  { path: '/guru/soal', name: 'Soal', element: GuruSoal },
  { path: '/guru/add/soal', name: 'Tambah Soal', element: AddSoal },
  { path: '/guru/soal/:id/edit', name: 'Edit Soal', element: EditSoal},

  { path: '/answer/:id/detail', name: 'Detail Jawaban', element: DetailAnswer },
  { path: '/answer/me', name: 'Jawabanku', element: AnswerMe},
  { path: '/murid/answer', name: 'Jawaban', element: AnswerMe },
  { path: '/add/answer/:id', name: 'Tambah Jawaban', element: AddAnswer },
  { path: '/murid/answer/:id/edit', name: 'Edit Jawaban', element: EditAnswer},
  { path: '/guru/answer', name: 'Jawaban', element: GuruAnswer },
  { path: '/guru/answer/:id/edit', name: 'Edit Jawaban', element: EditAnswer},
  { path: '/guru/answer/:id/nilai', name: 'Edit Jawaban', element: NilaiAnswer},
  { path: '/guru/answer/soal/:id', name: 'Edit Jawaban', element: AnswerSoal},

  { path: '/guru/user', name: 'User', element: GuruUser},
  { path: '/admin/soal', name: 'Soal', element: AdminSoal},
  { path: '/admin/user', name: 'Daftar User', element: AdminUser },
  { path: '/admin/add/user', name: 'Tambah User', element: AddUser },
  { path: '/admin/user/:id/edit', name: 'Tambah User', element: EditUser },
]

export default routes
