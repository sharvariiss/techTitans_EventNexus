import {Route, Routes} from 'react-router-dom'
import {Registration} from './components/Registration'
import {ForgotPassword} from './components/ForgotPassword'
import Login from './components/Login'
import {AuthLayout} from './AuthLayout'
import SignUp from './components/SignUp'

const AuthPage = () => (
  <Routes>
    {/* <Route element={<AuthLayout />}> */}
      <Route path='login' element={<Login />} />
      <Route path='registration' element={<SignUp />} />
      <Route path='forgot-password' element={<ForgotPassword />} />
      <Route index element={<Login />} />
    {/* </Route> */}
  </Routes>
)

export {AuthPage}
