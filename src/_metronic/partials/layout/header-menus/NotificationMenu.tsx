import React from 'react';
import { KTIcon } from '../../../helpers';

const NotificationMenu = () => {
  return (
    <div className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg-light-primary fw-semibold w-400px' data-kt-menu='true'>
      {/* Menu item */}
      <div className="card card-xl-stretch">
        {/* Header */}
        <div className="card-header border-0">
          <h3 className="card-title fw-bold text-dark">Notifications</h3>
          <div className="card-toolbar">
            {/* Menu */}
            {/* Add your menu items or components here */}
            {/* End Menu */}
          </div>
        </div>
        {/* End Header */}
        {/* Body */}
        <div className="card-body pt-0">
          {/* Item 1 */}
          <div className="d-flex align-items-center bg-light-warning rounded p-5 mb-7">
            <i className="ki-duotone ki-abstract-26 text-warning fs-1 me-5">
              <span className="path1"></span>
              <span className="path2"></span>
            </i>
            {/* Title */}
            <div className="flex-grow-1 me-2">
              <a href="#" className="fw-bold text-gray-800 text-hover-primary fs-6">
                Group lunch celebration
              </a>
              <span className="text-muted fw-semibold d-block">Due in 2 Days</span>
            </div>
            {/* End Title */}
            {/* Label */}
            <span className="fw-bold text-warning py-1">+28%</span>
            {/* End Label */}
          </div>
          {/* End Item 1 */}
          {/* Item 2 */}
          <div className="d-flex align-items-center bg-light-success rounded p-5 mb-7">
            <i className="ki-duotone ki-abstract-26 text-success fs-1 me-5">
              <span className="path1"></span>
              <span className="path2"></span>
            </i>
            {/* Title */}
            <div className="flex-grow-1 me-2">
              <a href="#" className="fw-bold text-gray-800 text-hover-primary fs-6">
                Navigation optimization
              </a>
              <span className="text-muted fw-semibold d-block">Due in 2 Days</span>
            </div>
            {/* End Title */}
            {/* Label */}
            <span className="fw-bold text-success py-1">+50%</span>
            {/* End Label */}
          </div>
          {/* End Item 2 */}
          {/* Item 3 */}
          <div className="d-flex align-items-center bg-light-danger rounded p-5 mb-7">
            <i className="ki-duotone ki-abstract-26 text-danger fs-1 me-5">
              <span className="path1"></span>
              <span className="path2"></span>
            </i>
            {/* Title */}
            <div className="flex-grow-1 me-2">
              <a href="#" className="fw-bold text-gray-800 text-hover-primary fs-6">
                Rebrand strategy planning
              </a>
              <span className="text-muted fw-semibold d-block">Due in 5 Days</span>
            </div>
            {/* End Title */}
            {/* Label */}
            <span className="fw-bold text-danger py-1">-27%</span>
            {/* End Label */}
          </div>
          {/* End Item 3 */}
          {/* Item 4 */}
          <div className="d-flex align-items-center bg-light-info rounded p-5">
            <i className="ki-duotone ki-abstract-26 text-info fs-1 me-5">
              <span className="path1"></span>
              <span className="path2"></span>
            </i>
            {/* Title */}
            <div className="flex-grow-1 me-2">
              <a href="#" className="fw-bold text-gray-800 text-hover-primary fs-6">
                Product goals strategy
              </a>
              <span className="text-muted fw-semibold d-block">Due in 7 Days</span>
            </div>
            {/* End Title */}
            {/* Label */}
            <span className="fw-bold text-info py-1">+8%</span>
            {/* End Label */}
          </div>
          {/* End Item 4 */}
        </div>
        {/* End Body */}
      </div>
      {/* Menu item */}
    </div>
  );
};

export {NotificationMenu}
