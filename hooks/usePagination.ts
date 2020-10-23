import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'

import { api } from 'utils/api'

type NextPage = () => Promise<void>

interface PaginationData<T> {
  totalItems: number
  hasMore: boolean
  rows: T[]
}

interface UsePaginationOptions {
  url: string
  itemsPerPage?: number
}

interface UsePaginationReturn<T> {
  data: PaginationData<T>
  nextPage: NextPage
  setData: Dispatch<SetStateAction<PaginationData<T>>>
  isLoading: boolean
}

const defaultPaginationData: PaginationData<any> = {
  totalItems: 0,
  hasMore: true,
  rows: []
}

export const usePagination = <T>(
  options: UsePaginationOptions
): UsePaginationReturn<T> => {
  const { url, itemsPerPage = 20 } = options

  const page = useRef(1)
  const [data, setData] = useState<PaginationData<T>>(defaultPaginationData)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    nextPage().catch(error => console.error(error))
  }, [])

  const nextPage: NextPage = async () => {
    setIsLoading(true)
    const { data: newData } = await api.get(
      `${url}?itemsPerPage=${itemsPerPage}&page=${page.current}`
    )
    setData({
      hasMore: newData.hasMore,
      totalItems: newData.totalItems,
      rows: [...data.rows, ...newData.rows]
    })
    setIsLoading(false)
    page.current += 1
  }

  return { data, setData, nextPage, isLoading }
}
