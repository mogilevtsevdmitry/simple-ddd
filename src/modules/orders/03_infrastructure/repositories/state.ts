import { OrderAggregate } from '@modules/orders/01_domain/aggregates'

export interface IItem {
  id: number
  name: string
  price: number
}

export const orders = new Map<string, OrderAggregate>()
export const items: IItem[] = [
  {
    id: 1,
    name: 'Item 1',
    price: 100,
  },
  {
    id: 2,
    name: 'Item 2',
    price: 200,
  },
  {
    id: 3,
    name: 'Item 3',
    price: 300,
  },
  {
    id: 4,
    name: 'Item 4',
    price: 400,
  },
]
