import express from 'express'
import { register, status } from '.'

const app = express()

app.get('/', async (req, res) => {
  res.send(
    '<a href="/register">register</a>  <a href="/register">get status</a>'
  )
})

app.get('/register', async (req, res) => {
  await register()
  res.send('ok')
})

app.get('/status', async (req, res) => {
  await status()
  res.send('ok')
})

app.listen()

export const createViteNodeApp = app
