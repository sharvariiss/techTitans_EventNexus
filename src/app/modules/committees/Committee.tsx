import { useState } from "react"
import { KTIcon } from "../../../_metronic/helpers"
import { RentedCarTable } from "../rent_car/RentedCarTable"
import { CommitteeForm } from "./CommitteeForm"
import CommitteeCard from "./CommitteeCard"

const Committee = () => {
  
  const committees = [
    { name: 'XYZ Committee', department: 'ABC Department',  contactInfo: '1234567895' },
    { name: 'XYZ Committee', department: 'ABC Department',  contactInfo: '1234567890' },
    { name: 'XYZ Committee', department: 'ABC Department',  contactInfo: '1234565890' },
    { name: 'XYZ Committee', department: 'ABC Department', contactInfo: '1234567890' },
    { name: 'XYZ Committee', department: 'ABC Department',  contactInfo: '1234567890' },
    
    
  ];
    return (
        <>
        
      <div className="row">
        {committees.map((committee, index) => (
          <div key={index} className="col-md-3 mb-7">
            <CommitteeCard {...committee} />
          </div>
        ))}
      </div>
    </>
    )
}

export {Committee}