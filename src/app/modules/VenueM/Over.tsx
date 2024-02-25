import React, { useState, ChangeEvent } from 'react'
import { KTIcon } from '../../../_metronic/helpers'
import { Link } from 'react-router-dom'

interface User {
  SrNo: string
  Evename: string
  EventName: string
  category: string
  Department: string
  date: string
  time: string
  action: string
  feedback: string
  // totalAmount: string
  // paid: string
  // remaining: string
}

const usersData: User[] = [
  {
    SrNo: '1',
    Evename: 'Auditorium05',
    EventName: 'abcdefg...',
    category: 'Cultural',
    Department: 'Internet of Things',
    date: '02/03/24',
    time: '06:00 PM',
    action: 'Register',
    feedback: 'xyz',
    // totalAmount: '20,000',
    // paid: '16,000',
    // remaining: '4,000',
  },

  // Add more users as needed
]

const Over: React.FC = () => {
  const [selectedUsers, setSelectedUsers] = useState<string[]>([])
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [searchTerm, setSearchTerm] = useState<string>('')

  const filteredUsers = usersData.filter(
    (user) =>
      user.SrNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.Evename.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.EventName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleUserSelection = (userSrNo: string) => {
    const isSelected = selectedUsers.includes(userSrNo)

    if (isSelected) {
      setSelectedUsers(selectedUsers.filter((id) => id !== userSrNo))
    } else {
      setSelectedUsers([...selectedUsers, userSrNo])
    }
  }

  const handleRegisterClick = () => {
    // Show the registration confirmation popup
    setShowConfirmation(true);
  };

  const handleConfirmRegistration = () => {
    // Handle the registration confirmation logic here
    // For example, you can navigate to a registration page
    console.log('User confirmed registration');
    // Close the confirmation popup
    setShowConfirmation(false);
  };

  const handleCancelRegistration = () => {
    // Close the confirmation popup without registering
    setShowConfirmation(false);
  };

  const handleFeedbackChange = (event: ChangeEvent<HTMLInputElement>, userSrNo: string) => {
    // Handle feedback change and update the user's feedback in the state or elsewhere
    // For example, you can maintain feedback in the component's state
    const updatedUsersData = usersData.map((user) =>
      user.SrNo === userSrNo ? { ...user, feedback: event.target.value } : user
    );
    // Update the usersData state or perform other actions with the updated data
    console.log('Updated Users Data:', updatedUsersData);
  };

  return (
    <>
      <div className='flex-lg-row-fluid'>
        <div className='card card-flush mb-6 mb-xl-9'>
          <div className='card-header pt-5'>
            <div className='card-title'>
              <i className='ki-duotone ki-magnifier fs-1 position-absolute ms-6'>
                <span className='path1'></span>
                <span className='path2'></span>
              </i>
              <input
                type='text'
                data-kt-roles-table-filter='search'
                className='form-control form-control-solid w-250px ps-15'
                placeholder='Search'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
          </div>
          <div className='card-body pt-0'>
            <table
              className='table align-middle table-row-dashed fs-6 gy-5 mb-0'
              id='kt_roles_view_table'
            >
              <thead>
                <tr className='text-start fw-bold fs-7 text-uppercase gs-0'>
                  <th className='w-10px pe-2'>
                    <div className='form-check form-check-sm form-check-custom form-check-solid me-3'>
                      {/* <input
                        className='form-check-input'
                        type='checkbox'
                        onChange={handleSelectAll}
                        checked={selectedUsers.length === usersData.length}
                      /> */}
                    </div>
                  </th>
                  <th className='min-w-50px'>Sr.No.</th>
                  <th className='min-w-50px'>Event Name</th>
                  <th className='min-w-50px'>Event Info</th>
                  <th className='min-w-50px'>Category</th>
                  <th className='min-w-50px'>Department</th>
                  <th className='min-w-50px'>Date</th>
                  <th className='min-w-50px'>Time</th>
                  <th className='min-w-50px'>Action</th>
                  <th className='min-w-50px'>Feedback</th>                  {/* <th className='min-w-50px'>Total</th>
                  <th className='min-w-50px'>Paid</th>
                  <th className='min-w-50px'>Remaining</th>
                  <th className='text-end px-3 min-w-50px'>Actions</th> */}
                </tr>
              </thead>
              <tbody className='fw-semibold text-gray-600'>
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan={9} className='text-center'>
                      No records found.
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user) => (
                    <tr key={user.SrNo}>
                      <td>
                        <div className='form-check form-check-sm form-check-custom form-check-solid'>
                          {/* <input
                            className='form-check-input'
                            type='checkbox'
                            value={user.SrNo}
                            checked={selectedUsers.includes(user.SrNo)}
                            onChange={() => handleUserSelection(user.SrNo)}
                          /> */}
                        </div>
                      </td>
                      <td>{user.SrNo}</td>
                      <td>{user.Evename}</td>
                      <td>{user.EventName}</td>
                      <td>{user.category}</td>
                      <td>{user.Department}</td>
                      <td>{user.date}</td>
                      <td>{user.time}</td>
                      <td>
                        {user.action === 'Register' && (
                          <button
                            className='btn btn-primary btn-sm'
                            onClick={handleRegisterClick}
                          >
                            {user.action}
                          </button>
                        )}
                      </td>
                      <td>
                        <input
                          type='text'
                          value={user.feedback}
                          onChange={(e) => handleFeedbackChange(e, user.SrNo)}
                          style={{
                            width: '100px',
                            borderRadius: '5px',
                            padding: '5px',
                            border: '1px solid grey'
                          }}
                        />
                      </td>
                      

                      <td className='text-end'>
                        
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      
      {showConfirmation && (
        <div className='modal fade show' style={{ display: 'block' }}>
          <div className='modal-dialog'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h5 className='modal-title'>Registration Confirmation</h5>
                <button
                  type='button'
                  className='btn-close'
                  onClick={handleCancelRegistration}
                ></button>
              </div>
              <div className='modal-body'>
                <p>Do you want to participate in this event?</p>
              </div>
              <div className='modal-footer'>
                <button
                  type='button'
                  className='btn btn-primary'
                  onClick={handleConfirmRegistration}
                >
                  Yes
                </button>
                <button
                  type='button'
                  className='btn btn-secondary'
                  onClick={handleCancelRegistration}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      
    </>
  )
}

export { Over }