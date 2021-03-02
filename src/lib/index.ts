import {
  IAuth,
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

  const request = async <T, K>(url: string, data: Partial<K> = {}) => {
    try {
      let dataEncoded = encode({
        ...data,
        ...{ token, password, userName },
      })

      const resp = await instance.post<T>(
        `https://web.rbsuat.com/ab_by${url}`,
        dataEncoded
      )

      return resp.data
    } catch (e) {
      return null
    }
  }

  const register = async (data: Register) => {
    return await request<RegisterResponse, typeof data>(
      '/rest/register.do',
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
    return await request<StatusExtendedResponse, typeof data>(
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
