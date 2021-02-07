import axios, { AxiosInstance } from 'axios'
import Cookies from 'universal-cookie'

import { API_URL } from 'utils/api'
import { COOKIE_MAX_AGE, Tokens } from '.'
import { fetchRefreshToken } from './authenticationFromServerSide'

const cookies = new Cookies()

export class Authentication {
  public tokens: Tokens
  public api: AxiosInstance
  public accessTokenAge: number

  constructor (tokens: Tokens) {
    this.tokens = tokens
    this.accessTokenAge = Date.now()
    this.api = axios.create({
      baseURL: API_URL,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    this.api.interceptors.request.use(
      async (config) => {
        const isValidAccessToken =
          this.accessTokenAge + tokens.expiresIn > Date.now()
        if (!isValidAccessToken) {
          const { accessToken } = await fetchRefreshToken(
            this.tokens.refreshToken
          )
          this.tokens.accessToken = accessToken
          this.accessTokenAge = Date.now()
        }
        config.headers.Authorization = `${this.tokens.type} ${this.tokens.accessToken}`
        return config
      },
      async (error) => {
        await this.signout(false)
        return await Promise.reject(error)
      }
    )
    this.api.interceptors.response.use(
      (response) => {
        return response
      },
      async (error) => {
        if (error.response.status !== 403 || error.config._retry as boolean) {
          return await Promise.reject(error)
        }
        error.config._retry = true
        try {
          const { accessToken } = await fetchRefreshToken(
            this.tokens.refreshToken
          )
          this.tokens.accessToken = accessToken
          this.accessTokenAge = Date.now()
          error.response.config.headers.Authorization = `${this.tokens.type} ${this.tokens.accessToken}`
          return await this.api.request(error.response.config)
        } catch {
          await this.signout(false)
          return await Promise.reject(error)
        }
      }
    )
  }

  async signout (shouldSignoutApiSide: boolean = true): Promise<void> {
    cookies.remove('refreshToken', { path: '/' })
    if (shouldSignoutApiSide) {
      await this.api.post('/users/signout', {
        refreshToken: this.tokens.refreshToken
      })
    }
    window.location.href = '/authentication/signin'
  }

  signin (): void {
    cookies.remove('refreshToken', { path: '/' })
    cookies.set('refreshToken', this.tokens.refreshToken, {
      path: '/',
      maxAge: COOKIE_MAX_AGE
    })
  }
}
