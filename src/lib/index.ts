import {
  IAuth,
  Register,
  RegisterResponse,
  Refund,
  RefundResponse,
  Status,
  StatusResponse,
  StatusExtended,
  StatusExtendedResponse,
  Attribute,
} from '../types'

import axios, { AxiosInstance } from 'axios'
import { encode, paramsToObject } from './utils'
import { Params, ParamsResponse } from '../types/requests/addParams'
import { OrderStatus } from '../enums/orderStatus'

interface Options extends IAuth {
  language?: string
}

export const useAlfaBank = ({
  token,
  password,
  userName,
  language = 'ru',
}: Options = {}) => {
  let isDebug = true
  let instance = axios.create()
  let baseUrl = 'https://web.rbsuat.com/ab_by'

  const request = async <T, K>(url: string, data: Partial<K> = {}) => {
    try {
      let dataEncoded = encode({
        language,
        ...{ token, password, userName },
        ...data,
      })

      const resp = await instance.post<T>([baseUrl, url].join(''), dataEncoded)

      return resp.data
    } catch (e) {
      if (isDebug) console.log(e.response.data)
      return null
    }
  }

  const register = async (data: Register) => {
    return await request<RegisterResponse, typeof data>(
      '/rest/register.do',
      data
    )
  }

  const refund = async (data: Refund) => {
    return await request<RefundResponse, typeof data>(
      '/rest/refund.do',
      data
    )
  }

  const getOrderStatus = async (data: Status) => {
    return await request<StatusResponse, typeof data>(
      '/rest/getOrderStatus.do',
      data
    )
  }

  const getOrderStatusExtended = async (data: StatusExtended) => {
    const req = await request<StatusExtendedResponse, typeof data>(
      '/rest/getOrderStatusExtended.do',
      data
    )

    if (req) {
      const params = req.merchantOrderParams
      req.params = params ? paramsToObject(params) : {}

      req.paid =
        req.orderStatus === OrderStatus.APPROVED ||
        req.orderStatus === OrderStatus.DEPOSITED
    }

    return req
  }

  /** Запрос добавления дополнительных параметров к заказу */
  const addParams = async (data: Params) => {
    const req = await request<ParamsResponse, typeof data>(
      '/rest/addParams.do',
      data
    )
    return req?.errorCode === 0 ? true : req
  }

  return {
    instance,
    register,
    refund,
    addParams,
    getOrderStatus,
    getOrderStatusExtended,
  }
}
