import { useAlfaBank, toBynPenny } from './../src'
import { useAxiosNiceLog } from 'axios-nice-log'

const alfaBank = useAlfaBank({ token: process.env['TOKEN'] })

useAxiosNiceLog(alfaBank.instance)

export const register = async () => {
  const order = 12

  const data = await alfaBank.register({
    amount: toBynPenny(115 * 2),
    orderNumber: `${order}`,
    returnUrl: `${process.env['URL']}`,

    jsonParams: {
      order: 'dasdsa',
      code: '123',
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

export const status = async () => {
  const data = await alfaBank.getOrderStatusExtended({
    orderId: process.env['ORDER'],
  })

  /*   if (data. !== '0') {
    data['']
  }  */

  console.log(data)
  return data
}
//register()
