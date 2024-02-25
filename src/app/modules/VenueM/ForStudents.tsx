import React, {useState, ChangeEvent} from 'react'
import {KTIcon} from '../../../_metronic/helpers'
import {Link} from 'react-router-dom'

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
    Evename: 'Auditorium',
    EventName: 'abcdefg...',
    category: 'Cultural',
    Department: 'Mechanical',
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

const ForStudents: React.FC = () => {
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

  const handleSelectAll = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const allUserIds = usersData.map((user) => user.SrNo)
      setSelectedUsers(allUserIds)
    } else {
      setSelectedUsers([])
    }
  }

  const handleDeleteSelected = () => {
    // Show confirmation dialog before deletion
    setShowConfirmation(true)
  }

  const handleConfirmDelete = () => {
    // Log the deleted users to the console
    const deletedUsers = usersData.filter((user) => selectedUsers.includes(user.SrNo))
    console.log('Deleted Users:', deletedUsers)

    // Update usersData by removing selected users
    const updatedUsersData = usersData.filter((user) => !selectedUsers.includes(user.SrNo))

    // Update the state, clear selection, and hide confirmation dialog
    setSelectedUsers([])
    usersData.splice(0, usersData.length, ...updatedUsersData)
    setShowConfirmation(false)
  }

  const handleCancelDelete = () => {
    // Clear selection and hide confirmation dialog
    setSelectedUsers([])
    setShowConfirmation(false)
  }

  const handleDeleteRow = (userId: string) => {
    // Show confirmation dialog before deletion
    setSelectedUsers([userId]) // Select the current row
    setShowConfirmation(true)
    // Log a message to the console
  }

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
            {/* <div className='card-toolbar'>
              <div
                className='d-flex align-items-center position-relative my-1'
                data-kt-view-roles-table-toolbar='base'
              >
                {selectedUsers.length === 0 ? (
                  <>
                    <button type='button' className='btn btn-light-primary me-3'>
                      <KTIcon iconName='exit-up' className='fs-2' />
                      Export
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      type='button'
                      className='btn btn-danger ms-3'
                      onClick={handleDeleteSelected}
                    >
                      Delete Selected
                    </button>
                    {showConfirmation && (
                      <div className='modal fade show' style={{display: 'block'}}>
                        <div className='modal-dialog'>
                          <div className='modal-content'>
                            <div className='modal-header'>
                              <h5 className='modal-title'>Confirmation</h5>
                              <button
                                type='button'
                                className='btn-close'
                                onClick={handleCancelDelete}
                              ></button>
                            </div>
                            <div className='modal-body'>
                              <p>Are you sure you want to delete the selected user(s)?</p>
                            </div>
                            <div className='modal-footer'>
                              <button
                                type='button'
                                className='btn btn-danger'
                                onClick={handleConfirmDelete}
                              >
                                Yes
                              </button>
                              <button
                                type='button'
                                className='btn btn-secondary'
                                onClick={handleCancelDelete}
                              >
                                No
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div> */}
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
                      <td>{user.action}</td>
                      <td>{user.feedback}</td>
                      {/* <td>{user.totalAmount}</td>
                      <td>{user.paid}</td>
                      <td>{user.remaining}</td> */}

                      <td className='text-end'>
                        {/* <Link
                          to='/view-profile/overview'
                          className='btn btn-icon btn-active-light-primary w-30px h-30px me-3'
                          data-bs-toggle='tooltip'
                          data-bs-placement='top'
                          title='View'
                        >
                          <KTIcon iconName='eye' className='fs-3' />
                        </Link> */}
                        {/* <button
                          className='btn btn-icon btn-active-light-primary w-30px h-30px'
                          data-kt-permissions-table-filter='delete_row'
                          onClick={() => handleDeleteRow(user.SrNo)}
                          data-bs-toggle='tooltip'
                          data-bs-placement='top'
                          title='Delete'
                        >
                          <KTIcon iconName='trash' className='fs-3' />
                        </button> */}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* Tab section */}
      <ul className='nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bolder mb-5'>
        <li className='nav-item'>
          <a className='nav-link active' data-bs-toggle='tab' href='#kt_table_widget_4_tab_1'>
            Over
          </a>
        </li>
        <li className='nav-item'>
          <a className='nav-link' data-bs-toggle='tab' href='#kt_table_widget_4_tab_2'>
            Live
          </a>
        </li>
        <li className='nav-item'>
          <a className='nav-link' data-bs-toggle='tab' href='#kt_table_widget_4_tab_3'>
            Upcoming
          </a>
        </li>
      </ul>

      {/* Tab content */}
      <div className='tab-content'>
        {/* Over Tab */}
        <div className='tab-pane fade show active' id='kt_table_widget_4_tab_1' role='tabpanel'>
          {/* Your content for Over tab goes here */}
        </div>

        {/* Live Tab */}
        <div className='tab-pane fade' id='kt_table_widget_4_tab_2' role='tabpanel'>
          {/* Your content for Live tab goes here */}
        </div>

        {/* Upcoming Tab */}
        <div className='tab-pane fade' id='kt_table_widget_4_tab_3' role='tabpanel'>
          {/* Your content for Upcoming tab goes here */}
        </div>
      </div>
    </>
  )
}

export {ForStudents}
