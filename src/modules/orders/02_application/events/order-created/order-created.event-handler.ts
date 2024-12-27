import { OrderCreatedEvent } from '@modules/orders/01_domain/events'
import { EventsHandler, IEventHandler } from '@nestjs/cqrs'

@EventsHandler(OrderCreatedEvent)
export class OrderCreatedEventHandler implements IEventHandler<OrderCreatedEvent> {
  handle({ customerId, orderId }: OrderCreatedEvent) {
    console.log('OrderCreatedEvent', customerId, orderId)
  }
}
