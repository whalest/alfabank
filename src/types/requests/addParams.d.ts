import { ErrorResponse, Language } from '../common'

export interface Params extends Language {
  /** Номер заказа в платежной системе. Уникален в пределах системы. */
  orderId: string

  /** Поля для передачи дополнительных параметров, вида {"param":"value","param2":"value2"}  */
  params: {
    [K: string]: any
  }
}

export interface ParamsResponse extends ErrorResponse {}
