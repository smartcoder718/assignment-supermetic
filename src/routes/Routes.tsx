import useAuth, { AuthProvider } from 'hooks/useAuth'
import Home from 'pages/Home'
import Login from 'pages/Login'
import React from 'react'
import { Route, Routes as ReactRoutes, useNavigate } from 'react-router-dom'

export const Routes = () => {
  const useAuthProps = useAuth()
  const { user } = useAuthProps
  const navigate = useNavigate()

  React.useEffect(() => {
    if (!user) navigate('/login')
  }, [navigate, user])

  return (
    <AuthProvider {...useAuthProps}>
      <ReactRoutes>
        <Route path='' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='*' element={<p>Not found!</p>} />
      </ReactRoutes>
    </AuthProvider>
  )
}

export default Routes
