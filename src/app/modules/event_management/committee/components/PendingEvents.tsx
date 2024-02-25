import { useState } from 'react';
import { KTIcon } from '../../../../../_metronic/helpers';
import { ProcessForm } from './ProcessForm';
import { EventUpdateForm } from './EventUpdateForm';

interface Event {
  id: string;
  eventName: string;
  category: string;
  committeeHead: string;
  department: string;
  date: string;
  time: string;
  venue: string;
  status: string;
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
    status: 'Pending',
  },
  // Add more events as needed
];

const PendingEvents = () => {
  const [isProcessModalOpen, setIsProcessModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  const handleOpenViewModal = () => {
    setIsProcessModalOpen(true);
  };

  const handleCloseViewModal = () => {
    setIsProcessModalOpen(false);
  };

  const handleOpenUpdateModal = () => {
    setIsUpdateModalOpen(true);
  };

  const handleCloseUpdateModal = () => {
    setIsUpdateModalOpen(false);
  };

  const handleDeleteConfirmation = (eventId: string) => {
    setSelectedEventId(eventId);
  };

  const handleDelete = () => {
    if (selectedEventId) {
      const updatedEvents = eventsData.filter((event) => event.id !== selectedEventId);
      console.log('Deleting event with ID:', selectedEventId);
      console.log('Remaining events:', updatedEvents);
      setSelectedEventId(null); // Reset selected event
    }
  };

  return (
    <>
    {selectedEventId && (
        <div className='modal fade show' role='dialog' style={{ display: 'block' }} tabIndex={-1}>
          <div className='modal-dialog modal-dialog-centered'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h5 className='modal-title'>Confirm Deletion</h5>
                <button type='button' className='btn-close' onClick={() => setSelectedEventId(null)}></button>
              </div>
              <div className='modal-body'>Are you sure you want to delete this event?</div>
              <div className='modal-footer'>
                <button type='button' className='btn btn-secondary' onClick={() => setSelectedEventId(null)}>
                  Cancel
                </button>
                <button type='button' className='btn btn-danger' onClick={handleDelete}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className='flex-lg-row-fluid my-10 mx-5'>
        <div className='card-body pt-0'>
          <table className='table align-middle table-row-dashed fs-6 gy-5 mb-0' id='kt_roles_view_table'>
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
                <th className='px-3 min-w-50px'>Actions</th>
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
                  <td>
                    <button
                      className='btn btn-icon btn-active-light-primary w-30px h-30px'
                      data-bs-toggle='tooltip'
                      data-bs-placement='top'
                      title='View'
                      onClick={handleOpenViewModal}
                      style={{ cursor: 'pointer' }}
                    >
                      <KTIcon iconName='eye' className='fs-3 text-primary' />
                    </button>
                    {isProcessModalOpen && <ProcessForm show={true} onClose={handleCloseViewModal} />}
                    <button
                      className='btn btn-icon btn-active-light-success w-30px h-30px'
                      data-bs-toggle='tooltip'
                      data-bs-placement='top'
                      title='Update'
                      onClick={handleOpenUpdateModal}
                      style={{ cursor: 'pointer' }}
                    >
                      <KTIcon iconName='pencil' className='fs-3 text-success'/>
                    </button>
                    {isUpdateModalOpen && <EventUpdateForm show={true} onClose={handleCloseUpdateModal} eventId={selectedEventId}/>}
                    <button
                      className='btn btn-icon btn-active-light-danger w-30px h-30px'
                      data-kt-permissions-table-filter='delete_row'
                      onClick={() => handleDeleteConfirmation(event.id)}
                      data-bs-toggle='tooltip'
                      data-bs-placement='top'
                      title='Delete'
                    >
                      <KTIcon iconName='trash' className='fs-3 text-danger'/>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Confirmation Modal */}
      
    </>
  );
};

export default PendingEvents;
