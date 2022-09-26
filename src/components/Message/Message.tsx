import Box, { BoxProps } from 'components/Box'
import React from 'react'

export interface MessageProps extends BoxProps {
  post: Post
}

export const Message: React.FC<MessageProps> = (props) => {
  const { post } = props

  return (
    <Box
      style={{
        flexFlow: 'column',
        backgroundColor: 'whitesmoke',
        // marginTop: '1rem',
        padding: '8px',
      }}>
      <div style={{ borderBottom: '3px solid lightgray' }}>{new Date(post.created_time).toLocaleString()}</div>
      <div>{post.message}</div>
    </Box>
  )
}

export default Message
