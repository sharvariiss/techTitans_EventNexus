import React, { useState } from 'react'
import {KTIcon} from '../../../_metronic/helpers'
import { CommitteeForm } from './CommitteeForm'

interface CommitteeCardProps {
  name: string
  department: string
  contactInfo: string
}

const CommitteeCard: React.FC<CommitteeCardProps> = ({name, department, contactInfo}) => {
  const [isAddCommitteeeModalOpen, setIsAddCommitteeModalOpen] = useState(false)

  const handleOpenModal = () => {
    setIsAddCommitteeModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsAddCommitteeModalOpen(false)
  }

  return (
    <div
      className='card'
      style={{
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        transition: 'box-shadow 0.3s',
        borderRadius: '8px',
        cursor: 'pointer',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 8px 12px rgba(0, 0, 0, 0.2)' // Increase box shadow on hover
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)' // Restore original box shadow on mouse leave
      }}
    >
      <div className='card-body'>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <h5 className='card-title mb-5'>{name}</h5>
          <button
            className='btn btn-icon btn-active-light-primary w-30px h-30px mb-3'
            data-bs-toggle='tooltip'
            data-bs-placement='top'
            title='View'
            onClick={handleOpenModal}
            style={{cursor: 'pointer'}}
          >
            <KTIcon iconName='pencil' className='fs-3 text-primary' />
          </button>
          {isAddCommitteeeModalOpen && (
          <CommitteeForm show={true} onClose={handleCloseModal} />
        )}
        </div>
        <div style={{display: 'flex', alignItems: 'center', marginBottom: '5px'}}>
          <KTIcon iconName='yii' className='fs-2 text-primary me-2' /> {/* Department icon */}
          <p className='card-text fw-semibold text-gray-700'>{department}</p>
        </div>
        <div style={{display: 'flex', alignItems: 'center'}}>
          <KTIcon iconName='phone' className='fs-2 text-primary me-2' /> {/* Contact icon */}
          <p className='card-text fw-semibold text-gray-700'>{contactInfo}</p>
        </div>
      </div>
    </div>
  )
}

export default CommitteeCard
