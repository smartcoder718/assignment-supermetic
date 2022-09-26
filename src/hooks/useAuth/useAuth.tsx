import React from 'react'
import useSession from 'hooks/useSession/useSession'

export interface User {
  name: string
  email: string
}

export interface RegisteredUser extends User {
  sl_token: string
  client_id: string
}

interface AuthContextProps extends UseAuthReturn {}
const UserContext = React.createContext<AuthContextProps | undefined>(undefined)

export interface AuthProviderProps extends UseAuthReturn {}
export const AuthProvider: React.FC<AuthProviderProps> = (props) => {
  const { children, ...rest } = props
  return <UserContext.Provider value={rest}>{children}</UserContext.Provider>
}

export interface UseAuthContextReturn extends AuthContextProps {}
export type UseAuthContext = () => AuthContextProps
export const useAuthContext: UseAuthContext = () => {
  const context = React.useContext(UserContext)
  if (context === undefined) {
    throw new Error('useAuthContext must be used within a AuthProvider')
  }

  return context
}

interface HTTPRequestBody extends User {
  client_id: string
}

interface HTTPResponseBody extends APIResponseBody<Omit<RegisteredUser, 'name'>> {}
export interface RegisterUserOptions extends User {}
export type RegisterUserFn = (options: RegisterUserOptions) => Promise<RegisteredUser | null>
export type UseAuthReturn = {
  user: RegisteredUser | null
  registerUser: RegisterUserFn
  clearUser: () => void
}
export type UseAuth = () => UseAuthReturn

const API_REGISTER_URI = 'https://api.supermetrics.com/assignment/register'

export const useAuth: UseAuth = () => {
  const [user, setUser] = useSession<RegisteredUser | null>('user', null)
  const registerUser: RegisterUserFn = React.useCallback(
    async ({ name, email }) => {
      const response = await fetch<HTTPResponseBody, HTTPRequestBody>(API_REGISTER_URI, {
        method: 'post',
        headers: {
          'content-type': 'application/json;charset=UTF-8',
        },
        body: JSON.stringify({
          email,
          name,
          client_id: 'ju16a6m81mhid5ue1z3v2g0uh',
        }),
      })
      const body = await response.json()

      if (response.ok && body.data) {
        const registeredUser: RegisteredUser = {
          ...body.data,
          name,
        }
        setUser(registeredUser)

        return registeredUser
      }

      return null
    },
    [setUser]
  )

  const clearUser = React.useCallback(() => {
    setUser(null)
  }, [setUser])

  return { user, registerUser, clearUser }
}

export default useAuth
