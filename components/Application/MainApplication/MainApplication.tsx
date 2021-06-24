import React from 'react'
import { SwipeableHandlers } from 'react-swipeable'

export interface MainApplicationProps
  extends React.ComponentPropsWithoutRef<'main'> {
  swipeableHandlers: SwipeableHandlers
}

export const MainApplication: React.FC<MainApplicationProps> = (props) => {
  const { children, swipeableHandlers, ...rest } = props

  return (
    <main
      className='h-full-without-header overflow-hidden'
      {...swipeableHandlers}
      {...rest}
    >
      <div className='relative md:flex'>{children}</div>
    </main>
  )
}
