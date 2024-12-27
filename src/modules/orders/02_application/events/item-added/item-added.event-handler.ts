import { ItemAddedEvent } from '@modules/orders/01_domain/events'
import { EventsHandler, IEventHandler } from '@nestjs/cqrs'

@EventsHandler(ItemAddedEvent)
export class ItemAddedEventHandler implements IEventHandler<ItemAddedEvent> {
  handle({ item, orderId }: ItemAddedEvent) {
    console.log('ItemAddedEvent', orderId, item)
  }
}
