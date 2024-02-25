import React, {FC, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {KTIcon} from '../../../_metronic/helpers'
import axios from 'axios'

interface FormData {
  college_name: string
  college_code: string
  address: string
  email: string
  password: string
  verify_at: string
  roles: string[]
  departments: string[]
  positions: string[] // Add positions property
  committees: string[]
  venues: string[] // Add venues property
  eventCategories: string[] // Add eventCategories property
  role: string
  department: string
  position: string // Add position property
  committee: string
  venue: string // Add venue property
  eventCategory: string // Add eventCategory property
}

const Setup: FC = () => {
  const [formData, setFormData] = useState<FormData>({
    college_name: '',
    college_code: '',
    address: '',
    email: '',
    password: '',
    verify_at: '',
    roles: [],
    departments: [],
    positions: [], // Initialize positions array
    committees: [],
    venues: [], // Initialize venues array
    eventCategories: [], // Initialize eventCategories array
    role: '',
    department: '',
    position: '', // Initialize position string
    committee: '',
    venue: '', // Initialize venue string
    eventCategory: '', // Initialize eventCategory string
  })

  const [allowPermission, setAllowPermission] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const {name, value} = e.target
    setFormData({...formData, [name]: value})
  }

  const handleAddRole = () => {
    const {role} = formData
    if (role) {
      setFormData({...formData, roles: [...formData.roles, role], role: ''})
    }
    console.log('Role:', formData.role)
    console.log('Permission:', allowPermission ? 'Allowed' : 'Not Allowed')
    setAllowPermission(false)
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAllowPermission(e.target.checked) // Update permission state when checkbox is changed
  }

  const handleAddDepartment = async () => {
    const {department} = formData
    if (department) {
      try {
        const response = await axios.post('http://localhost:5000/api/create-department', {
          name: department,
        })
        console.log('Department created:', response.data)
        alert('department added')
        // Assuming you want to update the UI or take any action upon successful department creation
      } catch (error) {
        console.error('Error creating department:', error)
        // Handle error cases
      }
      setFormData({...formData, department: ''})
    }
  }

  const handleAddPosition = async () => {
    const { position } = formData;
    if (position) {
      try {
        const response = await axios.post('http://localhost:5000/api/create-position', {
          name: position,
        });
        console.log('Position created:', response.data);
        alert('Position added');
        // Assuming you want to update the UI or take any action upon successful position creation
      } catch (error) {
        console.error('Error creating position:', error);
        // Handle error cases
      }
      setFormData({ ...formData, position: '' });
    }
  };

  const handleAddCommittee = async () => {
    const { committee } = formData;
    if (committee) {
      try {
        const response = await axios.post('http://localhost:5000/api/create-committee', {
          name: committee,
        });
        console.log('Committee created:', response.data);
        alert('Committee added');
        // Assuming you want to update the UI or take any action upon successful committee creation
      } catch (error) {
        console.error('Error creating committee:', error);
        // Handle error cases
      }
      setFormData({ ...formData, committee: '' });
    }
  };

  const handleAddVenue = async () => {
    const { venue } = formData;
    if (venue) {
      try {
        const response = await axios.post('http://localhost:5000/api/create-venue', {
          name: venue,
        });
        console.log('Venue created:', response.data);
        alert('Venue added');
        // Assuming you want to update the UI or take any action upon successful venue creation
      } catch (error) {
        console.error('Error creating venue:', error);
        // Handle error cases
      }
      setFormData({ ...formData, venue: '' });
    }
  };

  const handleAddEventCategory = async () => {
    const { eventCategory } = formData;
    if (eventCategory) {
      try {
        const response = await axios.post('http://localhost:5000/api/create-event-category', {
          name: eventCategory,
        });
        console.log('Event category created:', response.data);
        alert('Event category added');
        // Assuming you want to update the UI or take any action upon successful event category creation
      } catch (error) {
        console.error('Error creating event category:', error);
        // Handle error cases
      }
      setFormData({ ...formData, eventCategory: '' });
    }
  };
  

  const navigate = useNavigate()

  const handleCancel = () => {
    navigate('/institute-profile')
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const response = await axios.post('http://localhost:5000/api/create-institute', formData)
      console.log('Form submitted:', response.data)
      navigate('/institute-profile')
    } catch (error) {
      console.error('Error submitting form:', error)
    }
  }

  return (
    <div className='card mb-5 mb-xl-8'>
      <div
        className='card-header border-0 cursor-pointer'
        role='button'
        data-bs-target='#kt_account_profile_details'
        aria-controls='kt_account_profile_details'
      >
        <div className='card-title m-0'>
          <h1 className='fw-bold m-0 align-items-center pt-5'>Institute Setup</h1>
        </div>
      </div>

      <div id='kt_account_profile_details' className='collapse show'>
        <form
          onSubmit={handleSubmit}
          noValidate
          className='form'
          style={{
            marginInline: '46px',
            marginTop: '16px',
          }}
        >
          <div className='card-body border-top p-9 display-unset'>
            <div className='row mb-5'>
              <div className='col-md-4'>
                <div className='d-flex flex-column mb-10'>
                  <label className='fs-5 fw-bold form-label mb-2'>
                    <span className='required'>College Name</span>
                  </label>
                  <input
                    type='text'
                    className='form-control form-control-solid'
                    placeholder='Enter college name'
                    name='college_name'
                    value={formData.college_name}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className='col-md-4'>
                <div className='d-flex flex-column mb-10'>
                  <label className='fs-5 fw-bold form-label mb-2'>
                    <span className='required'>College Code</span>
                  </label>
                  <input
                    type='text'
                    className='form-control form-control-solid'
                    placeholder='Enter college code'
                    name='college_code'
                    value={formData.college_code}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className='col-md-4'>
                <div className='d-flex flex-column mb-10'>
                  <label className='fs-5 fw-bold form-label mb-2'>
                    <span className='required'>Address</span>
                  </label>
                  <input
                    type='text'
                    className='form-control form-control-solid'
                    placeholder='Enter address'
                    name='address'
                    value={formData.address}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>

            <div className='row mb-5'>
              <div className='col-md-4'>
                <div className='d-flex flex-column mb-10'>
                  <label className='fs-5 fw-bold form-label mb-2'>
                    <span className='required'>email</span>
                  </label>
                  <input
                    type='text'
                    className='form-control form-control-solid'
                    placeholder='Enter email'
                    name='email'
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className='col-md-4'>
                <div className='d-flex flex-column mb-10'>
                  <label className='fs-5 fw-bold form-label mb-2'>
                    <span className='required'>Password</span>
                  </label>
                  <input
                    type='text'
                    className='form-control form-control-solid'
                    placeholder='Enter password'
                    name='password'
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className='col-md-4'>
                <div className='d-flex flex-column mb-10'>
                  <label className='fs-5 fw-bold form-label mb-2'>
                    <span className='required'>Verify at</span>
                  </label>
                  <input
                    type='text'
                    className='form-control form-control-solid'
                    placeholder='Enter verify_at'
                    name='verify_at'
                    value={formData.verify_at}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>

            <hr />

            <div className='row mb-5 mt-10'>
              <div className='col-md-4'>
                <div className='d-flex flex-column mb-10'>
                  <label className='fs-5 fw-bold form-label mb-2'>
                    <span className='required'>Role</span>
                  </label>
                  <input
                    type='text'
                    className='form-control form-control-solid'
                    placeholder='Enter Role'
                    name='role'
                    value={formData.role}
                    onChange={handleInputChange}
                  />
                </div>
                <div className='form-check mb-3'>
                  <input
                    className='form-check-input'
                    type='checkbox'
                    id='permissionCheckbox'
                    checked={allowPermission}
                    onChange={handleCheckboxChange}
                  />
                  <label className='form-check-label text-gray-800' htmlFor='permissionCheckbox'>
                    Allow to give permission
                  </label>
                </div>
              </div>
              <div className='col-md-8 d-flex flex-column'>
                <div className='d-flex align-items-start mt-9'>
                  <button
                    type='button'
                    className='btn btn-primary me-3'
                    style={{width: '150px'}}
                    onClick={handleAddRole}
                  >
                    <KTIcon iconName='plus' className='fs-2' />
                    Role
                  </button>
                  {/* Display roles */}
                  {formData.roles.length > 0 && (
                    <div className='p-2 ms-9 border border-secondary border-2 rounded'>
                      <label className='fs-5 fw-bold form-label mb-2'>Roles : </label>
                      <span>{formData.roles.join(', ')}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className='row mb-5'>
              <div className='col-md-4'>
                <div className='d-flex flex-column mb-10'>
                  <label className='fs-5 fw-bold form-label mb-2'>
                    <span className='required'>Department</span>
                  </label>
                  <input
                    type='text'
                    className='form-control form-control-solid'
                    placeholder='Enter Department'
                    name='department'
                    value={formData.department}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className='col-md-8 d-flex flex-column'>
                <div className='d-flex align-items-start mt-9'>
                  <button
                    type='button'
                    className='btn btn-primary me-3'
                    style={{width: '150px'}}
                    onClick={handleAddDepartment}
                  >
                    <KTIcon iconName='plus' className='fs-2' />
                    Department
                  </button>
                </div>
              </div>
            </div>

            <div className='row mb-5'>
              <div className='col-md-4'>
                <div className='d-flex flex-column mb-10'>
                  <label className='fs-5 fw-bold form-label mb-2'>
                    <span className='required'>Position</span>
                  </label>
                  <input
                    type='text'
                    className='form-control form-control-solid'
                    placeholder='Enter Position'
                    name='position'
                    value={formData.position}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className='col-md-8 d-flex flex-column'>
                <div className='d-flex align-items-start mt-9'>
                  <button
                    type='button'
                    className='btn btn-primary me-3'
                    style={{width: '150px'}}
                    onClick={handleAddPosition}
                  >
                    <KTIcon iconName='plus' className='fs-2' />
                    Position
                  </button>
                </div>
              </div>
            </div>

            <div className='row mb-5'>
              <div className='col-md-4'>
                <div className='d-flex flex-column mb-10'>
                  <label className='fs-5 fw-bold form-label mb-2'>
                    <span className='required'>Committee</span>
                  </label>
                  <input
                    type='text'
                    className='form-control form-control-solid'
                    placeholder='Enter Committee'
                    name='committee'
                    value={formData.committee}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className='col-md-8 d-flex flex-column'>
                <div className='d-flex align-items-start mt-9'>
                  <button
                    type='button'
                    className='btn btn-primary me-3'
                    style={{width: '150px'}}
                    onClick={handleAddCommittee}
                  >
                    <KTIcon iconName='plus' className='fs-2' />
                    Committee
                  </button>
                </div>
              </div>
            </div>

            <div className='row mb-5'>
              <div className='col-md-4'>
                <div className='d-flex flex-column mb-10'>
                  <label className='fs-5 fw-bold form-label mb-2'>
                    <span className='required'>Venue</span>
                  </label>
                  <input
                    type='text'
                    className='form-control form-control-solid'
                    placeholder='Enter Venue'
                    name='venue'
                    value={formData.venue}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className='col-md-8 d-flex flex-column'>
                <div className='d-flex align-items-start mt-9'>
                  <button
                    type='button'
                    className='btn btn-primary me-3'
                    style={{width: '150px'}}
                    onClick={handleAddVenue}
                  >
                    <KTIcon iconName='plus' className='fs-2' />
                    Venue
                  </button>
                </div>
              </div>
            </div>

            <div className='row mb-5'>
              <div className='col-md-4'>
                <div className='d-flex flex-column mb-10'>
                  <label className='fs-5 fw-bold form-label mb-2'>
                    <span className='required'>Event Category</span>
                  </label>
                  <input
                    type='text'
                    className='form-control form-control-solid'
                    placeholder='Enter Event Category'
                    name='eventCategory'
                    value={formData.eventCategory}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className='col-md-8 d-flex flex-column'>
                <div className='d-flex align-items-start mt-9'>
                  <button
                    type='button'
                    className='btn btn-primary me-3'
                    style={{width: '150px'}}
                    onClick={handleAddEventCategory}
                  >
                    <KTIcon iconName='plus' className='fs-2' />
                    Category
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className='card-footer d-flex justify-content-center py-6 px-9'>
            <button type='button' className='btn btn-danger me-10' onClick={handleCancel}>
              Cancel
            </button>

            <button type='submit' className='btn btn-primary'>
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Setup
