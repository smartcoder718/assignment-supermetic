import Box from 'components/Box'
import { User } from 'hooks/useAuth'
import React from 'react'

export type LoginFormSubmitHandler = (user: User) => void
export interface LoginFormProps
  extends Omit<React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>, 'onSubmit'> {
  onSubmit?: LoginFormSubmitHandler
}

export const LoginForm: React.VFC<LoginFormProps> = (props) => {
  const { onSubmit, ...rest } = props

  const handeOnSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const name = formData.get('name') as string | null
    const email = formData.get('email') as string | null

    if (email && name) onSubmit && onSubmit({ email, name })
  }

  return (
    <form id='login-form' onSubmit={handeOnSubmit} {...rest}>
      <Box>
        <label id='form-name-label' htmlFor='form-name'>
          Name
        </label>
      </Box>
      <Box>
        <input id='form-name' name='name' />
      </Box>
      <Box>
        <label id='form-email-label' htmlFor='form-email'>
          Email
        </label>
     </Box>
      <Box>
        <input id='form-email' name='email' />
      </Box>
      <Box style={{    
             justifyContent: 'flex-end',
             marginTop: '15px'}}>
        <button type='submit'>Submit</button>
      </Box>
    </form>
  )
}

export default LoginForm
