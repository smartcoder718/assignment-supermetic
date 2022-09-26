import React from 'react'

export interface BoxProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export const Box: React.FC<BoxProps> = (props) => {
  const { children, className: incomingClassName, ...rest } = props

  let className = 'Application_Box'
  if (incomingClassName) className.concat(' ', incomingClassName)

  return (
    <div className={className} {...rest}>
      {children}
    </div>
  )
}

export default Box
