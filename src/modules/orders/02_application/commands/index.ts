import { CompleteOrderCommandHandler } from './complete-order/complete-order.command-handler'
import { CreateOrderCommandHandler } from './create-order/create-order.command-handler'

export * from './complete-order/complete-order.command'
export * from './create-order/create-order.command'

export const ORDER_COMMANDS = [CreateOrderCommandHandler, CompleteOrderCommandHandler]
