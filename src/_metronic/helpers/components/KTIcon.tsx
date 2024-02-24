import React from 'react'
import icons from '../icons-config/icons'
import {getLayoutFromLocalStorage} from '../../layout/core'

type Props = {
  className?: string
  iconType?: 'duotone' | 'solid' | 'outline'
  iconName: string
  onClick?: () => void;
  style?: React.CSSProperties; 
}

const KTIcon: React.FC<Props> = ({className = '', iconType, iconName,onClick}) => {
  if (!iconType) {
    iconType = getLayoutFromLocalStorage().main?.iconType
  }

  return (
    <i className={`ki-${iconType} ki-${iconName}${className && ' ' + className}`}onClick={onClick}>
      {iconType === 'duotone' &&
        [...Array(icons[iconName])].map((e, i) => {
          return (
            <span
              key={`${iconType}-${iconName}-${className}-path-${i + 1}`}
              className={`path${i + 1}`}
            ></span>
          )
        })}
    </i>
  )
}

export {KTIcon}
