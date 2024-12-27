import { ItemAddedEventHandler } from './item-added/item-added.event-handler'
import { OrderCompletedEventHandler } from './order-completed/order-completed.event-handler'
import { OrderCreatedEventHandler } from './order-created/order-created.event-handler'

export const ORDER_EVENTS = [ItemAddedEventHandler, OrderCompletedEventHandler, OrderCreatedEventHandler]
