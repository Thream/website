import axios from 'axios'

export const API_VERSION = '1.0.0'

export const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080'

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})
