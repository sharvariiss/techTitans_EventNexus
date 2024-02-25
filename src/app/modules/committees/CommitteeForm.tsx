import React, { useState } from 'react';

type CommitteeModalProps = {
  show: boolean;
  onClose: () => void;
};

const CommitteeForm: React.FC<CommitteeModalProps> = ({ show, onClose }) => {
  const [formData, setFormData] = useState({
    committeeName: '',
    email: '',
    description: '',
    department: '',
    contactInfo: '',
    goalsObjectives: ''
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
                  <h2 className='fw-bold'>Edit Committee</h2>
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
                            <span className='required'>Committee Name</span>
                          </label>
                          <input
                            type='text'
                            className='form-control form-control-solid'
                            placeholder='Enter committee name'
                            name='committeeName'
                            value={formData.committeeName}
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
                            placeholder='Description of your committee'
                            name='description'
                            value={formData.description}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className='d-flex flex-column mb-10'>
                          <label className='fs-5 fw-bold form-label mb-2'>
                            <span className='required'>Department</span>
                          </label>
                          <select
                            className='form-select form-select-solid'
                            name='department'
                            value={formData.department}
                            onChange={handleInputChange}
                          >
                            <option value=''>Select the department</option>
                            <option value='Computer Science'>Computer Science</option>
                            <option value='Information Technology'>Information Technology</option>
                            <option value='Mechanical Engineering'>Mechanical Engineering</option>
                            <option value='Civil Engineering'>Civil Engineering</option>
                            <option value='Internet of Things'>Internet of Things</option>
                          </select>
                        </div>
                      </div>
                      <div className='col-md-6'>
                        <div className='d-flex flex-column mb-10'>
                          <label className='fs-5 fw-bold form-label mb-2'>
                            <span className='required'>Email ID</span>
                          </label>
                          <input
                            type='text'
                            className='form-control form-control-solid'
                            placeholder='Enter email ID'
                            name='email'
                            value={formData.email}
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
                            name='contactInfo'
                            value={formData.contactInfo}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className='d-flex flex-column mb-10'>
                          <label className='fs-5 fw-bold form-label mb-2'>
                            <span className='required'>Goals & Objectives</span>
                          </label>
                          <input
                            type='text'
                            className='form-control form-control-solid'
                            placeholder='Enter goals and objectives'
                            name='goalsObjectives'
                            value={formData.goalsObjectives}
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
