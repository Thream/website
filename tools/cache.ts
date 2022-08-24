import { PaginationItem } from '../hooks/usePagination'

export const GUILDS_CACHE_KEY = 'guilds' as const
export const CHANNELS_CACHE_KEY = 'channels' as const
export const MEMBERS_CACHE_KEY = 'members' as const
export const MESSAGES_CACHE_KEY = 'messages' as const

export type CacheKey =
  | typeof GUILDS_CACHE_KEY
  | `${number}-${typeof CHANNELS_CACHE_KEY}`
  | `${number}-${typeof MEMBERS_CACHE_KEY}`
  | `${number}-${typeof MESSAGES_CACHE_KEY}`

export const getPaginationCache = <T extends PaginationItem>(
  key: CacheKey
): T[] => {
  const cache = localStorage.getItem(key)
  if (cache != null) {
    try {
      const data = JSON.parse(cache)
      if (Array.isArray(data)) {
        return data
      }
    } catch {}
  }
  return []
}

export const savePaginationCache = <T extends PaginationItem>(
  key: CacheKey,
  data: T[]
): void => {
  localStorage.setItem(key, JSON.stringify(data))
}
