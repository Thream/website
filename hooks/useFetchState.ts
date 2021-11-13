import { useState } from 'react'

export const fetchState = ['idle', 'loading', 'error', 'success'] as const

export type FetchState = typeof fetchState[number]

export const useFetchState = (
  initialFetchState: FetchState = 'idle'
): [
  fetchState: FetchState,
  setFetchState: React.Dispatch<React.SetStateAction<FetchState>>
] => {
  const [fetchState, setFetchState] = useState<FetchState>(initialFetchState)
  return [fetchState, setFetchState]
}
