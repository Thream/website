import { createContext, useState, useEffect, useMemo, useContext } from 'react'
import { useTheme } from 'next-themes'
import useTranslation from 'next-translate/useTranslation'
import setLanguage from 'next-translate/setLanguage'

import { Authentication, PagePropsWithAuthentication } from './'
import { UserCurrent } from '../../models/User'

export interface AuthenticationValue {
  authentication: Authentication
  user: UserCurrent
}

const defaultAnthenticationContext: AuthenticationValue = {} as any
const AuthenticationContext = createContext<AuthenticationValue>(
  defaultAnthenticationContext
)

export const AuthenticationProvider: React.FC<PagePropsWithAuthentication> = (
  props
) => {
  const { lang } = useTranslation()
  const { theme, setTheme } = useTheme()
  const [user] = useState<UserCurrent>(props.authentication.user)

  const authentication = useMemo(() => {
    return new Authentication(props.authentication.tokens)
  }, [props.authentication.tokens])

  useEffect(() => {
    setLanguage(user.settings.language).catch(() => {})
    setTheme(user.settings.theme)
  }, [setTheme, user.settings.language, user.settings.theme])

  useEffect(() => {
    authentication.api.put('/users/current/settings', { theme }).catch(() => {})
  }, [theme, authentication.api])

  useEffect(() => {
    authentication.api
      .put('/users/current/settings', { language: lang })
      .catch(() => {})
  }, [lang, authentication.api])

  return (
    <AuthenticationContext.Provider value={{ authentication, user }}>
      {props.children}
    </AuthenticationContext.Provider>
  )
}

export const useAuthentication = (): AuthenticationValue => {
  return useContext(AuthenticationContext)
}
