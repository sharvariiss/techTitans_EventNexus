import React, {FC, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {KTIcon} from '../../../_metronic/helpers'

interface FormData {
    collegeName: string;
    collegeCode: string;
    address: string;
    email: string;
    password: string;
    verifyAt: string;
    roles: string[];
    departments: string[];
    positions: string[]; // Add positions property
    committees: string[];
    venues: string[]; // Add venues property
    eventCategories: string[]; // Add eventCategories property
    role: string;
    department: string;
    position: string; // Add position property
    committee:string;
    venue: string; // Add venue property
    eventCategory: string; // Add eventCategory property
  }
  
  const Setup: FC = () => {
    const [formData, setFormData] = useState<FormData>({
      collegeName: '',
      collegeCode: '',
      address: '',
      email: '',
      password: '',
      verifyAt: '',
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
      eventCategory: '' // Initialize eventCategory string
    });
  
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
  
    const handleAddRole = () => {
      const { role } = formData;
      if (role) {
        setFormData({ ...formData, roles: [...formData.roles, role], role: '' });
      }
    };
  
    const handleAddDepartment = () => {
      const { department } = formData;
      if (department) {
        setFormData({ ...formData, departments: [...formData.departments, department], department: '' });
      }
    };
  
    const handleAddPosition = () => {
      const { position } = formData;
      if (position) {
        setFormData({ ...formData, positions: [...formData.positions, position], position: '' });
      }
    };

    const handleAddCommittee = () => {
      const { committee } = formData;
      if (committee) {
        setFormData({ ...formData, committees: [...formData.committees, committee], committee: '' });
      }
    };
  
    const handleAddVenue = () => {
      const { venue } = formData;
      if (venue) {
        setFormData({ ...formData, venues: [...formData.venues, venue], venue: '' });
      }
    };
  
    const handleAddEventCategory = () => {
      const { eventCategory } = formData;
      if (eventCategory) {
        setFormData({ ...formData, eventCategories: [...formData.eventCategories, eventCategory], eventCategory: '' });
      }
    };
  

  const navigate = useNavigate()

  const handleCancel = () => {
    navigate('/institute-profile')
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    navigate('/institute-profile')
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
                    name='collegeName'
                    value={formData.collegeName}
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
                    name='collegeCode'
                    value={formData.collegeCode}
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
                    placeholder='Enter verifyAt'
                    name='verifyAt'
                    value={formData.verifyAt}
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
                  {/* Display roles */}
                  {formData.departments.length > 0 && (
                    <div className='p-2 ms-9 border border-secondary border-2 rounded'>
                      <label className='fs-5 fw-bold form-label mb-2'>Departments : </label>
                      <span>{formData.departments.join(', ')}</span>
                    </div>
                  )}
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
                  {/* Display roles */}
                  {formData.positions.length > 0 && (
                    <div className='p-2 ms-9 border border-secondary border-2 rounded'>
                      <label className='fs-5 fw-bold form-label mb-2'>Positions : </label>
                      <span>{formData.positions.join(', ')}</span>
                    </div>
                  )}
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
                  {/* Display roles */}
                  {formData.committees.length > 0 && (
                    <div className='p-2 ms-9 border border-secondary border-2 rounded'>
                      <label className='fs-5 fw-bold form-label mb-2'>Committees : </label>
                      <span>{formData.committees.join(', ')}</span>
                    </div>
                  )}
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
                  {/* Display roles */}
                  {formData.venues.length > 0 && (
                    <div className='p-2 ms-9 border border-secondary border-2 rounded'>
                      <label className='fs-5 fw-bold form-label mb-2'>Venues : </label>
                      <span>{formData.venues.join(', ')}</span>
                    </div>
                  )}
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
                  {/* Display roles */}
                  {formData.eventCategories.length > 0 && (
                    <div className='p-2 ms-9 border border-secondary border-2 rounded'>
                      <label className='fs-5 fw-bold form-label mb-2'>Event Categories : </label>
                      <span>{formData.eventCategories.join(', ')}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            

            {/* Additional fields for address, email, password, and verifyAt */}
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
