import React, {useEffect, useState} from 'react'
import {Link, Navigate, useNavigate} from 'react-router-dom'
import {useAuth} from '../core/Auth'
import axios from 'axios'

interface Role {
  id: number
  name: string
}

interface Department {
  id: number
  name: string
}

const SignUp = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    changepassword: '',
    role: '',
    department: '',
  })

  const [roles, setRoles] = useState<Role[]>([])
  const [departments, setDepartments] = useState<Department[]>([])
  const [loadingRoles, setLoadingRoles] = useState(true)
  const [loadingDepartments, setLoadingDepartments] = useState(true)

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get<{roles: Role[]}>('http://localhost:5000/api/get-roles')
        setRoles(response.data.roles)
        setLoadingRoles(false)
      } catch (error) {
        console.error('Error fetching roles:', error)
        // Handle error here
      }
    }

    const fetchDepartments = async () => {
      try {
        const response = await axios.get<{departments: Department[]}>(
          'http://localhost:5000/api/get-department'
        )
        setDepartments(response.data.departments)
        setLoadingDepartments(false)
      } catch (error) {
        console.error('Error fetching departments:', error)
        // Handle error here
      }
    }

    fetchRoles()
    fetchDepartments()
  }, [])

  const loginHandler = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('http://localhost:5000/api/create-user', {
        institute_id: 1,
        email: formData.email,
        password: formData.password,
        name: formData.name,
        phone_number: formData.phone,
        role_id: parseInt(formData.role), // Parse role_id to integer
        department_id: parseInt(formData.department), 
      })
      console.log(response.data) // You can handle success response here
      navigate('/auth') // Redirect after successful signup
    } catch (error) {
      console.error('Error signing up:', error)
      // Handle error here, e.g., show error message to the user
    }
  }

  return (
    <div>
      <base href='../../../' />
      <meta charSet='utf-8' />

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
                <img alt='Logo' src='assets/media/logos/event-nexus.png' height={300} />
              </a>
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
                    <label className='form-label fw-bolder text-dark fs-6'>Name</label>
                    <input
                      placeholder='Name'
                      type='text'
                      autoComplete='off'
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
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
                    {loadingRoles ? (
                      <select className='form-select bg-transparent' disabled>
                        <option>Loading roles...</option>
                      </select>
                    ) : (
                      <select
                        value={formData.role}
                        onChange={(e) => setFormData({...formData, role: e.target.value})}
                        className='form-select bg-transparent'
                      >
                        <option value=''>Select Role</option>
                        {roles.map((role) => (
                          <option key={role.id} value={role.id}>
                            {role.name}
                          </option>
                        ))}
                      </select>
                    )}
                    {/* Add error message display logic if needed */}
                  </div>

                  <div className='fv-row mb-8'>
                    <label className='form-label fw-bolder text-dark fs-6'>Department</label>
                    {loadingDepartments ? (
                      <select className='form-select bg-transparent' disabled>
                        <option>Loading departments...</option>
                      </select>
                    ) : (
                      <select
                        value={formData.department}
                        onChange={(e) => setFormData({...formData, department: e.target.value})}
                        className='form-select bg-transparent'
                      >
                        <option value=''>Select Department</option>
                        {departments.map((department) => (
                          <option key={department.id} value={department.id}>
                            {department.name}
                          </option>
                        ))}
                      </select>
                    )}
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
