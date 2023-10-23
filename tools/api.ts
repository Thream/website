import axios from "axios"

export const API_VERSION = "1.2.9"

export const API_DEFAULT_PORT = 8080

export const API_URL =
  process.env["NEXT_PUBLIC_API_URL"] != null
    ? process.env["NEXT_PUBLIC_API_URL"]
    : `http://127.0.0.1:${API_DEFAULT_PORT}`

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
})
