import express from 'express'
import { register, setParams, status } from '.'

const app = express()

app.get('/', async (req, res) => {
  res.send(
    `<a href="/register">register</a> | <a href="/status">get status</a> | <a href="/params">set params</a>`
  )
})

app.get('/register', async (req, res) => {
  await register()
  res.send('ok')
})

app.get('/status', async (req, res) => {
  const { orderId } = req.query

  const data = await status(orderId ? `${orderId}` : '')

  res.send(data)
})

app.get('/params', async (req, res) => {
  const { orderId } = req.query

  const data = await setParams(orderId ? `${orderId}` : '')

  res.send(data)
})

app.listen()

export const createViteNodeApp = app
