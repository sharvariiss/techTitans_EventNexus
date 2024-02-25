import clsx from 'clsx'
import {KTIcon, toAbsoluteUrl} from '../../../helpers'
import {HeaderUserMenu} from '../../../partials'
import {useLayout} from '../../core'
import {useAuth} from '../../../../app/modules/auth'
import { NotificationMenu } from '../../../partials/layout/header-menus/NotificationMenu'

const itemClass = 'ms-1 ms-md-4'
const btnClass =
  'btn btn-icon btn-custom btn-icon-muted btn-active-light btn-active-color-primary w-35px h-35px'
const userAvatarClass = 'symbol-35px'
const btnIconClass = 'fs-2'

const Navbar = () => {
  const {currentUser, logout} = useAuth()
  const {config} = useLayout()
  return (
    <>
      <div
        className='app-navba mx-10'
        style={{display: 'flex', flexDirection: 'row', alignItems: 'right'}}
      >
        <div className='d-flex align-items-center'>
          {/* Text */}
          <div className='flex-grow-1'>
            <a href='#' className='text-dark fw-bold text-hover-primary fs-4'>
              Hello Emma Smith
            </a>
            <span className='text-muted d-block fw-bold'>Good Morning. Have a nice day !</span>
          </div>

          {/* Text */}
        </div>
      </div>

      <div
        className='app-navba flex-shrink-0 ms-auto mx-7'
        style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}
      >
        {/* <button
          type='button'
          className='btn btn-sm btn-icon btn-white border border-secondary border-2 fs-5'
          data-bs-toggle='tooltip'
          data-bs-placement='top'
          title='Notification'
        >
          <KTIcon iconName='notification' className='text-dark fs-2' />
        </button> */}

        {/* <div className='card-toolbar'>
          <button
            type='button'
            className='btn btn-sm btn-icon border border-secondary border-2 fs-5'
            data-kt-menu-trigger='click'
            data-kt-menu-placement='bottom-end'
          >
            <KTIcon iconName='notification' className='text-dark fs-2' />
          </button>
         <NotificationMenu />
        </div> */}

        <div className={clsx('app-navbar-item', itemClass)}>
          <div
            className={clsx('cursor-pointer symbol', userAvatarClass)}
            data-kt-menu-trigger="{default: 'click'}"
            data-kt-menu-attach='parent'
            data-kt-menu-placement='bottom-end'
          >
            <img
              src={toAbsoluteUrl('assets/media/avatars/300-3.jpg')}
              alt=''
              className='rounded-circle shadow-sm'
              style={{ width: '40px', height: '40px' }}
            />
          </div>
          <HeaderUserMenu />
        </div>
        {config.app?.header?.default?.menu?.display && (
          <div className='app-navbar-item d-lg-none ms-2 me-n3' title='Show header menu'>
            <div
              className='btn btn-icon btn-active-color-primary w-35px h-35px'
              id='kt_app_header_menu_toggle'
            >
              <KTIcon iconName='text-align-left' className={btnIconClass} />
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export {Navbar}