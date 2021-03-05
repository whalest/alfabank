import { useAlfaBank, toBynPenny } from './../src'
import { useAxiosNiceLog } from 'axios-nice-log'

import crypto from 'crypto'

const alfaBank = useAlfaBank({
  //
  //token: process.env['TOKEN']
  userName: process.env['ALFABANK_USER'],
  password: process.env['ALFABANK_PASSWORD'],
})

useAxiosNiceLog(alfaBank.instance)

export const register = async () => {
  const order = crypto.randomBytes(8).toString('hex')

  const data = await alfaBank.register({
    amount: toBynPenny(115 * 2),
    orderNumber: `${order}`,
    returnUrl: `${process.env['URL']}`,

    jsonParams: {
      order: 'dasdsa',
      code: '123',

      confirmed: false,
      confirmeds: 0,

      /* email: 'test@mail.ru',
      phone: '+375251001100', */
    },

    email: 'test@mail.ru',
    phone: '+375251001100',

    orderBundle: {
      cartItems: {
        items: [
          {
            name: 'Салфетка для монитора',
            positionId: 1,
            quantity: {
              measure: 'штук',
              value: 2,
            },
            itemPrice: toBynPenny(115),
            itemCode: '2',
          },
        ],
      },
    },
  })

  if ('orderId' in data) {
    console.log('1')
  }

  console.log(data)
}

export const default_status = async () => {
  const data = await alfaBank.getOrderStatus({ orderId: process.env['ORDER'] })

  console.log(data)
  return data
}

export const status = async (orderId?: string) => {
  const data = await alfaBank.getOrderStatusExtended({
    orderId: orderId || process.env['ORDER'],
  })

  if (data.orderStatus && data.orderStatus === 2) {
  }

  console.log(data)
  return data
}
//register()

export const setParams = async (orderId?: string) => {
  const data = await alfaBank.addParams({
    orderId: orderId || process.env['ORDER'],
    params: {
      hello: new Date().toJSON(),
    },
  })

  console.log(data)
  return data
}
