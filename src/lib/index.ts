import {
  Requests,
  IAuth,
  Responses,
  IResponseError,
  Register,
  RegisterResponse,
  Status,
  StatusResponse,
  StatusExtended,
  StatusExtendedResponse,
} from '../types'

import axios, { AxiosInstance } from 'axios'
import { encode } from './utils'

export const useAlfaBank = ({ token, password, userName }: IAuth) => {
  let instance = axios.create()

  const request = async <T extends Responses>(
    url: string,
    data: Partial<Requests> = {}
  ) => {
    try {
      let dataEncoded = encode({
        ...data,
        ...{ token, password, userName },
      })

      const res = await instance.post(
        `https://web.rbsuat.com/ab_by${url}`,
        dataEncoded
      )

      console.log(res.config.data)

      const resp = res.data as T | IResponseError

      if ('errorCode' in resp && resp.errorCode !== '0') {
        return {
          errorCode: resp.errorCode,
          errorMessage: resp.errorMessage,
        }
      }

      return resp
    } catch (e) {
      return {
        errorCode: 'axios',
      }
    }
  }

  const register = async (data: Register) => {
    return await request<RegisterResponse>('/rest/register.do', data)
  }

  const getOrderStatus = async (data: Status) => {
    return await request<StatusResponse>('/rest/getOrderStatus.do', data)
  }

  const getOrderStatusExtended = async (data: StatusExtended) => {
    return await request<StatusExtendedResponse>(
      '/rest/getOrderStatusExtended.do',
      data
    )
  }

  return {
    instance,
    register,
    getOrderStatus,
    getOrderStatusExtended,
  }
}
