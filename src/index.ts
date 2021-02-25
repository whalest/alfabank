import {
  TData,
  IAuthFields,
  IRegisterOrderResponse,
  IRegisterOrder,
  TResponses,
} from './types'
import axios, { AxiosInstance } from 'axios'
import qs from 'qs'

export class AlfaBankBy {
  axios: AxiosInstance

  #auth: IAuthFields = {
    token: '',
    userName: '',
    password: '',
  }

  constructor({ token, userName, password }: IAuthFields = {}) {
    this.#auth = Object.assign(this.#auth, { token, userName, password })
    this.axios = axios.create({})
  }

  private async request(url: string, data: Partial<TData> = {}) {
    try {
      const res = await this.axios.post(
        `https://web.rbsuat.com/ab_by${url}`,
        qs.stringify({
          ...data,
          ...this.#auth,
        })
      )

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

  async register(data: IRegisterOrder) {
    const response = await this.request('/rest/register.do', data)
    return response
  }
}
