import React, {useState} from 'react'
import {Link, Navigate, useNavigate} from 'react-router-dom'
import {useAuth} from '../core/Auth'

const SignUp = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    password: '',
    changepassword: '',
    role: '',
    department: '',
    acceptTerms: false,
  })

  const loginHandler = (e) => {
    e.preventDefault()
    navigate('/auth')
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
              <h2 className='text-white fw-normal m-0'>Event Nexus</h2>
            </div>
          </div>
          <div className='d-flex flex-column-fluid flex-lg-row-auto justify-content-center justify-content-lg-end p-12 p-lg-20'>
            <div className='bg-body d-flex flex-column align-items-stretch flex-center rounded-4 w-md-600px p-20'>
              <div className='d-flex flex-center flex-column flex-column-fluid px-lg-10 pb-15 pb-lg-20'>
                <div className='text-center mb-11'>
                  <h1 className='text-dark fw-bolder mb-3'>Sign Up</h1>
                  <div className='text-gray-500 fw-semibold fs-6'>Your Social Campaigns</div>
                </div>
                <form onSubmit={loginHandler} className='w-100'>
                  {/* Form fields */}
                  <div className='fv-row mb-8'>
                    <label className='form-label fw-bolder text-dark fs-6'>First name</label>
                    <input
                      placeholder='First name'
                      type='text'
                      autoComplete='off'
                      value={formData.firstname}
                      onChange={(e) => setFormData({...formData, firstname: e.target.value})}
                      className='form-control bg-transparent'
                    />
                    {/* Add error message display logic if needed */}
                  </div>

                  <div className='fv-row mb-8'>
                    <label className='form-label fw-bolder text-dark fs-6'>Last name</label>
                    <input
                      placeholder='Last name'
                      type='text'
                      autoComplete='off'
                      value={formData.lastname}
                      onChange={(e) => setFormData({...formData, lastname: e.target.value})}
                      className='form-control bg-transparent'
                    />
                    {/* Add error message display logic if needed */}
                  </div>

                  <div className='fv-row mb-8'>
                    <label className='form-label fw-bolder text-dark fs-6'>Email</label>
                    <input
                      placeholder='Email'
                      type='email'
                      autoComplete='off'
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className='form-control bg-transparent'
                    />
                    {/* Add error message display logic if needed */}
                  </div>

                  <div className='fv-row mb-8'>
                    <label className='form-label fw-bolder text-dark fs-6'>Phone Number</label>
                    <input
                      placeholder='Phone no.'
                      type='phone'
                      autoComplete='off'
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className='form-control bg-transparent'
                    />
                    {/* Add error message display logic if needed */}
                  </div>

                  <div className='fv-row mb-8'>
                    <label className='form-label fw-bolder text-dark fs-6'>Password</label>
                    <input
                      placeholder='Password'
                      type='password'
                      autoComplete='off'
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                      className='form-control bg-transparent'
                    />
                    {/* Add error message display logic if needed */}
                  </div>

                  <div className='fv-row mb-8'>
                    <label className='form-label fw-bolder text-dark fs-6'>Confirm Password</label>
                    <input
                      placeholder='Confirm Password'
                      type='password'
                      autoComplete='off'
                      value={formData.changepassword}
                      onChange={(e) => setFormData({...formData, changepassword: e.target.value})}
                      className='form-control bg-transparent'
                    />
                    {/* Add error message display logic if needed */}
                  </div>

                  <div className='fv-row mb-8'>
                    <label className='form-label fw-bolder text-dark fs-6'>Role</label>
                    <select
                      value={formData.role}
                      onChange={(e) => setFormData({...formData, role: e.target.value})}
                      className='form-select bg-transparent'
                    >
                      <option value=''>Select Role</option>
                      <option value='admin'>Admin</option>
                      <option value='user'>User</option>
                    </select>
                    {/* Add error message display logic if needed */}
                  </div>

                  <div className='fv-row mb-8'>
                    <label className='form-label fw-bolder text-dark fs-6'>Department</label>
                    <select
                      value={formData.department}
                      onChange={(e) => setFormData({...formData, department: e.target.value})}
                      className='form-select bg-transparent'
                    >
                      <option value=''>Select Department</option>
                      <option value='engineering'>Engineering</option>
                      <option value='marketing'>Marketing</option>
                      <option value='finance'>Finance</option>
                    </select>
                    {/* Add error message display logic if needed */}
                  </div>

                  <div className='d-grid mb-10'>
                    <button type='submit' id='kt_sign_in_submit' className='btn btn-primary mt-5'>
                      <span className='indicator-label'>Sign Up</span>
                      <span className='indicator-progress'>
                        Please wait...
                        <span className='spinner-border spinner-border-sm align-middle ms-2' />
                      </span>
                    </button>
                  </div>
                  <div className='text-gray-500 text-center fw-semibold fs-6'>
                    Already a member?{' '}
                    <Link to='/auth' className='link-primary'>
                      Sign In
                    </Link>
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

export default SignUp
