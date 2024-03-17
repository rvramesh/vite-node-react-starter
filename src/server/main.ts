import express from 'express'

import httpDevServer from 'vavite/http-dev-server'

import { ENV } from './env'
import anyRouter from './routes/any-router'
import apiRouter from './routes/api-router'
import { Server } from 'http'

const app = express()
const isProd = ENV.NODE_ENV === 'production'

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

if (isProd) {
  // Serve client assets in production
  app.use(express.static('../client'))
}
app.use('/api', apiRouter)
app.use(anyRouter)

let server: Server
if (!isProd) {
  server = httpDevServer!.on('request', app)
} else {
  console.log('Starting production server')
  server = app.listen(ENV.PORT, () => console.log(`Server is listening on port ${ENV.PORT}...`))
}

process.on('SIGINT', function () {
  console.log('Received SIGINT. Gracefully shutting down')

  server.close(() => {
    console.log('Closed out remaining connections.')
    process.exit()
  })

  // if after
  setTimeout(() => {
    console.error('Could not close connections in time, forcefully shutting down')
    process.exit(1)
  }, 30 * 1000)
})