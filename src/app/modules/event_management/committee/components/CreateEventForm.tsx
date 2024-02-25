import React, { useState } from 'react';

type CreateEventModalProps = {
  show: boolean;
  onClose: () => void;
};

const CreateEventForm: React.FC<CreateEventModalProps> = ({ show, onClose }) => {
  const [formData, setFormData] = useState({
    eventName: '',
    eventInfo: '',
    category: '',
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
    time: '',
    venue: '',
    budget: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Implement your form submission logic here
    onClose();
  };

  return (
    <>
      {show && (
        <>
          <div className='modal fade show d-block' tabIndex={-1} aria-hidden='true'>
            <div className='modal-dialog modal-dialog-centered mw-750px'>
              <div className='modal-content'>
                <div className='modal-header'>
                  <h2 className='fw-bold'>Create Event</h2>
                  <div
                    className='btn btn-icon btn-sm btn-active-icon-primary'
                    data-kt-roles-modal-action='close'
                    onClick={onClose}
                  >
                    <i className='ki-duotone ki-cross fs-1'>
                      <span className='path1'></span>
                      <span className='path2'></span>
                    </i>
                  </div>
                </div>
                <div className='modal-body scroll-y mx-lg-5 my-7'>
                <form id='kt_modal_add_role_form' className='form' onSubmit={handleFormSubmit}>
                {/* First row */}
                <div className='row mb-5'>
                  {/* First column */}
                  <div className='col-md-6'>
                    <label className='fs-5 fw-bold form-label mb-2'>
                      <span className='required'>Event Name</span>
                    </label>
                    <input
                      type='text'
                      className='form-control form-control-solid'
                      placeholder='Enter event name'
                      name='eventName'
                      value={formData.eventName}
                      onChange={handleInputChange}
                    />
                  </div>
                  {/* Second column */}
                  <div className='col-md-6'>
                    <label className='fs-5 fw-bold form-label mb-2'>
                      <span className='required'>Event Info</span>
                    </label>
                    <input
                      type='text'
                      className='form-control form-control-solid'
                      placeholder='Enter event info'
                      name='eventInfo'
                      value={formData.eventInfo}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                {/* Second row */}
                <div className='row mb-5'>
                  {/* First column */}
                  <div className='col-md-6'>
                    <label className='fs-5 fw-bold form-label mb-2'>
                      <span className='required'>Category</span>
                    </label>
                    <select
                      className='form-select form-select-solid'
                      name='category'
                      value={formData.category}
                      onChange={handleInputChange}
                    >
                      <option value=''>Select</option>

                      <option value='cultural'>Cultural</option>
                      <option value='tech'>Tech</option>
                    </select>
                  </div>
                  {/* Second column */}
                  <div className='col-md-6'>
                    <label className='fs-5 fw-bold form-label mb-2'>
                      <span className='required'>Venue</span>
                    </label>
                    <select
                      className='form-select form-select-solid'
                      name='venue'
                      value={formData.venue}
                      onChange={handleInputChange}
                    >
                      <option value=''>Select</option>
                      <option value='hall'>Hall</option>
                      <option value='campus'>Campus</option>
                    </select>
                  </div>
                </div>

                <div className='row mb-5'>
                  {/* First column */}
                  <div className='col-md-6'>
                    <label className='fs-5 fw-bold form-label mb-2'>
                      <span className='required'>Start date</span>
                    </label>
                    <input
                      type='date'
                      className='form-control form-control-solid'
                      placeholder='Enter start date'
                      name='startDate'
                      value={formData.startDate}
                      onChange={handleInputChange}
                    />
                  </div>
                  {/* Second column */}
                  <div className='col-md-6'>
                    <label className='fs-5 fw-bold form-label mb-2'>
                      <span className='required'>End date</span>
                    </label>
                    <input
                      type='date'
                      className='form-control form-control-solid'
                      placeholder='Enter end date'
                      name='endDate'
                      value={formData.endDate}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                {/* Third row */}
                <div className='row mb-5'>
                  {/* First column */}
                  <div className='col-md-6'>
                    <label className='fs-5 fw-bold form-label mb-2'>
                      <span className='required'>Start Time</span>
                    </label>
                    <input
                      type='time'
                      className='form-control form-control-solid'
                      placeholder='Enter start time'
                      name='startTime'
                      value={formData.startTime}
                      onChange={handleInputChange}
                    />
                  </div>
                  {/* Second column */}
                  <div className='col-md-6'>
                    <label className='fs-5 fw-bold form-label mb-2'>
                      <span className='required'>End time</span>
                    </label>
                    <input
                      type='time'
                      className='form-control form-control-solid'
                      placeholder='Enter end time'
                      name='endTime'
                      value={formData.endTime}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                {/* Fourth row */}
                <div className='row'>
                  {/* First column */}
                  <div className='col-md-6'>
                    <label className='fs-5 fw-bold form-label mb-2'>
                      <span className='required'>Budget</span>
                    </label>
                    <input
                      type='text'
                      className='form-control form-control-solid'
                      placeholder='Enter budget'
                      name='budget'
                      value={formData.budget}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                {/* Submit buttons */}
                <div className='text-center pt-15'>
                  <button
                    type='reset'
                    className='btn btn-light me-5'
                    data-kt-roles-modal-action='cancel'
                    onClick={onClose}
                  >
                    Discard
                  </button>
                  <button
                    type='submit'
                    className='btn btn-primary'
                    data-kt-roles-modal-action='submit'
                  >
                    <span className='indicator-label'>Submit</span>
                    <span className='indicator-progress'>
                      Please wait...
                      <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                    </span>
                  </button>
                </div>
              </form>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export { CreateEventForm };
