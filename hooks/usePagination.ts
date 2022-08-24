import { useState, useRef, useCallback } from 'react'
import { AxiosInstance } from 'axios'

import { FetchState } from './useFetchState'
import {
  CacheKey,
  getPaginationCache,
  savePaginationCache
} from '../tools/cache'

export interface Query {
  [key: string]: string
}
export type NextPageAsync = (query?: Query) => Promise<void>
export type NextPage = (query?: Query, callback?: () => void) => void

export interface UsePaginationOptions {
  api: AxiosInstance
  url: string
  inverse?: boolean
  cacheKey?: CacheKey
}

export interface PaginationItem {
  id: number
}

export type SetItems<T> = React.Dispatch<React.SetStateAction<T[]>>

export interface UsePaginationResult<T> {
  items: T[]
  nextPage: NextPage
  resetPagination: () => void
  hasMore: boolean
  setItems: SetItems<T>
}

export const usePagination = <T extends PaginationItem>(
  options: UsePaginationOptions
): UsePaginationResult<T> => {
  const { api, url, inverse = false, cacheKey } = options

  const [items, setItems] = useState<T[]>([])
  const [hasMore, setHasMore] = useState(true)
  const fetchState = useRef<FetchState>('idle')
  const afterId = useRef<number | null>(null)

  const updateAfterId = (newItems: T[]): void => {
    if (!inverse) {
      afterId.current =
        newItems.length > 0 ? newItems[newItems.length - 1].id : null
    } else {
      afterId.current = newItems.length > 0 ? newItems[0].id : null
    }
  }

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
      updateAfterId(newItems)
      setItems((oldItems) => {
        const updatedItems = inverse
          ? [...newItems, ...oldItems]
          : [...oldItems, ...newItems]
        if (cacheKey != null) {
          savePaginationCache(cacheKey, updatedItems)
        }
        return updatedItems
      })
      setHasMore(newItems.length > 0)
      fetchState.current = 'idle'
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps -- We don't want infinite loops with updateAfterId
    [api, url, inverse, cacheKey]
  )

  const nextPage: NextPage = useCallback(
    (query, callback) => {
      nextPageAsync(query)
        .then(() => {
          if (callback != null) {
            callback()
          }
        })
        .catch((error) => {
          console.error(error)
        })
    },
    [nextPageAsync]
  )

  const resetPagination = useCallback((): void => {
    if (cacheKey == null) {
      afterId.current = null
      setItems([])
    } else {
      const newItems = getPaginationCache<T>(cacheKey)
      setItems(newItems)
      updateAfterId(newItems)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps -- We don't want infinite loops with updateAfterId
  }, [cacheKey])

  return { items, hasMore, nextPage, resetPagination, setItems }
}
