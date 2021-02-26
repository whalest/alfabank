import { TData, IAuth, IRegister, TResponses, IgetOrderStatus } from './types'
import axios, { AxiosInstance } from 'axios'
import qs from 'qs'

/**
 * Функция для конвертирование в минимальных единицах
 * С учетом проблем плавающей точки
 * 10.20 - 1020
 */
export const toAmount = (value: number) => {
  return parseFloat((value * 100).toFixed(2))
}

export const useAlfaBank = ({ token, password, userName }: IAuth) => {
  let instance = axios.create()

  const request = async (url: string, data: Partial<TData> = {}) => {
    try {
      const res = await instance.post(
        `https://web.rbsuat.com/ab_by${url}`,
        qs.stringify({
          ...data,
          ...{ token, password, userName },
        })
      )

      console.log(res)

      const resp = res.data as TResponses

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
    return await request('/rest/register.do', data)
  }

  const getOrderStatus = async (data: IgetOrderStatus) => {
    return await request('/rest/getOrderStatus.do', data)
  }

  return {
    axios,
    register,
    getOrderStatus,
  }
}
