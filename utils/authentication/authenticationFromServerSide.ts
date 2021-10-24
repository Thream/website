import { AxiosInstance } from 'axios'
import { GetServerSideProps, GetServerSidePropsContext, Redirect } from 'next'

import { api } from 'utils/api'
import { Cookies } from 'utils/cookies'
import { RefreshTokenResponse, Tokens } from './index'
import { Authentication } from './Authentication'

export const fetchRefreshToken = async (
  refreshToken: string
): Promise<Tokens> => {
  const { data } = await api.post<RefreshTokenResponse>(
    '/users/refresh-token',
    {
      refreshToken
    }
  )
  return { ...data, refreshToken }
}

interface AuthenticationFromServerSideOptions {
  shouldBeAuthenticated: boolean

  /** allows to fetch data server side with the authenticated user, the callback should returns the data that will be transfer to the component as props */
  fetchData?: (
    context: GetServerSidePropsContext,
    api?: AxiosInstance
  ) => Promise<{ [key: string]: any }>
}

export const authenticationFromServerSide = (
  options: AuthenticationFromServerSideOptions
): GetServerSideProps => {
  const { shouldBeAuthenticated, fetchData } = options

  return async (context) => {
    const cookies = new Cookies(context.req.headers.cookie)
    const refreshToken = cookies.get('refreshToken')
    let tokens: Tokens | null = null
    if (refreshToken != null) {
      try {
        tokens = await fetchRefreshToken(refreshToken)
      } catch {
        cookies.remove('refreshToken')
      }
    }
    if (!shouldBeAuthenticated) {
      if (tokens != null) {
        return {
          redirect: {
            destination: '/application',
            permanent: false
          }
        }
      } else {
        let data = {}
        if (fetchData != null) {
          data = await fetchData(context)
        }
        return { props: { ...data } }
      }
    } else {
      if (tokens == null) {
        return {
          redirect: {
            destination: '/authentication/signin',
            permanent: false
          }
        }
      } else {
        let data: Redirect | any = {}
        const authentication = new Authentication(tokens)
        const { data: currentUser } = await authentication.api.get(
          '/users/current'
        )
        if (fetchData != null) {
          data = await fetchData(context, authentication.api)
        }
        if (data.redirect != null) {
          return data
        }
        return {
          props: { authentication: { tokens, ...currentUser }, ...data }
        }
      }
    }
  }
}
