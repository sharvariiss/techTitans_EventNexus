import React from 'react';
import { KTIcon } from '../../../_metronic/helpers';

interface CommitteeCardProps {
  name: string;
  department: string;
  contactInfo: string;
}

const CommitteeCard: React.FC<CommitteeCardProps> = ({ name, department, contactInfo }) => {
  
  return (
    <div
      className="card"
      style={{
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', 
        transition: 'box-shadow 0.3s', 
        borderRadius: '8px', 
        cursor: 'pointer', 
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 8px 12px rgba(0, 0, 0, 0.2)'; // Increase box shadow on hover
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)'; // Restore original box shadow on mouse leave
      }}
    >
        <div className="card-body">
        <h5 className="card-title">Name: {name}</h5>
        <div style={{ display: 'flex', alignItems: 'center' }}>
        <KTIcon iconName='yii' className='fs-2' /> {/* Department icon */}
          <p className="card-text">Department: {department}</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
        <KTIcon iconName='phone' className='fs-2' /> {/* Contact icon */}
          <p className="card-text">Contact: {contactInfo}</p>
          
        </div>
      </div>
    </div>
  );
};

export default CommitteeCard;
