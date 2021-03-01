import {
  IgetOrderStatus,
  TgetOrderStatusResponse,
} from './requests/getOrderStatus'
import { IRegister, IRegisterResponse } from './requests/register'

export type IResponseError = {
  /**Код ошибки */
  errorCode?: string

  /** Описание ошибки на языке, переданном в параметре language в запросе. */
  errorMessage?: string
}

export type TResponses = IRegisterResponse | TgetOrderStatusResponse

export type TData = IRegister | IgetOrderStatus
