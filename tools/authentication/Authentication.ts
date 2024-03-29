import type { AxiosInstance } from "axios"
import axios from "axios"
import type { Socket } from "socket.io-client"
import { io } from "socket.io-client"
import { isUnauthorizedError } from "@thream/socketio-jwt"

import { API_URL } from "../api"
import { cookies } from "../cookies"
import type { Tokens } from "."
import { fetchRefreshToken } from "./authenticationFromServerSide"
import { clearCache } from "../cache"

export class Authentication {
  public tokens: Tokens
  public accessTokenAge: number
  public socket?: Socket
  public api: AxiosInstance

  constructor(tokens: Tokens, disableSocketIO: boolean = false) {
    this.tokens = tokens
    this.accessTokenAge = Date.now()
    if (typeof window === "undefined" || disableSocketIO) {
      this.socket = undefined
    } else {
      this.socket = io(API_URL, {
        auth: { token: `Bearer ${tokens.accessToken}` },
      })
      this.socket.on("connect", () => {
        console.log(
          `Connected to socket with clientId: ${
            this.socket?.id ?? "undefined"
          }`,
        )
      })
      this.socket.on("connect_error", (error) => {
        if (isUnauthorizedError(error)) {
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
    }
    this.api = axios.create({
      baseURL: API_URL,
      headers: {
        "Content-Type": "application/json",
      },
    })
    this.api.interceptors.request.use(
      async (config) => {
        const isValidAccessToken =
          this.accessTokenAge + tokens.expiresIn > Date.now()
        if (!isValidAccessToken) {
          const { accessToken } = await fetchRefreshToken(
            this.tokens.refreshToken,
          )
          this.setAccessToken(accessToken)
        }
        config.headers.Authorization = `${this.tokens.type} ${this.tokens.accessToken}`
        return config
      },
      async (error) => {
        this.signout()
        return await Promise.reject(error)
      },
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
            this.tokens.refreshToken,
          )
          this.setAccessToken(accessToken)
          error.response.config.headers.Authorization = `${this.tokens.type} ${this.tokens.accessToken}`
          return await this.api.request(error.response.config)
        } catch {
          this.signout()
          return await Promise.reject(error)
        }
      },
    )
  }

  public setAccessToken(accessToken: string): void {
    this.tokens.accessToken = accessToken
    this.accessTokenAge = Date.now()
    const token = `${this.tokens.type} ${this.tokens.accessToken}`
    if (typeof this?.socket?.auth !== "function" && this.socket != null) {
      this.socket.auth["token"] = token
    }
  }

  public signout(): void {
    cookies.remove("refreshToken")
    clearCache()
    window.location.href = "/authentication/signin"
  }

  public async signoutServerSide(): Promise<void> {
    try {
      await this.api.post("/users/signout", {
        refreshToken: this.tokens.refreshToken,
      })
    } catch {}
    this.signout()
  }

  public async signoutAllDevicesServerSide(): Promise<void> {
    try {
      await this.api.delete("/users/signout")
    } catch {}
    this.signout()
  }

  public signin(): void {
    clearCache()
    cookies.set("refreshToken", this.tokens.refreshToken)
  }
}
