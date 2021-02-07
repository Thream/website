import { createContext, useState, useEffect, useMemo, useContext } from 'react'

import {
  Authentication,
  PagePropsWithAuthentication,
  User,
  UserSettings
} from '.'
import { useTheme } from 'contexts/Theme'

export interface AuthenticationValue {
  authentication: Authentication
  user: User
  settings: UserSettings
}

const defaultAnthenticationContext: AuthenticationValue = {} as any
const AuthenticationContext = createContext<AuthenticationValue>(
  defaultAnthenticationContext
)

export const AuthenticationProvider: React.FC<PagePropsWithAuthentication> = (
  props
) => {
  const { theme, setTheme } = useTheme()
  const [user] = useState<User>(props.authentication.user)
  const [settings] = useState<UserSettings>(props.authentication.settings)

  const authentication = useMemo(() => {
    return new Authentication(props.authentication.tokens)
  }, [props.authentication.tokens])

  useEffect(() => {
    setTheme(settings.theme)
  }, [])

  useEffect(() => {
    authentication.api.put('/users/current/settings', { theme }).catch(() => {})
  }, [theme])

  return (
    <AuthenticationContext.Provider value={{ authentication, user, settings }}>
      {props.children}
    </AuthenticationContext.Provider>
  )
}

export const useAuthentication = (): AuthenticationValue => {
  return useContext(AuthenticationContext)
}
