import { createContext, useState, useEffect, useMemo, useContext } from 'react'
import { useTheme } from 'next-themes'
import setLanguage from 'next-translate/setLanguage'
import useTranslation from 'next-translate/useTranslation'

import type { PagePropsWithAuthentication } from '.'
import { Authentication } from '.'
import type { UserCurrent } from '../../models/User'

export interface AuthenticationValue {
  authentication: Authentication
  user: UserCurrent
  setUser: React.Dispatch<React.SetStateAction<UserCurrent>>
}

const defaultAuthenticationContext: AuthenticationValue = {} as any
const AuthenticationContext = createContext<AuthenticationValue>(
  defaultAuthenticationContext
)

export const AuthenticationProvider: React.FC<
  React.PropsWithChildren<PagePropsWithAuthentication>
> = (props) => {
  const { lang } = useTranslation()
  const { theme, setTheme } = useTheme()
  const [user, setUser] = useState<UserCurrent>(props.authentication.user)

  const authentication = useMemo(() => {
    return new Authentication(props.authentication.tokens)

    // eslint-disable-next-line react-hooks/exhaustive-deps -- We only want to run this memo once
  }, [])

  useEffect(() => {
    setLanguage(props.authentication.user.settings.language).catch(() => {})
    setTheme(props.authentication.user.settings.theme)
    return () => {
      authentication?.socket?.disconnect()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- We only want to run this effect once
  }, [])

  useEffect(() => {
    authentication.api
      .put('/users/current/settings', { theme, language: lang })
      .then(({ data: userCurrentSettings }) => {
        setUser((oldUser) => {
          return {
            ...oldUser,
            settings: {
              ...oldUser.settings,
              ...userCurrentSettings.settings
            }
          }
        })
      })
      .catch(() => {})
  }, [theme, lang, authentication.api])

  return (
    <AuthenticationContext.Provider value={{ authentication, user, setUser }}>
      {props.children}
    </AuthenticationContext.Provider>
  )
}

export const useAuthentication = (): AuthenticationValue => {
  return useContext(AuthenticationContext)
}
