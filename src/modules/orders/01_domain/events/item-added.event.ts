import { ItemEntity } from '../entities'

export class ItemAddedEvent {
  constructor(
    public readonly orderId: string,
    public readonly item: ItemEntity,
  ) {}
}
