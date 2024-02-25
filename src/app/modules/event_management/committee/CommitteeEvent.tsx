// This is navbar of leaves
import React,{useState} from 'react';
import ApprovedEvents from './components/ApprovedEvents';
import RejectedEvents from './components/RejectedEvents';
import PendingEvents from './components/PendingEvents';
import { CreateEventForm } from './components/CreateEventForm';


const CommitteeEvent = () => {
    const [activeNavItem, setActiveNavItem] = useState<string>('Approved')

    const handleNavItemClick = (itemName: string) => {
        setActiveNavItem(itemName)
        // You can implement logic to display the corresponding components based on the clicked item here.
      }

      const [isCreateEventModalOpen, setIsCreateEventModalOpen] = useState(false)

  const handleOpenModal = () => {
    setIsCreateEventModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsCreateEventModalOpen(false)
  }

  return (
    <>
     <div id='kt_app_content' className='app-content flex-column-fluid bg-white rounded'>
      <div id='kt_app_content_container' className='app-container container-xxl'>
        <div className='d-flex flex-column flex-xl-row'>
        <div className='flex-lg-row-fluid ms-lg-5'>
            <div className='card-rounded d-flex flex-stack flex-wrap mb-5'>
            
              <ul className='nav flex-wrap border-transparent fw-bold'>
                {['Approved', 'Rejected', 'Pending'].map((item) => (
                  <li className='nav-item my-1' key={item}>
                    <button
                      className={`btn btn-color-gray-600 btn-active-color-primary fw-bolder fs-8 fs-lg-base nav-link px-3 px-lg-8 mx-1 text-uppercase ${
                        activeNavItem === item ? 'active' : ''
                      } rounded-0`}
                      onClick={() => handleNavItemClick(item)}
                      style={{
                        borderBottom: activeNavItem === item ? '2px solid #007BFF' : 'none',
                      }}
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
              <button
          type='button'
          className='btn btn-primary mx-10 my-4'
          onClick={handleOpenModal}
          style={{cursor: 'pointer'}}
        >
          {/* <KTIcon iconName='plus' className='fs-2' /> */}
          Create Event
        </button>
        {isCreateEventModalOpen && (
          <CreateEventForm show={true} onClose={handleCloseModal} />
        )}
            </div>
            {/* Conditional rendering based on the selected item */}
            {activeNavItem === 'Approved' && <ApprovedEvents />}
            {activeNavItem === 'Rejected' && <RejectedEvents />}
            {activeNavItem === 'Pending' && <PendingEvents />}

            {/* Add similar lines for other components */}
          </div>

            </div>
            </div>
            </div>
    </>
  );
};

export { CommitteeEvent };
