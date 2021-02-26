export interface IAuthBase {
  userName?: string
  password?: string
}

export interface IAuthToken {
  /** Открытый ключ, который можно использовать для регистрации заказа.
   * Если для аутентификации при регистрации заказа используются логин и пароль, параметр token передавать не нужно */
  token?: string
}

export interface IAuth extends IAuthBase, IAuthToken {}
