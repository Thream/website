import { useState, useRef, useCallback } from 'react'
import { AxiosInstance } from 'axios'

import { FetchState } from './useFetchState'

export interface Query {
  [key: string]: string
}
export type NextPageAsync = (query?: Query) => Promise<void>
export type NextPage = (query?: Query) => void

export interface UsePaginationOptions {
  api: AxiosInstance
  url: string
}

export interface UsePaginationResult<T> {
  items: T[]
  nextPage: NextPage
  resetPagination: () => void
  hasMore: boolean
}

export const usePagination = <T extends { id: number }>(
  options: UsePaginationOptions
): UsePaginationResult<T> => {
  const { api, url } = options

  const [items, setItems] = useState<T[]>([])
  const [hasMore, setHasMore] = useState(true)
  const fetchState = useRef<FetchState>('idle')
  const afterId = useRef<number | null>(null)

  const nextPageAsync: NextPageAsync = useCallback(
    async (query) => {
      if (fetchState.current !== 'idle') {
        return
      }
      fetchState.current = 'loading'
      const searchParameters = new URLSearchParams(query)
      searchParameters.append('limit', '20')
      if (afterId.current != null) {
        searchParameters.append('after', afterId.current.toString())
      }
      const { data: newItems } = await api.get<T[]>(
        `${url}?${searchParameters.toString()}`
      )
      afterId.current =
        newItems.length > 0 ? newItems[newItems.length - 1].id : null
      setItems((oldItems) => {
        return [...oldItems, ...newItems]
      })
      setHasMore(newItems.length > 0)
      fetchState.current = 'idle'
    },
    [api, url]
  )

  const nextPage: NextPage = useCallback(
    (query) => {
      nextPageAsync(query).catch((error) => {
        console.error(error)
      })
    },
    [nextPageAsync]
  )

  const resetPagination = useCallback((): void => {
    afterId.current = null
    setItems([])
  }, [])

  return { items, hasMore, nextPage, resetPagination }
}
