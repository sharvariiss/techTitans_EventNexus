import { useState } from "react"
import { KTIcon } from "../../../_metronic/helpers"
import { RentedCarTable } from "./RentedCarTable"
import { RentCarForm } from "./RentCarForm"

const RentCar = () => {
    const [isAddRoleModalOpen, setIsAddRoleModalOpen] = useState(false)

  const handleOpenModal = () => {
    setIsAddRoleModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsAddRoleModalOpen(false)
  }
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
          Rent Car
        </button>
        {isAddRoleModalOpen && (
          <RentCarForm show={true} onClose={handleCloseModal} />
        )}
      </div>
      <RentedCarTable />
        </>
    )
}

export {RentCar}