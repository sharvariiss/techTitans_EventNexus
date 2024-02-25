import {Link} from 'react-router-dom'

const InstituteProfile = () => {
  const instituteData = {
    collegeName: 'John',
    collegeCode: 'Doe',
    address: 'Smith',
    email: '1990-01-01',
    roles: ['Role 1', 'Role 2', 'Role 3'],
    departments: ['Department 1', 'Department 2'],
    committees: ['Committee 1', 'Committee 2', 'Committee 3'],
    positions: ['Position 1', 'Position 2'],
    venues: ['Venue 1', 'Venue 2', 'Venue 3'],
    eventCategories: ['Category 1', 'Category 2', 'Category 3'],
  }

  // Function to join array elements with comma separation
  const renderArrayWithComma = (array) => {
    return array.join(', ')
  }

  return (
    <>
      <div className='card mb-5 mb-xl-8'>
        <div
          className='card-header border-0 cursor-pointer'
          role='button'
          data-bs-target='#kt_account_profile_details'
          aria-controls='kt_account_profile_details'
        >
          <div className='card-title m-0'>
            <h1 className='fw-bold m-0 align-items-center pt-5'>Institute Profile</h1>
          </div>
          <Link
            to='/institute-setup'
            className='btn btn-primary mx-10 my-5'
            style={{cursor: 'pointer'}}
          >
            Edit
          </Link>
        </div>

        <div id='kt_account_profile_details' className='collapse show'>
          <div className='card-body border-top p-9 display-unset'>
            <div className='row mb-7'>
              <div className='col-lg-6 mb-lg-0 mb-4'>
                <div className='row'>
                  <label className='col-md-5 col-lg-4 fw-bold text-muted'>College Name</label>
                  <div className='col-md-7 col-lg-8'>
                    <span className='fw-bolder fs-6 text-dark'>{instituteData?.collegeName}</span>
                  </div>
                </div>
              </div>

              <div className='col-lg-6'>
                <div className='row'>
                  <label className='col-md-5 col-lg-4 fw-bold text-muted'>College Code</label>
                  <div className='col-md-7 col-lg-8 fv-row'>
                    <span className='fw-bold fs-6'>{instituteData?.collegeCode}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className='row mb-7'>
              <div className='col-lg-6 mb-lg-0 mb-4'>
                <div className='row'>
                  <label className='col-md-5 col-lg-4 fw-bold text-muted'>Address</label>
                  <div className='col-md-7 col-lg-8'>
                    <span className='fw-bolder fs-6 text-dark'>{instituteData?.address}</span>
                  </div>
                </div>
              </div>

              <div className='col-lg-6'>
                <div className='row'>
                  <label className='col-md-5 col-lg-4 fw-bold text-muted'>Email</label>
                  <div className='col-md-7 col-lg-8 fv-row'>
                    <span className='fw-bold fs-6'>{instituteData?.email}</span>
                  </div>
                </div>
              </div>
            </div>
            <hr className='my-10' />

            {/* Rendering array properties */}
            <div className='row mb-7'>
              <label className='col-md-5 col-lg-2 fw-bold text-muted'>Roles</label>
              <div className='col-md-7 col-lg-6'>
                <span className='fw-bolder fs-6 text-dark'>
                  {renderArrayWithComma(instituteData?.roles)}
                </span>
              </div>
            </div>

            <div className='row mb-7'>
              <label className='col-md-5 col-lg-2 fw-bold text-muted'>Departments</label>
              <div className='col-md-7 col-lg-6'>
                <span className='fw-bolder fs-6 text-dark'>
                  {renderArrayWithComma(instituteData?.departments)}
                </span>
              </div>
            </div>

            <div className='row mb-7'>
              <label className='col-md-5 col-lg-2 fw-bold text-muted'>Committees</label>
              <div className='col-md-7 col-lg-6'>
                <span className='fw-bolder fs-6 text-dark'>
                  {renderArrayWithComma(instituteData?.committees)}
                </span>
              </div>
            </div>

            <div className='row mb-7'>
              <label className='col-md-5 col-lg-2 fw-bold text-muted'>Positions</label>
              <div className='col-md-7 col-lg-6'>
                <span className='fw-bolder fs-6 text-dark'>
                  {renderArrayWithComma(instituteData?.positions)}
                </span>
              </div>
            </div>

            <div className='row mb-7'>
              <label className='col-md-5 col-lg-2 fw-bold text-muted'>Venues</label>
              <div className='col-md-7 col-lg-6'>
                <span className='fw-bolder fs-6 text-dark'>
                  {renderArrayWithComma(instituteData?.venues)}
                </span>
              </div>
            </div>

            <div className='row mb-7'>
              <label className='col-md-5 col-lg-2 fw-bold text-muted'>Event Categories</label>
              <div className='col-md-7 col-lg-6'>
                <span className='fw-bolder fs-6 text-dark'>
                  {renderArrayWithComma(instituteData?.eventCategories)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default InstituteProfile
