import {FC, Suspense, lazy} from 'react'
import {Route, Routes, Navigate} from 'react-router-dom'
import {MasterLayout} from '../../_metronic/layout/MasterLayout'
import TopBarProgress from 'react-topbar-progress-indicator'
// import {DashboardWrapper} from '../pages/dashboard/DashboardWrapper'
// import {MenuTestPage} from '../pages/MenuTestPage'
import {getCSSVariableValue} from '../../_metronic/assets/ts/_utils'
import {WithChildren} from '../../_metronic/helpers'
import { RentCar } from '../modules/rent_car/RentCar'
import Setup from '../modules/institute_setup/Setup'
import { Committee } from '../modules/committees/Committee'
import { CommitteeEvent } from '../modules/event_management/committee/CommitteeEvent'
import { AdvisoryBoard } from '../modules/event_management/advisory/AdvisoryBoard'
import { VenueManagement } from '../modules/VenueM/VenueManagement'
import { ForStudents } from '../modules/VenueM/ForStudents'


const PrivateRoutes = () => {

  return (
    <Routes>
      <Route element={<MasterLayout />}>
        {/* Redirect to Dashboard after success login/registartion */}
        <Route path='auth/*' element={<Navigate to='/institute-setup' />} />
        {/* Pages */}
        <Route path='rent-car' element={<RentCar />} />
        <Route path='institute-setup' element={<Setup />} />
        <Route path='committee' element={<Committee />} />
        <Route path='create-event' element={<CommitteeEvent />} />
        <Route path='advisory-board' element={<AdvisoryBoard />} />
        <Route path='venuemanagement' element={<VenueManagement />} />
        <Route path='forstudents' element={<ForStudents />} />
        </Route>
        {/* Page Not Found */}
        <Route path='*' element={<Navigate to='/error/404' />} />
    </Routes>
  )
}

const SuspensedView: FC<WithChildren> = ({children}) => {
  const baseColor = getCSSVariableValue('--bs-primary')
  TopBarProgress.config({
    barColors: {
      '0': baseColor,
    },
    barThickness: 1,
    shadowBlur: 5,
  })
  return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>
}

export {PrivateRoutes}
