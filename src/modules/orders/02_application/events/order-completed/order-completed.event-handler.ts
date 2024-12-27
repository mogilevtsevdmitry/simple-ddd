import { OrderCompletedEvent } from '@modules/orders/01_domain/events'
import { EventsHandler, IEventHandler } from '@nestjs/cqrs'

@EventsHandler(OrderCompletedEvent)
export class OrderCompletedEventHandler implements IEventHandler<OrderCompletedEvent> {
  handle({ customerId, orderId }: OrderCompletedEvent) {
    console.log('OrderCompletedEvent', customerId, orderId)
  }
}
