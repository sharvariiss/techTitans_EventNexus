import {useState, ChangeEvent} from 'react'
import {Link} from 'react-router-dom'
import {KTIcon} from '../../../../../_metronic/helpers'
import { ProcessForm } from './ProcessForm'

interface Event {
  id: string
  eventName: string
  category: string
  committeeHead: string
  department: string
  date: string
  time: string
  venue: string
  status: string
}

const eventsData: Event[] = [
  {
    id: '1',
    eventName: 'Annual Conference',
    category: 'Conference',
    committeeHead: 'John Doe',
    department: 'Marketing',
    date: '2024-02-24',
    time: '09:00 AM',
    venue: 'Grand Ballroom',
    status: 'Rejected',
  },
  // Add more events as needed
]

const RejectedEvents = () => {
  const [isProcessModalOpen, setIsProcessModalOpen] = useState(false)

  const handleOpenModal = () => {
    setIsProcessModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsProcessModalOpen(false)
  }

  return (
    <>
      <div className='flex-lg-row-fluid my-10 mx-5'>
        {/* <div className='card card-flush m-3 m-xl-6'> */}
        <div className='card-body pt-0'>
          <table
            className='table align-middle table-row-dashed fs-6 gy-5 mb-0'
            id='kt_roles_view_table'
          >
            <thead>
              <tr className='text-start fw-bold fs-7 text-uppercase gs-0'>
                <th className='min-w-10px'>ID</th>
                <th className='min-w-50px'>Event Name</th>
                <th className='min-w-50px'>Category</th>
                <th className='min-w-50px'>Committee Head</th>
                <th className='min-w-50px'>Department</th>
                <th className='min-w-50px'>Date</th>
                <th className='min-w-50px'>Time</th>
                <th className='min-w-50px'>Venue</th>
                <th className='min-w-50px'>Status</th>
                <th className='text-end px-3 min-w-50px'>Actions</th>
              </tr>
            </thead>
            <tbody className='fw-semibold text-gray-600'>
              {eventsData.map((event) => (
                <tr key={event.id}>
                  <td>{event.id}</td>
                  <td>{event.eventName}</td>
                  <td>{event.category}</td>
                  <td>{event.committeeHead}</td>
                  <td>{event.department}</td>
                  <td>{event.date}</td>
                  <td>{event.time}</td>
                  <td>{event.venue}</td>
                  <td>{event.status}</td>
                  <td className='text-end'>
                  <button
                      className='btn btn-icon btn-active-light-primary w-30px h-30px'
                      data-bs-toggle='tooltip'
                      data-bs-placement='top'
                      title='View'
                      onClick={handleOpenModal}
                      style={{cursor: 'pointer'}}
                    >
                      <KTIcon iconName='eye' className='fs-3 text-primary' />
                    </button>
                    {isProcessModalOpen && <ProcessForm show={true} onClose={handleCloseModal} />}
                    <button
                      className='btn btn-icon btn-active-light-success w-30px h-30px'
                      data-bs-toggle='tooltip'
                      data-bs-placement='top'
                      title='Update'
                      disabled
                    >
                      <KTIcon iconName='pencil' className='fs-3' />
                    </button>
                    <button
                      className='btn btn-icon btn-active-light-danger w-30px h-30px'
                      data-kt-permissions-table-filter='delete_row'
                      // onClick={() => handleDeleteRow(user.id)}
                      data-bs-toggle='tooltip'
                      data-bs-placement='top'
                      title='Delete'
                      disabled
                    >
                      <KTIcon iconName='trash' className='fs-3' />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* </div> */}
      </div>
    </>
  )
}

export default RejectedEvents
