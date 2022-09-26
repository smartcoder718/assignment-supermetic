import LoginForm, { LoginFormSubmitHandler } from 'components/LoginForm'
import Box from 'components/Box'
import { useAuthContext } from 'hooks/useAuth'
import React from 'react'
import { useNavigate } from 'react-router-dom'

export interface LoginProps {}

export const Login: React.VFC<LoginProps> = (props) => {
  const navigate = useNavigate()
  const { registerUser, user } = useAuthContext()

  const handeOnSubmit: LoginFormSubmitHandler = async ({ name, email }) => {
    await registerUser({ name, email })
  }

  React.useEffect(() => {
    if (user) {
      navigate('/')
    }
  }, [user, navigate])

  return (
    <Box style={{ justifyContent: 'center', height: '100vh', alignContent: 'center' }}>
      <div style={{ backgroundColor: 'whitesmoke', padding: '15px 64px', justifyContent:'center' , borderRadius:'10px'}}>
        <h1 style={{textAlign:'center', marginBottom: '10px' }}>Login</h1>
        <LoginForm onSubmit={handeOnSubmit} />
      </div>
    </Box>
  )
}

export default Login
