import { useState, useRef, useCallback } from "react"
import type { AxiosInstance } from "axios"
import type { FetchState } from "react-component-form"

import type { CacheKey } from "../tools/cache"
import { getPaginationCache, savePaginationCache } from "../tools/cache"

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
  options: UsePaginationOptions,
): UsePaginationResult<T> => {
  const { api, url, inverse = false, cacheKey } = options

  const [items, setItems] = useState<T[]>([])
  const [hasMore, setHasMore] = useState(true)
  const fetchState = useRef<FetchState>("idle")
  const afterId = useRef<number | null>(null)

  const nextPageAsync: NextPageAsync = useCallback(
    async (query) => {
      if (fetchState.current !== "idle") {
        return
      }
      fetchState.current = "loading"
      const searchParameters = new URLSearchParams(query)
      searchParameters.append("limit", "20")
      if (afterId.current != null) {
        searchParameters.append("after", afterId.current.toString())
      }
      const { data: newItems } = await api.get<T[]>(
        `${url}?${searchParameters.toString()}`,
      )
      if (!inverse) {
        const endIndex = newItems.length - 1
        const lastItem = newItems[endIndex]
        afterId.current =
          newItems.length > 0 && lastItem != null ? lastItem.id : null
      } else {
        afterId.current =
          newItems.length > 0 && newItems[0] != null ? newItems[0].id : null
      }
      setItems((oldItems) => {
        const updatedItems = inverse
          ? [...newItems, ...oldItems]
          : [...oldItems, ...newItems]
        const unique = updatedItems.reduce<T[]>((accumulator, item) => {
          const isExisting = accumulator.some((itemSome) => {
            return itemSome.id === item.id
          })
          if (!isExisting) {
            accumulator.push(item)
          }
          return accumulator
        }, [])
        if (cacheKey != null) {
          savePaginationCache(cacheKey, unique)
        }
        return unique
      })
      setHasMore(newItems.length > 0)
      fetchState.current = "idle"
    },
    [api, url, inverse, cacheKey],
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
    [nextPageAsync],
  )

  const resetPagination = useCallback((): void => {
    if (cacheKey == null) {
      afterId.current = null
      setItems([])
    } else {
      fetchState.current = "loading"
      const newItems = getPaginationCache<T>(cacheKey)
      setItems(newItems)
      if (!inverse) {
        const endIndex = newItems.length - 1
        const lastItem = newItems[endIndex]
        afterId.current =
          newItems.length > 0 && lastItem != null ? lastItem.id : null
      } else {
        afterId.current =
          newItems.length > 0 && newItems[0] != null ? newItems[0].id : null
      }
      fetchState.current = "idle"
    }
  }, [cacheKey, inverse])

  return { items, hasMore, nextPage, resetPagination, setItems }
}
