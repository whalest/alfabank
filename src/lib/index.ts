import {
  TData,
  IAuth,
  IRegister,
  TResponses,
  IgetOrderStatus,
  IResponseError,
  IRegisterResponse,
  TgetOrderStatusResponse,
} from '../types'

import axios, { AxiosInstance } from 'axios'
import { encode } from './utils'

export const useAlfaBank = ({ token, password, userName }: IAuth) => {
  let instance = axios.create()

  const request = async <T extends TResponses>(
    url: string,
    data: Partial<TData> = {}
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

      if ('errorCode' in resp) {
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

  const register = async (data: IRegister) => {
    return await request<IRegisterResponse>('/rest/register.do', data)
  }

  const getOrderStatus = async (data: IgetOrderStatus) => {
    return await request<TgetOrderStatusResponse>(
      '/rest/getOrderStatus.do',
      data
    )
  }

  return {
    instance,
    register,
    getOrderStatus,
  }
}
