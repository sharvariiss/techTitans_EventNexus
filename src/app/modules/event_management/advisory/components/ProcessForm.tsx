import React, { useState } from 'react';
import { KTIcon } from '../../../../../_metronic/helpers';

type ProcessFormModalProps = {
  show: boolean;
  onClose: () => void;
};

const ProcessForm: React.FC<ProcessFormModalProps> = ({ show, onClose }) => {
  return (
    <>
      {show && (
        <>
          <div className='modal fade show d-block' tabIndex={-1} aria-hidden='true'>
            <div className='modal-dialog modal-dialog-centered mw-500px'>
              <div className='modal-content'>
                <div className='modal-header'>
                  <h2 className='fw-bold'>Process</h2>
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
                <div className='modal-body scroll-y mt-5 d-flex flex-column align-items-center'>
                  <div className='mb-10'>
                    <div className='d-flex align-items-center'>
                      <div className='btn btn-icon bg-light d-flex justify-content-center align-items-center rounded-circle w-50px h-50px'>
                        <KTIcon iconName='like' className='fs-2hx text-success' />
                      </div>
                      <span className='ms-3 fs-3'>Principle</span>
                    </div>
                  </div>
                  <div className='mb-10'>
                    <div className='d-flex align-items-center'>
                      <div className='btn btn-icon bg-light d-flex justify-content-center align-items-center rounded-circle w-50px h-50px'>
                        <KTIcon iconName='dislike' className='fs-2hx text-danger' />
                      </div>
                      <span className='ms-3 fs-3'>HOD</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export { ProcessForm };
