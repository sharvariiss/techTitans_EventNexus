import axios from 'axios'
import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'

interface InstituteData {
  id: number
  college_name: string
  college_code: string
  address: string
  verify_at: string
  created_at: string
  updated_at: string
  roles: string[]
  departments: string[]
  committees: string[]
  positions: string[]
  venues: string[]
  eventCategories: string[]
  // Add other properties as needed
}

const InstituteProfile = () => {
  const [instituteData, setInstituteData] = useState<InstituteData | null>(null)
  const [roles, setRoles] = useState<string[]>([])
  const [departments, setDepartments] = useState<string[]>([])
  const [committees, setCommittees] = useState<string[]>([])
  const [positions, setPositions] = useState<string[]>([])
  const [venues, setVenues] = useState<string[]>([])
  const [eventCategories, setEventCategories] = useState<string[]>([])

  useEffect(() => {
    const fetchInstituteData = async () => {
      try {
        const response = await axios
          .get<{institute: InstituteData[]}>('http://localhost:5000/api/get-institute')
          .then((response) => {
            setInstituteData(response.data.institute[0])
          })
        // Assuming there is only one institute for now

        const rolesResponse = await axios
          .get<{roles: {name: string}[]}>('http://localhost:5000/api/get-roles')
          .then((response) => {
            setRoles(response.data.roles.map((role) => role.name + ', '))
            console.log(response)
          })
        const departmentsResponse = await axios
          .get<{departments: {name: string}[]}>('http://localhost:5000/api/get-department')
          .then((response) => {
            setDepartments(response.data.departments.map((department) => department.name + ', '))
          })
        const committeesResponse = await axios
          .get<{committee: {name: string}[]}>('http://localhost:5000/api/get-committee')
          .then((response) => {
            setCommittees(response.data.committee.map((committee) => committee.name + ', '))
          })
        const positionsResponse = await axios
          .get<{positions: {name: string}[]}>('http://localhost:5000/api/get-position')
          .then((response) => {
            setPositions(response.data.positions.map((position) => position.name + ', '))
          })
        const venuesResponse = await axios
          .get<{venue: {name: string}[]}>('http://localhost:5000/api/get-venue')
          .then((response) => {
            setVenues(response.data.venue.map((venue) => venue.name + ', '))
          })
        const eventCategoriesResponse = await axios
          .get<{event_category: {name: string}[]}>('http://localhost:5000/api/get-event-category')
          .then((response) => {
            setEventCategories(response.data.event_category.map((category) => category.name + ', '))
          })
      } catch (error) {
        console.error('Error fetching institute data:', error)
      }
    }

    fetchInstituteData()
  }, [])

  const renderArrayWithComma = (array?: string[]) => {
    return array?.join(', ') ?? ''
  }

  return (
    <>
      {instituteData && (
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
                      <span className='fw-bolder fs-6 text-dark'>{instituteData.college_name}</span>
                    </div>
                  </div>
                </div>

                <div className='col-lg-6'>
                  <div className='row'>
                    <label className='col-md-5 col-lg-4 fw-bold text-muted'>College Code</label>
                    <div className='col-md-7 col-lg-8 fv-row'>
                      <span className='fw-bold fs-6'>{instituteData.college_code}</span>
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
              </div>
              <hr className='my-10' />

              {/* Rendering array properties */}
              <div className='row mb-7'>
                <label className='col-md-5 col-lg-2 fw-bold text-muted'>Roles</label>
                <div className='col-md-7 col-lg-6'>
                  <span className='fw-bolder fs-6 text-dark'>
                    {/* {renderArrayWithComma(instituteData?.roles)} */}
                    {roles}
                  </span>
                </div>
              </div>

              <div className='row mb-7'>
                <label className='col-md-5 col-lg-2 fw-bold text-muted'>Departments</label>
                <div className='col-md-7 col-lg-6'>
                  <span className='fw-bolder fs-6 text-dark'>
                    {/* {renderArrayWithComma(instituteData?.departments)} */}
                    {departments}
                  </span>
                </div>
              </div>

              <div className='row mb-7'>
                <label className='col-md-5 col-lg-2 fw-bold text-muted'>Committees</label>
                <div className='col-md-7 col-lg-6'>
                  <span className='fw-bolder fs-6 text-dark'>
                    {/* {renderArrayWithComma(instituteData?.committees)} */}
                    {committees}
                  </span>
                </div>
              </div>

              <div className='row mb-7'>
                <label className='col-md-5 col-lg-2 fw-bold text-muted'>Positions</label>
                <div className='col-md-7 col-lg-6'>
                  <span className='fw-bolder fs-6 text-dark'>
                    {/* {renderArrayWithComma(instituteData?.positions)} */}
                    {positions}
                  </span>
                </div>
              </div>

              <div className='row mb-7'>
                <label className='col-md-5 col-lg-2 fw-bold text-muted'>Venues</label>
                <div className='col-md-7 col-lg-6'>
                  <span className='fw-bolder fs-6 text-dark'>
                    {/* {renderArrayWithComma(instituteData?.venues)} */}
                    {venues}
                  </span>
                </div>
              </div>

              <div className='row mb-7'>
                <label className='col-md-5 col-lg-2 fw-bold text-muted'>Event Categories</label>
                <div className='col-md-7 col-lg-6'>
                  <span className='fw-bolder fs-6 text-dark'>
                    {/* {renderArrayWithComma(instituteData?.eventCategories)} */}
                    {eventCategories}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default InstituteProfile
