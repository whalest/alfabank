import { Status, StatusResponse } from './requests/getOrderStatus'
import { Register, RegisterResponse } from './requests/register'

export type ErrorResponse = {
  /**Код ошибки */
  errorCode?: string

  /** Описание ошибки на языке, переданном в параметре language в запросе. */
  errorMessage?: string
}

export type Responses = RegisterResponse | StatusResponse
export type Requests = Register | Status
