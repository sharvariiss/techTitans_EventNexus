import React from 'react';
import { useIntl } from 'react-intl';
import { KTIcon } from '../../../../helpers';
import { SidebarMenuItem } from './SidebarMenuItem';

const SidebarMenuMain = () => {
  const intl = useIntl();

  return (
    <>
      {/* <SidebarMenuItem
        to='/dashboard'
        icon='element-11'
        title={intl.formatMessage({ id: 'MENU.DASHBOARD' })}
        fontIcon='bi-app-indicator'
      /> */}
      {/* <SidebarMenuItem
        to='/rent-car'
        icon='element-11' 
        title='Rent Car'
        fontIcon='bi-app-indicator'
      /> */}
      <SidebarMenuItem
        to='/institute-setup'
        icon='element-11' 
        title='Setup'
        fontIcon='bi-app-indicator'
      />
      <SidebarMenuItem
        to='/committee'
        icon='element-11' 
        title='Committee'
        fontIcon='bi-app-indicator'
      />
      <SidebarMenuItem
        to='/create-event'
        icon='element-11' 
        title='Create Event'
        fontIcon='bi-app-indicator'
      />
      <SidebarMenuItem
        to='/advisory-board'
        icon='element-11' 
        title='Advisory Board'
        fontIcon='bi-app-indicator'
      />
      
        </>
        )
      }
      
export { SidebarMenuMain };