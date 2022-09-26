import React from 'react'

export type UseSessionStorageReturn<T = unknown> = [T, React.Dispatch<React.SetStateAction<T>>]
export type useSession<T = unknown> = (key: string, defaultValue: T) => UseSessionStorageReturn<T>
export function useSession<T = unknown>(key: string, defaultValue: T): UseSessionStorageReturn<T> {
  const [value, setValue] = React.useState<T>(JSON.parse(sessionStorage.getItem(key) || JSON.stringify(defaultValue)))

  React.useEffect(() => {
    sessionStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue]
}

export default useSession
