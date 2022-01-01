import axios, { AxiosInstance } from 'axios'
import { io, Socket } from 'socket.io-client'

import { API_URL } from '../api'
import { cookies } from '../cookies'
import { Tokens } from '.'
import { fetchRefreshToken } from './authenticationFromServerSide'

export class Authentication {
  public tokens: Tokens
  public accessTokenAge: number
  public socket: Socket
  public api: AxiosInstance

  constructor(tokens: Tokens) {
    this.tokens = tokens
    this.accessTokenAge = Date.now()
    this.socket = io(API_URL, {
      auth: { token: `Bearer ${tokens.accessToken}` }
    })
    this.socket.on('connect_error', (error) => {
      if (error.message.startsWith('Unauthorized')) {
        fetchRefreshToken(this.tokens.refreshToken)
          .then(({ accessToken }) => {
            this.setAccessToken(accessToken)
          })
          .catch(async () => {
            this.signout()
            return await Promise.reject(error)
          })
      }
    })
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
          this.setAccessToken(accessToken)
        }
        config.headers = config.headers == null ? {} : config.headers
        config.headers.Authorization = `${this.tokens.type} ${this.tokens.accessToken}`
        return config
      },
      async (error) => {
        this.signout()
        return await Promise.reject(error)
      }
    )
    this.api.interceptors.response.use(
      (response) => {
        return response
      },
      async (error) => {
        if (error.response.status !== 403 || (error.config._retry as boolean)) {
          return await Promise.reject(error)
        }
        error.config._retry = true
        try {
          const { accessToken } = await fetchRefreshToken(
            this.tokens.refreshToken
          )
          this.setAccessToken(accessToken)
          error.response.config.headers.Authorization = `${this.tokens.type} ${this.tokens.accessToken}`
          return await this.api.request(error.response.config)
        } catch {
          this.signout()
          return await Promise.reject(error)
        }
      }
    )
  }

  public setAccessToken(accessToken: string): void {
    this.tokens.accessToken = accessToken
    this.accessTokenAge = Date.now()
    const token = `${this.tokens.type} ${this.tokens.accessToken}`
    if (typeof this.socket.auth !== 'function') {
      this.socket.auth.token = token
    }
  }

  public signout(): void {
    cookies.remove('refreshToken')
    window.location.href = '/authentication/signin'
  }

  public async signoutServerSide(): Promise<void> {
    await this.api.post('/users/signout', {
      refreshToken: this.tokens.refreshToken
    })
    this.signout()
  }

  public signin(): void {
    cookies.set('refreshToken', this.tokens.refreshToken)
  }
}
