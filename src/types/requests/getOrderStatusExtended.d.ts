import { OrderStatus } from '../../enums/orderStatus'
import { ErrorResponse } from '../common'
import { Status, StatusResponse } from './getOrderStatus'

export interface StatusExtended extends Status {
  /** Номер (идентификатор) заказа в системе магазина.
   *
   * - В запросе должен присутствовать либо `orderId`, либо `orderNumber`.
   * - Если в запросе присутствуют оба параметра, то приоритетным считается `orderId`.
   */
  orderNumber?: string
}

interface Mutated {
  /** Оплачен ли платеж  */
  paid: boolean

  /** object converted parameters  */
  params: { [K: string]: any }
}

export interface StatusExtendedResponse extends ErrorResponse, Mutated {
  /** Номер (идентификатор) заказа в системе магазина. */
  orderNumber: string

  orderStatus?: OrderStatus

  /** Код ответа. */
  actionCode: number

  /** Расшифровка кода ответа на языке, переданном в параметре Language в запросе. */
  actionCodeDescription: string

  /** Сумма платежа в копейках (или центах) */
  amount: number

  /** Код валюты платежа ISO 4217. Если не указано, то используется значение по умолчанию. */
  currency?: string

  /** Дата регистрации заказа.  */
  date: number

  /** Описание заказа, переданное при его регистрации  */
  orderDescription?: string

  /** IP-адрес пользователя, который оплачивал заказ.  */
  ip: string

  /** Учётный номер авторизации платежа, который присваивается при регистрации платежа. */
  authRefNum: string

  /** Дата и время возврата средств.  */
  refundedDate?: string

  /** Дополнительные параметры продавца */
  merchantOrderParams?: Attribute[]

  cardAuthInfo: CardAuthInfo

  secureAuthInfo?: {
    /** Электронный коммерческий индикатор. Указан только после оплаты заказа и в случае
     * соответствующего разрешения. */
    eci?: number
    /** Значение проверки аутенфикации владельца карты. Указан только после оплаты заказа и в случае соответствующего разрешения. */
    cavv?: string
    /** Электронный коммерческий идентификатор транзакции. Указан только после оплаты заказа и в случае соответствующего разрешения. */
    xid?: string
  }

  bindingInfo?: BindingInfo
  paymentAmountInfo: PaymentAmountInfo
  bankInfo: BankInfo

  // TODO:
  transactionAttributes: any[]
  attributes: Attribute[]
  authDateTime: number
  terminalId: string
  orderBundle: OrderBundle
}

// TODO:
interface BindingInfo {
  clientId?: string
  bindingId?: string
  authDateTime?: string
  terminalId?: string
}

// TODO:
export interface Attribute {
  name: string
  value: string
}

// TODO:
interface BankInfo {
  bankCountryCode: string
  bankCountryName: string
}

// TODO:
interface CardAuthInfo {
  maskedPan: string
  expiration: string
  cardholderName: string
  approvalCode: string
  pan: string
}

// TODO:
interface OrderBundle {
  customerDetails: CustomerDetails
  cartItems: CartItems
}

interface CartItems {
  items: Item[]
}

// TODO:
interface Item {
  positionId: string
  name: string
  quantity: Quantity
  itemAmount: number
  itemCurrency: number
  itemCode: string
}

interface Quantity {
  value: number
  measure: string
}

interface CustomerDetails {
  email: string
  phone: string
}

// TODO:
interface PaymentAmountInfo {
  paymentState?: string
  approvedAmount?: number
  depositedAmount?: number
  refundedAmount?: number
}
