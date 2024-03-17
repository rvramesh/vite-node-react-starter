import express from 'express'

const helloWorldRouter = express.Router()

helloWorldRouter.get('/', (_, res) => res.end('Hello World!!!!!'))
export default helloWorldRouter
