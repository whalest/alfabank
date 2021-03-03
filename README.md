<h1 align="center">🏦 alfabank</h1>
<p align="center">alfa-biz.by pay node.js library (alfabank belarus)</p>

<img align="center" alt="alfabank" src="https://github.com/whalest/alfabank/blob/main/assets/main.png?raw=true" />

[![d](https://img.shields.io/npm/dm/alfabank.svg?style=flat-square)](https://npmjs.com/package/alfabank)
[![v](https://img.shields.io/npm/v/alfabank/latest.svg?style=flat-square)](https://npmjs.com/package/alfabank)

- [axios](https://github.com/axios/axios)
- composition api like
- written on typescript (autocomplete filed)
  - [x] `register.do`
  - [x] `register.do` with `orderBundle`
  - [x] `getOrderStatus.do`
  - [x] `addParams.do`

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

## Register order

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

if ('orderId' in result) {
  console.log(result.formUrl, result.orderId)
} else if ('errorCode' in result) {
  throw new Error(result.errorMessage)
}
```
