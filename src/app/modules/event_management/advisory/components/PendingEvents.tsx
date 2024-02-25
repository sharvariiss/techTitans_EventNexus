import React, { useState } from 'react';
import { KTIcon } from '../../../../../_metronic/helpers';
import { ProcessForm } from './ProcessForm';

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
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const handleOpenViewModal = (event: Event) => {
    setSelectedEvent(event);
    setIsProcessModalOpen(true);
  };

  const handleCloseViewModal = () => {
    setSelectedEvent(null);
    setIsProcessModalOpen(false);
  };

  const handleApproveConfirmation = () => {
    console.log("Event Approved");
    handleCloseViewModal();
  };

  const handleRejectConfirmation = () => {
    console.log("Event Rejected");
    handleCloseViewModal();
  };

  return (
    <>
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
                      onClick={() => handleOpenViewModal(event)}
                      style={{ cursor: 'pointer' }}
                    >
                      <KTIcon iconName='eye' className='fs-3 text-primary' />
                    </button>
                    <button
                      className='btn btn-icon btn-active-light-success w-30px h-30px'
                      data-bs-toggle='modal'
                      data-bs-target='#approveModal'
                      style={{ cursor: 'pointer' }}
                    >
                      <KTIcon iconName='like' className='fs-3 text-success'/>
                    </button>
                    <button
                      className='btn btn-icon btn-active-light-danger w-30px h-30px'
                      data-bs-toggle='modal'
                      data-bs-target='#rejectModal'
                      style={{ cursor: 'pointer' }}
                    >
                      <KTIcon iconName='dislike' className='fs-3 text-danger'/>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Approval Modal */}
      <div className="modal fade" id="approveModal" tabIndex={-1} aria-labelledby="approveModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="approveModalLabel">Approve Event</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              Are you sure you want to approve this event?
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" onClick={handleApproveConfirmation}>Yes</button>
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">No</button>
            </div>
          </div>
        </div>
      </div>

      {/* Rejection Modal */}
      <div className="modal fade" id="rejectModal" tabIndex={-1} aria-labelledby="rejectModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="rejectModalLabel">Reject Event</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              Are you sure you want to reject this event?
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" onClick={handleRejectConfirmation}>Yes</button>
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">No</button>
            </div>
          </div>
        </div>
      </div>

      {isProcessModalOpen && <ProcessForm show={true} onClose={handleCloseViewModal} />}
    </>
  );
};

export default PendingEvents;
