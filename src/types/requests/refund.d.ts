import { ErrorResponse } from '../common'

/** Запрос регистрации заказа */
export interface Refund {
  /** Номер заказа в платежной системе. Уникален в пределах системы */
  orderId: string

  /** Сумма возврата в копейках (или центах) */
  amount: number
}

export interface RefundResponse extends ErrorResponse {
  /** Номер заказа в платежной системе. Уникален в пределах системы. */
  orderId?: string
}
