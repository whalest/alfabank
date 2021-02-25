import { AlfaBankBy } from './../src'
import { useAxiosNiceLog } from 'axios-nice-log'

const alfaBank = new AlfaBankBy({ token: process.env.TOKEN })

useAxiosNiceLog(alfaBank.axios)

const register = async () => {
  const data = await alfaBank.register({
    amount: 1000,
    orderNumber: '1',
    returnUrl: process.env.URL,
  })

  if ('orderId' in data) {
    console.log('1')
  }

  console.log(data)
}

register()
