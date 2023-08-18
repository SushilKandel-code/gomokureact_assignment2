import { memo } from 'react'
import { STATUS } from '../constants'
import style from './Stone.module.css'
import React from 'react'

const getClassNames = (status: STATUS) => {
  const className = style.stone
  switch (status) {
    case STATUS.Player1_Selected:
      return `${className} ${style.black}`
    case STATUS.Player2_Selected:
      return `${className} ${style.white}`
    default:
      return className
  }
}

type StoneProps = {
  row: number
  column: number
  status: STATUS
  order: number
  onClick: (position: [number, number]) => void
  readonly: boolean
}

export default memo(function Stone({
  row,
  column,
  status,
  order,
  onClick,
  readonly,
}: StoneProps) {
  const handleClick = () => {
    if (status === STATUS.empty && !readonly) {
      onClick([row, column])
    }
  }

  return (
    <div className={getClassNames(status)} onClick={handleClick}>
      {order && readonly ? order : undefined}
    </div>
  )
})
