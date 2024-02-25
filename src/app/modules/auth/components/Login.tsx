import React, {useState} from 'react'
import {Link, Navigate, useNavigate} from 'react-router-dom'
import {useAuth} from '../core/Auth'

const initialValues = {
  email: 'admin@demo.com',
  password: 'demo',
}
interface LoginCred {
  email: string
  password: string
}
const Login = () => {
  const {saveAuth, setCurrentUser} = useAuth()
  const navigator = useNavigate()
  const [loginCred, setLoginCred] = useState({} as LoginCred)
  const loginHandler = (e) => {
    e.preventDefault()
    if (initialValues.email === loginCred.email && initialValues.password === loginCred.password) {
      const data = {
        api_token: "string",
        refreshToken: "string"
      }
      saveAuth(data)
      const user = {
        username: "siddhant",
        password: "sid",
        email:"idont knowwwwwwww",
        first_name: "string",
        last_name: "string",
      }
      setCurrentUser(user)
    }
  }
  return (
    <div>
      <base href='../../../' />
      <meta charSet='utf-8' />
      <meta
        name='description'
        content='The most advanced Bootstrap 5 Admin Theme with 40 unique prebuilt layouts on Themeforest trusted by 100,000 beginners and professionals. Multi-demo, Dark Mode, RTL support and complete React, Angular, Vue, Asp.Net Core, Rails, Spring, Blazor, Django, Express.js, Node.js, Flask, Symfony & Laravel versions. Grab your copy now and get life-time updates for free.'
      />
      <meta
        name='keywords'
        content='metronic, bootstrap, bootstrap 5, angular, VueJs, React, Asp.Net Core, Rails, Spring, Blazor, Django, Express.js, Node.js, Flask, Symfony & Laravel starter kits, admin themes, web design, figma, web development, free templates, free admin themes, bootstrap theme, bootstrap template, bootstrap dashboard, bootstrap dak mode, bootstrap button, bootstrap datepicker, bootstrap timepicker, fullcalendar, datatables, flaticon'
      />
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <meta property='og:locale' content='en_US' />
      <meta property='og:type' content='article' />
      <link rel='shortcut icon' href='assets/media/logos/custom-1.jpg' />
      <link
        rel='stylesheet'
        href='https://fonts.googleapis.com/css?family=Inter:300,400,500,600,700'
      />

      <div className='d-flex flex-column flex-root'>
        <style>
          {`
          body {
            background-image: url('assets/media/patterns/header-bg.jpg');
          }

          [data-bs-theme="dark"] body {
            background-image: url('assets/media/auth/header-dark-bg.jpg');
          }
        `}
        </style>
        <div className='d-flex flex-column flex-column-fluid flex-lg-row'>
          <div className='d-flex flex-center w-lg-50 pt-15 pt-lg-0 px-10'>
            <div className='d-flex flex-center flex-lg-start flex-column'>
              <a href='../../demo2/dist/index.html' className='mb-7'>
                <img alt='Logo' src='assets/media/logos/custom-3.svg' />
              </a>
              <h2 className='text-white fw-normal m-0'>
                Event Nexus
              </h2>
            </div>
          </div>
          <div className='d-flex flex-column-fluid flex-lg-row-auto justify-content-center justify-content-lg-end p-12 p-lg-20'>
            <div className='bg-body d-flex flex-column align-items-stretch flex-center rounded-4 w-md-600px p-20'>
              <div className='d-flex flex-center flex-column flex-column-fluid px-lg-10 pb-15 pb-lg-20'>
                <form onSubmit={loginHandler} className='w-100'>
                  <div className='text-center mb-11'>
                    <h1 className='text-dark fw-bolder mb-3'>Sign In</h1>
                    <div className='text-gray-500 fw-semibold fs-6'>Your Social Campaigns</div>
                  </div>
                  
                  <div className='fv-row mb-8'>
                    <input
                      type='text'
                      placeholder='Email'
                      name='email'
                      autoComplete='off'
                      className='form-control bg-transparent'
                      onChange={(e) => setLoginCred({...loginCred, email: e.target.value})}
                    />
                  </div>
                  <div className='fv-row mb-3'>
                    <input
                      type='password'
                      placeholder='Password'
                      name='password'
                      autoComplete='off'
                      className='form-control bg-transparent'
                      onChange={(e) => setLoginCred({...loginCred, password: e.target.value})}
                    />
                  </div>
                  
                  <div className='d-grid mb-10'>
                    <button type='submit' id='kt_sign_in_submit' className='btn btn-primary mt-5'>
                      <span className='indicator-label'>Sign In</span>
                      <span className='indicator-progress'>
                        Please wait...
                        <span className='spinner-border spinner-border-sm align-middle ms-2' />
                      </span>
                    </button>
                  </div>
                  <div className='text-gray-500 text-center fw-semibold fs-6'>
                    Not a Member yet? <Link to='/auth/registration' className="link-primary">Sign up</Link>
                  </div>
                  
                </form>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
