<h1 align="center">🅰️🏦 Node.JS API ALFA-BANK ✅</h1>
<p align="center">Node.JS API library for Alfa-Bank: acquiring, remote payments (VISA, MASTERCARD, MASTERCARD, APPLE PAY, SAMSUNG PAY). Integration with CMS - node.js vue.js, react, angular</p>

<p align="center">(Node.JS API библиотека для Альфа-Банк: эквайринг, удаленные платежи (VISA, MASTERCARD, MASTERCARD, APPLE PAY, SAMSUNG PAY). Интеграция с CMS - node.js vue.js, react, angular)</p>

<img align="center" alt="Node.JS API библиотека для Альфа-Банк" title="Node.JS API library for Alfa-Bank" src="https://github.com/whalest/alfabank/blob/main/assets/main.png?raw=true" />

[![d](https://img.shields.io/npm/dm/alfabank.svg?style=flat-square)](https://npmjs.com/package/alfabank)
[![v](https://img.shields.io/npm/v/alfabank/latest.svg?style=flat-square)](https://npmjs.com/package/alfabank)

- [axios](https://github.com/axios/axios)
- composition api like
- written on typescript (autocomplete filed)
  - [x] `register.do`
  - [x] `register.do` with `orderBundle`
  - [x] `getOrderStatus.do`
  - [x] `getOrderStatusExtended.do`
  - [x] `addParams.do`

based on [merchant manual - ru](https://alfa-biz.by/acquiring/docs/merchantmanual.pdf#page=92)

# Installing

Install alfabank package

```sh
npm i alfabank
# or
yarn add alfabank
```

import

```ts
import { useAlfaBank, toBynPenny } from 'alfabank'
```

## Usage

### `toBynPenny`

convert human amount to minimum unit of measure

```ts
toBynPenny(10.5)
// Result: 1050
```

### `useAlfaBank`

instance for action

### Options

#### `token` - (string) Token

#### `userName` - (string) Login for integration

#### `password` - (string) Password for integration

#### `language` - (string, default: ru) language for all requests

```ts
const alfaBank = useAlfaBank({
  token: 'your token'

  // or
  userName: 'your name',
  password: ' yor',

  language: 'en'
})
```

Autorization example, for storage use `.env` variables

### Methods

#### `register` - Register order

```ts
const result = await alfaBank.register({
  amount: toBynPenny(115 * 2),
  orderNumber: '1234',
  returnUrl: `https://mysite/order/status`,
  jsonParams: {
    email: 'test@mail.ru',
    phone: '+375251001100',
  },
  orderBundle: {
    cartItems: {
      items: [
        {
          name: 'Apple iPhone XR 64GB',
          positionId: 1,
          quantity: {
            measure: 'pieces',
            value: 2,
          },
          itemCode: '2',
        },
      ],
    },
  },
})

if (result?.orderId) {
  console.log(result.formUrl, result.orderId)
} else if (result?.errorCode) {
  throw new Error(result.errorMessage)
}
```

#### `getOrderStatus` - get order status

#### `getOrderStatusExtended` - get extended order status

mutate response:

`params` - field with value converted `merchantOrderParams` array to object like `{"key": "value"}`

`paid` - boolean - syntax sugar for check is order paid

```ts
{

  // ...
  merchantOrderParams: [
    {
      name: "browser_language_param",
      value: "ru"
    },
  ],

  params: {
    browser_language_param: "ru",

    // ...
  }
}
```

#### `addParams` - add params to order
