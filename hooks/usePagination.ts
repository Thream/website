import { AxiosInstance } from 'axios'
import { useRef, useState } from 'react'
import { uniqBy } from 'lodash'

export type NextPage = () => Promise<void>

export interface PaginationData<T> {
  page: number
  itemsPerPage: number
  totalItems: number
  hasMore: boolean
  rows: T[]
}

interface UsePaginationOptions {
  api: AxiosInstance
  url: string
  defaultPaginationData?: PaginationData<any>
  inverse?: boolean
}

export type SetData<T> = React.Dispatch<React.SetStateAction<PaginationData<T>>>

interface UsePaginationReturn<T> {
  data: PaginationData<T>
  nextPage: NextPage
  setData: SetData<T>
  isLoading: boolean
}

const defaultData: PaginationData<any> = {
  page: 0,
  itemsPerPage: 20,
  totalItems: 0,
  hasMore: true,
  rows: []
}

export const usePagination = <T>(
  options: UsePaginationOptions
): UsePaginationReturn<T> => {
  const {
    api,
    url,
    defaultPaginationData = defaultData,
    inverse = false
  } = options

  const page = useRef(defaultPaginationData.page + 1)
  const [data, setData] = useState<PaginationData<T>>(defaultPaginationData)
  const [isLoading, setIsLoading] = useState(false)

  const nextPage: NextPage = async () => {
    if (isLoading) {
      return
    }
    setIsLoading(true)
    const { data: newData } = await api.get<PaginationData<T>>(
      `${url}?itemsPerPage=${defaultPaginationData.itemsPerPage}&page=${page.current}`
    )
    const rows = inverse
      ? [...newData.rows, ...data.rows]
      : [...data.rows, ...newData.rows]
    setData({
      page: page.current,
      itemsPerPage: defaultPaginationData.itemsPerPage,
      hasMore: newData.hasMore,
      totalItems: newData.totalItems,
      rows: uniqBy(rows, 'id')
    })
    setIsLoading(false)
    page.current += 1
  }

  return { data, setData, nextPage, isLoading }
}
