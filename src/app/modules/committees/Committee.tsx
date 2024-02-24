import { useState } from "react"
import { KTIcon } from "../../../_metronic/helpers"
import { RentedCarTable } from "../rent_car/RentedCarTable"
import { CommitteeForm } from "./CommitteeForm"
import CommitteeCard from "./CommitteeCard"

const Committee = () => {
    const [isAddCommitteeeModalOpen, setIsAddCommitteeModalOpen] = useState(false)

  const handleOpenModal = () => {
    setIsAddCommitteeModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsAddCommitteeModalOpen(false)
  }
  const committees = [
    { name: 'XYZ Committee', department: 'ABC Department',  contactInfo: '1234567890' },
    { name: 'XYZ Committee', department: 'ABC Department',  contactInfo: '1234567890' },
    { name: 'XYZ Committee', department: 'ABC Department',  contactInfo: '1234567890' },
    { name: 'XYZ Committee', department: 'ABC Department', contactInfo: '1234567890' },
    { name: 'XYZ Committee', department: 'ABC Department',  contactInfo: '1234567890' },
    { name: 'XYZ Committee', department: 'ABC Department', contactInfo: '1234567890' },
    { name: 'XYZ Committee', department: 'ABC Department',  contactInfo: '1234567890' },
    { name: 'XYZ Committee', department: 'ABC Department',  contactInfo: '1234567890' },
    { name: 'XYZ Committee', department: 'ABC Department',  contactInfo: '1234567890' },
    { name: 'XYZ Committee', department: 'ABC Department',  contactInfo: '1234567890' },
    { name: 'XYZ Committee', department: 'ABC Department',  contactInfo: '1234567890' },
    { name: 'XYZ Committee', department: 'ABC Department', contactInfo: '1234567890' },
    // Add more committee objects as needed
    
  ];
    return (
        <>
        <div className='d-flex justify-content-end mb-5' data-kt-user-table-toolbar='base'>
        <button
          type='button'
          className='btn btn-primary'
          onClick={handleOpenModal}
          style={{cursor: 'pointer'}}
        >
          {/* <KTIcon iconName='plus' className='fs-2' /> */}
          Edit Committee
        </button>
        {isAddCommitteeeModalOpen && (
          <CommitteeForm show={true} onClose={handleCloseModal} />
        )}
      </div>
      <div className="row">
        {committees.map((committee, index) => (
          <div key={index} className="col-md-3 mb-3">
            <CommitteeCard {...committee} />
          </div>
        ))}
      </div>
    </>
    )
}

export {Committee}