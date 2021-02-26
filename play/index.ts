import { useAlfaBank, toAmount } from './../src'
import { useAxiosNiceLog } from 'axios-nice-log'

const alfaBank = useAlfaBank({ token: process.env['TOKEN'] })

useAxiosNiceLog(alfaBank.axios)

export const register = async () => {
  const order = 5

  const data = await alfaBank.register({
    amount: toAmount(115) * 2,
    orderNumber: `${order}`,
    returnUrl: `${process.env['URL']}`,
    /* jsonParams: {
      email: 'test@mail.ru',
      phone: '+375251001100',
    }, */

    email: 'test@mail.ru',
    phone: '+375251001100',
    /* 
    orderBundle: {
      cartItems: {
        items: [
          {
            name: 'Салфетка супер',
            positionId: 1,
            quantity: {
              measure: 'pieces',
              value: 2,
            },
            itemCurrency: 3,
            itemAmount: toAmount(115),
          },
        ],
      },
    }, */
  })

  if ('orderId' in data) {
    console.log('1')
  }

  console.log(data)
}

export const status = async () => {
  const data = await alfaBank.getOrderStatus({ orderId: process.env['ORDER'] })

  console.log(data)
}
//register()
