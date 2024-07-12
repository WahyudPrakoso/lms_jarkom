import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Colors = React.lazy(() => import('./views/theme/colors/Colors'))
const Typography = React.lazy(() => import('./views/theme/typography/Typography'))

// Base
const Accordion = React.lazy(() => import('./views/base/accordion/Accordion'))
const Breadcrumbs = React.lazy(() => import('./views/base/breadcrumbs/Breadcrumbs'))
const Cards = React.lazy(() => import('./views/base/cards/Cards'))
const Carousels = React.lazy(() => import('./views/base/carousels/Carousels'))
const Collapses = React.lazy(() => import('./views/base/collapses/Collapses'))
const ListGroups = React.lazy(() => import('./views/base/list-groups/ListGroups'))
const Navs = React.lazy(() => import('./views/base/navs/Navs'))
const Paginations = React.lazy(() => import('./views/base/paginations/Paginations'))
const Placeholders = React.lazy(() => import('./views/base/placeholders/Placeholders'))
const Popovers = React.lazy(() => import('./views/base/popovers/Popovers'))
const Progress = React.lazy(() => import('./views/base/progress/Progress'))
const Spinners = React.lazy(() => import('./views/base/spinners/Spinners'))
const Tabs = React.lazy(() => import('./views/base/tabs/Tabs'))
const Tables = React.lazy(() => import('./views/base/tables/Tables'))
const Tooltips = React.lazy(() => import('./views/base/tooltips/Tooltips'))
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

// Buttons
const Buttons = React.lazy(() => import('./views/buttons/buttons/Buttons'))
const ButtonGroups = React.lazy(() => import('./views/buttons/button-groups/ButtonGroups'))
const Dropdowns = React.lazy(() => import('./views/buttons/dropdowns/Dropdowns'))

//Forms
const ChecksRadios = React.lazy(() => import('./views/forms/checks-radios/ChecksRadios'))
const FloatingLabels = React.lazy(() => import('./views/forms/floating-labels/FloatingLabels'))
const FormControl = React.lazy(() => import('./views/forms/form-control/FormControl'))
const InputGroup = React.lazy(() => import('./views/forms/input-group/InputGroup'))
const Layout = React.lazy(() => import('./views/forms/layout/Layout'))
const Range = React.lazy(() => import('./views/forms/range/Range'))
const Select = React.lazy(() => import('./views/forms/select/Select'))
const Validation = React.lazy(() => import('./views/forms/validation/Validation'))

const Charts = React.lazy(() => import('./views/charts/Charts'))

// Icons
const CoreUIIcons = React.lazy(() => import('./views/icons/coreui-icons/CoreUIIcons'))
const Flags = React.lazy(() => import('./views/icons/flags/Flags'))
const Brands = React.lazy(() => import('./views/icons/brands/Brands'))

// Notifications
const Alerts = React.lazy(() => import('./views/notifications/alerts/Alerts'))
const Badges = React.lazy(() => import('./views/notifications/badges/Badges'))
const Modals = React.lazy(() => import('./views/notifications/modals/Modals'))
const Toasts = React.lazy(() => import('./views/notifications/toasts/Toasts'))

const Widgets = React.lazy(() => import('./views/widgets/Widgets'))

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
  { path: '/theme/colors', name: 'Colors', element: Colors },
  { path: '/theme/typography', name: 'Typography', element: Typography },
  { path: '/base', name: 'Base', element: Cards, exact: true },
  { path: '/base/accordion', name: 'Accordion', element: Accordion },
  { path: '/base/breadcrumbs', name: 'Breadcrumbs', element: Breadcrumbs },
  { path: '/base/cards', name: 'Cards', element: Cards },
  { path: '/base/carousels', name: 'Carousel', element: Carousels },
  { path: '/base/collapses', name: 'Collapse', element: Collapses },
  { path: '/base/list-groups', name: 'List Groups', element: ListGroups },
  { path: '/base/navs', name: 'Navs', element: Navs },
  { path: '/base/paginations', name: 'Paginations', element: Paginations },
  { path: '/base/placeholders', name: 'Placeholders', element: Placeholders },
  { path: '/base/popovers', name: 'Popovers', element: Popovers },
  { path: '/base/progress', name: 'Progress', element: Progress },
  { path: '/base/spinners', name: 'Spinners', element: Spinners },
  { path: '/base/tabs', name: 'Tabs', element: Tabs },
  { path: '/base/tables', name: 'Tables', element: Tables },
  { path: '/base/tooltips', name: 'Tooltips', element: Tooltips },
  { path: '/buttons', name: 'Buttons', element: Buttons, exact: true },
  { path: '/buttons/buttons', name: 'Buttons', element: Buttons },
  { path: '/buttons/dropdowns', name: 'Dropdowns', element: Dropdowns },
  { path: '/buttons/button-groups', name: 'Button Groups', element: ButtonGroups },
  { path: '/charts', name: 'Charts', element: Charts },
  { path: '/forms', name: 'Forms', element: FormControl, exact: true },
  { path: '/forms/form-control', name: 'Form Control', element: FormControl },
  { path: '/forms/select', name: 'Select', element: Select },
  { path: '/forms/checks-radios', name: 'Checks & Radios', element: ChecksRadios },
  { path: '/forms/range', name: 'Range', element: Range },
  { path: '/forms/input-group', name: 'Input Group', element: InputGroup },
  { path: '/forms/floating-labels', name: 'Floating Labels', element: FloatingLabels },
  { path: '/forms/layout', name: 'Layout', element: Layout },
  { path: '/forms/validation', name: 'Validation', element: Validation },
  { path: '/icons', exact: true, name: 'Icons', element: CoreUIIcons },
  { path: '/icons/coreui-icons', name: 'CoreUI Icons', element: CoreUIIcons },
  { path: '/icons/flags', name: 'Flags', element: Flags },
  { path: '/icons/brands', name: 'Brands', element: Brands },
  { path: '/notifications', name: 'Notifications', element: Alerts, exact: true },
  { path: '/notifications/alerts', name: 'Alerts', element: Alerts },
  { path: '/notifications/badges', name: 'Badges', element: Badges },
  { path: '/notifications/modals', name: 'Modals', element: Modals },
  { path: '/notifications/toasts', name: 'Toasts', element: Toasts },
  { path: '/widgets', name: 'Widgets', element: Widgets },
]

export default routes
