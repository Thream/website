import { SetData } from 'hooks/usePagination'

export interface Item {
  id: number
  [key: string]: any
}

export interface SocketData {
  action: 'create' | 'update' | 'delete'
  item: Item
}

export interface HandleSocketDataOptions<T> {
  setData: SetData<T>
}

export type SocketListener = (data: SocketData) => void

export const handleSocketData = <T extends Item>(
  options: HandleSocketDataOptions<T>
): SocketListener => {
  const { setData } = options
  const socketListener: SocketListener = (data) => {
    setData((oldItems) => {
      const newItems = { ...oldItems }
      switch (data.action) {
        case 'create': {
          newItems.rows.push(data.item as T)
          break
        }
        case 'delete': {
          const itemIndex = newItems.rows.findIndex(
            (item) => item.id === data.item.id
          )
          if (itemIndex !== -1) {
            newItems.rows.splice(itemIndex, 1)
          }
          break
        }
        case 'update': {
          const itemIndex = newItems.rows.findIndex(
            (item) => item.id === data.item.id
          )
          if (itemIndex !== -1) {
            newItems.rows[itemIndex] = data.item as T
          }
          break
        }
      }
      return newItems
    })
  }
  return socketListener
}
