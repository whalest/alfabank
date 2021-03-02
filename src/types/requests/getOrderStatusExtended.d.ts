import { Status, StatusResponse } from './getOrderStatus'

export interface StatusExtended extends Status {
  /** Номер (идентификатор) заказа в системе магазина.
   *
   * - В запросе должен присутствовать либо `orderId`, либо `orderNumber`.
   * - Если в запросе присутствуют оба параметра, то приоритетным считается `orderId`.
   */
  orderNumber?: string
}

export interface StatusExtendedResponse {
  /** Номер (идентификатор) заказа в системе магазина. */
  orderNumber: string

  /** По значению этого параметра определяется состояние заказа в платёжной системе.
   * Список возможных значений приведён в списке ниже. Отсутствует, если заказ не был найден.
   *
   * - 0 - Заказ зарегистрирован, но не оплачен;
   * - 1 - Предавторизованная сумма захолдирована (для двухстадийных платежей);
   * - 2 - Проведена полная авторизация суммы заказа;
   * - 3 - Авторизация отменена;
   * - 4 - По транзакции была проведена операция возврата;
   * - 5 - Инициирована авторизация через ACS банка-эмитента;
   * - 6 - Авторизация отклонена.
   * */
  orderStatus?: number

  /** Код ответа. */
  actionCode: number

  /** Расшифровка кода ответа на языке, переданном в параметре Language в запросе. */
  actionCodeDescription: string

  /** Код ошибки. Возможны следующие варианты.
   *
   * - 0 - Обработка запроса прошла без системных ошибок;
   * - 1 - Ожидается [orderId] или [orderNumber];
   * - 5 - Доступ запрещён;
   * - 5 - Пользователь должен сменить свой пароль;
   * - 6 - Заказ не найден;
   * - 7 - Системная ошибка.
   * */
  errorCode?: number

  /** Описание ошибки на языке, переданном в параметре Language в запросе. */
  errorMessage?: string

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
interface Attribute {
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
