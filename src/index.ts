import {
  TData,
  IAuth,
  IRegister,
  TResponses,
  IgetOrderStatus,
  IResponseError,
  IRegisterResponse,
  TgetOrderStatusResponse,
} from './types'
import axios, { AxiosInstance } from 'axios'

/**
 * Функция для конвертирование в минимальных единицах
 * С учетом проблем плавающей точки
 * 10.20 - 1020
 */
export const toBynPenny = (value: number) => {
  return parseFloat((value * 100).toFixed(2))
}

export const isObject = (obj: any) => typeof obj === 'object' && obj !== null

export const stringify = (value: any) => {
  try {
    return JSON.stringify(value)
  } catch (e) {
    return value
  }
}

export const encode = (obj: object) => {
  const params = new URLSearchParams()

  for (let [key, value] of Object.entries(obj)) {
    if (!value) continue

    params.append(key, isObject(value) ? stringify(value) : value)
  }

  return params.toString()
}

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
