<h1 align="center">🅰️🏦 Node.JS API ALFA-BANK ✅</h1>

<p align="center">Node.JS API library for Alfa-Bank: acquiring, remote payments (VISA, MASTERCARD, MASTERCARD, APPLE PAY, SAMSUNG PAY). Integration with CMS - node.js vue.js, react, angular (Unnoficial)</p>

<p align="center">(Node.JS API библиотека для Альфа-Банк: эквайринг, удаленные платежи (VISA, MASTERCARD, MASTERCARD, APPLE PAY, SAMSUNG PAY). Интеграция с CMS - node.js vue.js, react, angular) (Неоффициальная)</p>

<p align="center"><a href="https://alfa-biz.by/payment/internet-acquiring">official site</a></p>

<img align="center" alt="Node.JS API библиотека для Альфа-Банк" title="Node.JS API library for Alfa-Bank" src="https://github.com/whalest/alfabank/blob/main/assets/main.png?raw=true" />

[![d](https://img.shields.io/npm/dm/alfabank.svg?style=flat-square)](https://npmjs.com/package/alfabank)
[![v](https://img.shields.io/npm/v/alfabank/latest.svg?style=flat-square)](https://npmjs.com/package/alfabank)

## Features

- [axios](https://github.com/axios/axios)
- composition api like
- written on typescript (autocomplete filed)
  - [x] `register.do`
  - [x] `register.do` with `orderBundle`
  - [x] `getOrderStatus.do`
  - [x] `getOrderStatusExtended.do`
  - [x] `addParams.do`
  - [x] `refund.do`
  
based on documentation [merchant manual - ru](https://alfa-biz.by/acquiring/docs/merchantmanual.pdf#page=92)


## Installing

Install alfabank package

```sh
npm i alfabank

# or
yarn add alfabank

# or
pnpm add alfabank
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

#### `token` - (string) Token (request in bank support)

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

#### `refund` - Order payment refund

```ts
const refundData = await alfaBank.refund({
  amount: toBynPenny(115 * 2),
  orderId: '291c4b92-4c38-70db-b265-5a2000c91c61',
})
console.log(refundData)
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

```ts
await alfaBank.addParams({
  orderId: "291c4b92-4c38-70db-b265-5a2000c91c61",
  params: {
    cutom_field1: "sample"
  }
})
```

## License

[MIT](./LICENSE) License © 2022 [reslear](https://github.com/reslear)
