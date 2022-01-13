import { SetItems } from '../hooks/usePagination'

export interface Item {
  id: number
  [key: string]: any
}

export interface SocketData<T extends Item = Item> {
  action: 'create' | 'update' | 'delete'
  item: T
}

export interface HandleSocketDataOptions<T extends Item = Item> {
  setItems: SetItems<T>
  data: SocketData<T>
}

export type SocketListener = (data: SocketData) => void

export const handleSocketData = <T extends Item = Item>(
  options: HandleSocketDataOptions<T>
): void => {
  const { data, setItems } = options

  setItems((oldItems) => {
    const newItems = [...oldItems]
    switch (data.action) {
      case 'create': {
        newItems.push(data.item)
        break
      }
      case 'delete': {
        const itemIndex = newItems.findIndex((item) => item.id === data.item.id)
        if (itemIndex !== -1) {
          newItems.splice(itemIndex, 1)
        }
        break
      }
      case 'update': {
        const itemIndex = newItems.findIndex((item) => item.id === data.item.id)
        if (itemIndex !== -1) {
          newItems[itemIndex] = data.item
        }
        break
      }
    }
    return newItems
  })
}
