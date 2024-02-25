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
     
      <SidebarMenuItem
        to='/institute-profile'
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
        />
        <SidebarMenuItem
        to='/venuemanagement'
        icon='element-11' 
        title='Venue Management'
        fontIcon='bi-app-indicator'
      />
      <SidebarMenuItem
        to='/forstudents'
        icon='element-11' 
        title='Event Promotion & Participation'
        fontIcon='bi-app-indicator'
      />
      
        </>
        )
      }
      
export { SidebarMenuMain };