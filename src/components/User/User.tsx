import React from 'react'

export interface UserProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  sender: string
  postCount: number,
  incommingclassName:string
}

export const User: React.FC<UserProps> = (props) => {
  const { style, postCount = 0, sender,incommingclassName, ...rest } = props

  return (
    <div
      style={{
        ...style,
      }}
      className={incommingclassName}
      {...rest}>
        <span aria-label='sender name'>{sender}</span>
        <div style={{ flexGrow: 1 }} />
        <span aria-label='sender post count'>{postCount}</span>
    </div>
  )
}

export default User
