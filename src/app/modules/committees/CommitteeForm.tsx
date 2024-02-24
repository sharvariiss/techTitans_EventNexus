import React, { useState } from 'react';

type CommitteeModalProps = {
  show: boolean;
  onClose: () => void;
};

const CommitteeForm: React.FC<CommitteeModalProps> = ({ show, onClose }) => {
  const [formData, setFormData] = useState({
    carModel: '',
    driverName: '',
    startLocation: '',
    endLocation: '',
    startDate: '',
    endDate: '',
    totalAmount: '',
    paid: ''
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
                  <h2 className='fw-bold'>Add Committee</h2>
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
                    <div className='row'>
                      <div className='col-md-6'>
                        <div className='d-flex flex-column mb-10'>
                          <label className='fs-5 fw-bold form-label mb-2'>
                            <span className='required'>Name</span>
                          </label>
                          <input
                            type='text'
                            className='form-control form-control-solid'
                            placeholder='Enter your name'
                            name='carModel'
                            value={formData.carModel}
                            onChange={handleInputChange}
                          />


                        </div>
                        <div className='d-flex flex-column mb-10'>
                          <label className='fs-5 fw-bold form-label mb-2'>
                            <span className='required'>Description</span>
                          </label>
                          <input
                            type='text'
                            className='form-control form-control-solid'
                            placeholder='escription of your committee'
                            name='startLocation'
                            value={formData.startLocation}
                            onChange={handleInputChange}
                          />
                        </div>
                        {/* <div className='d-flex flex-column mb-10'>
                          <label className='fs-5 fw-bold form-label mb-2'>
                            <span className='required'>Start Date</span>
                          </label>
                          <input
                            type='date'
                            className='form-control form-control-solid'
                            name='startDate'
                            value={formData.startDate}
                            onChange={handleInputChange}
                          />
                        </div> */}
                        <div className='d-flex flex-column mb-10'>
                          <label className='fs-5 fw-bold form-label mb-2'>
                            <span className='required'>Department</span>
                          </label>
                          <select

                            className='form-select form-select-solid'

                            name='totalAmount'
                            value={formData.totalAmount}
                            onChange={handleInputChange}
                          >
                            <option value=''>Select the department</option>
                            <option value='Honda city'>Computer Science</option>
                            <option value='swift desire'>Information Technology</option>
                            <option value='Honda city'>Mechanical Engineering</option>
                            <option value='Honda city'>Civil Engineering</option>
                            <option value='Honda city'>Internet of Things</option>

                          </select>
                        </div>
                      </div>
                      <div className='col-md-6'>
                        <div className='d-flex flex-column mb-10'>
                          <label className='fs-5 fw-bold form-label mb-2'>
                            <span className='required'>Email I'D</span>
                          </label>
                          <input
                            type='text'
                            className='form-control form-control-solid'
                            placeholder='Enter email Id'
                            name='driverName'
                            value={formData.driverName}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className='d-flex flex-column mb-10'>
                          <label className='fs-5 fw-bold form-label mb-2'>
                            <span className='required'>Contact Info</span>
                          </label>
                          <input
                            type='text'

                            className='form-control form-control-solid'
                            placeholder='Enter contact information'
                            name='endLocation'
                            value={formData.endLocation}
                            onChange={handleInputChange}
                          />
                        </div>
                        {/* <div className='d-flex flex-column mb-10'>
                          <label className='fs-5 fw-bold form-label mb-2'>
                            <span className='required'>End Date</span>
                          </label>
                          <input
                            type='date'
                            className='form-control form-control-solid'
                            name='endDate'
                            value={formData.endDate}
                            onChange={handleInputChange}
                          />
                        </div> */}
                        <div className='d-flex flex-column mb-10'>
                          <label className='fs-5 fw-bold form-label mb-2'>
                            <span className='required'>Goals & Objective</span>
                          </label>
                          <input
                            type='text'

                            className='form-control form-control-solid'
                            placeholder='Enter goals and objective'
                            name='paid'
                            value={formData.paid}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                    </div>
                    <div className='text-center pt-15'>
                      <button
                        type='reset'
                        className='btn btn-light me-3'
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

export { CommitteeForm };
