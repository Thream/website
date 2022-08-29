import axios from 'axios'

export const API_VERSION = '1.2.0'

export const API_DEFAULT_PORT = 8080

export const API_URL =
  process.env.NEXT_PUBLIC_API_URL != null
    ? process.env.NEXT_PUBLIC_API_URL
    : `http://localhost:${API_DEFAULT_PORT}`

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})
