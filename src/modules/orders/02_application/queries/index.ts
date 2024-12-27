import { GetOrderTotalQueryHandler } from './get-order-total/get-order-total.query-handler'
import { GetOrderQueryHandler } from './get-order/get-order.command-handler'

export * from './get-order/get-order.query'
export * from './get-order-total/get-order-total.query'

export const ORDER_QUERIES = [GetOrderQueryHandler, GetOrderTotalQueryHandler]
