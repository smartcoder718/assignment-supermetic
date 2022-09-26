import React from 'react'

export interface ContainerProps {}

export const Container: React.FC<ContainerProps> = (props) => {
  const { children } = props

  return <main className='Application_Container'>{children}</main>
}

export default Container
