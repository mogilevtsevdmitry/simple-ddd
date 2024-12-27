import { randomUUID } from 'crypto'
import { CompletedOrderError, EmptyRequiredFieldError, InvalidStatusError } from '../errors'
import { ItemEntity } from './item.entity'

export class OrderEntity {
  private _items: ItemEntity[] = []
  private _status: OrderStatus = OrderStatus.PENDING

  private constructor(
    private readonly _id: string,
    private readonly _customerId: string,
  ) {
    if (!_customerId) throw new EmptyRequiredFieldError('customerId')
  }

  get id(): string {
    return this._id
  }

  get customerId(): string {
    return this._customerId
  }

  get items(): ItemEntity[] {
    return this._items
  }

  get status(): OrderStatus {
    return this._status
  }

  static create(customerId: string): OrderEntity {
    return new OrderEntity(randomUUID(), customerId)
  }

  addItem(item: ItemEntity): void {
    if (this._status === OrderStatus.COMPLETED) {
      throw new CompletedOrderError()
    }
    this._items.push(item)
  }

  changeStatus(status: OrderStatus): void {
    if (!Object.values(OrderStatus).includes(status)) throw new InvalidStatusError(status)
    this._status = status
  }

  calculateTotal(): number {
    return this._items.reduce((acc, item) => acc + item.price, 0)
  }
}

export enum OrderStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
}
